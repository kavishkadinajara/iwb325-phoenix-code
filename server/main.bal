import ballerina/http;
import ballerina/jwt;
import ballerina/log;
import ballerina/mime;
import ballerina/sql;
import ballerinax/aws.s3;
import ballerinax/postgresql;
import ballerinax/postgresql.driver as _;

listener http:Listener httpListener = new (8080);

// Supabase DB connection config
configurable string host = ?;
configurable int port = ?;
configurable string username = ?;
configurable string password = ?;
configurable string databaseName = ?;

configurable string AWS_ACCESS_KEY_ID = ?;
configurable string AWS_SECRET_ACCESS_KEY = ?;
configurable string AWS_REGION = ?;
configurable string AWS_BUCKET = ?;

s3:ConnectionConfig amazonS3Config = {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION
};

s3:Client amazonS3Client = check new (amazonS3Config);

service / on httpListener {

    resource function get .() returns string {
        return "Welcome to Eventure!";
    }

}

configurable string signingSecret = ?;

http:JwtValidatorConfig config = {
    issuer: "eventure",
    audience: ["authenticated"],
    signatureConfig: {
        secret: signingSecret
    }
};

http:ListenerJwtAuthHandler jwtHandler = new (config);

// Function to authenticate and return the JWT payload
public function authenticateJWT(string authorizationHeader) returns jwt:Payload|http:Unauthorized {
    jwt:Payload|http:Unauthorized authResult = jwtHandler.authenticate(authorizationHeader);
    return authResult;
}

// Function to authorize based on a role
public function authorizeJWT(jwt:Payload payload, string role) returns http:Forbidden? {
    return jwtHandler.authorize(payload, role);
}

@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:3000"],
        allowMethods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
        allowHeaders: ["Authorization", "Content-Type"],
        allowCredentials: true
    }
}
service /auth on httpListener {

    final postgresql:Client dbClient;

    public function init() returns error? {
        self.dbClient = check new (host, username, password, databaseName, port);
        log:printInfo("Successfully connected to the database.");
    }

    resource function get anon(http:Caller caller, http:Request req) returns error? {
        check caller->respond("This is a public endpoint. No authentication required.");
    }

    resource function post validate(http:Caller caller, http:Request req) returns error? {
        string? authHeader = check req.getHeader("Authorization");

        //use guard close
        if (authHeader == null) {
            check caller->respond("Authorization header is missing.");
            return;
        }

        // Remove any "Bearer " prefix from the token if present
        string jwtToken = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : authHeader;

        jwt:Payload|http:Unauthorized payload = authenticateJWT(authHeader);

        if payload is http:Unauthorized {
            check caller->respond("Unauthorized");
            return;
        }

        if payload is jwt:Payload {
            log:printInfo("JWT validation successful.");
            string? email = <string?>payload["email"];
            if email == null {
                check caller->respond("Email not found in JWT payload.");
                return;
            }
            //retunr json
            check caller->respond("JWT is valid. Email: " + email);
        }

    }

    resource function post register(http:Caller caller, http:Request req) returns error? {

        json payload = {};
        var payloadResult = req.getJsonPayload();
        if (payloadResult is json) {
            payload = payloadResult;
        } else {
            checkpanic caller->respond({"error": "Invalid JSON payload"});
        }

        string email = (check payload.email).toString();
        string id = (check payload.id).toString();
        string name = (check payload.name).toString();
        string image = (check payload.image).toString();
        sql:ParameterizedQuery query = `INSERT INTO users (email, id, name, image) VALUES (${email}, CAST(${id} AS UUID), ${name}, ${image})`;

        var result = self.dbClient->execute(query);
        if (result is sql:ExecutionResult) {
            log:printInfo("User registered successfully");

            // Create a JSON object with the registered user details
            json registeredUser = {
                "email": email,
                "id": id,
                "name": name,
                "image": image
            };

            // Send the registered user details back to the caller
            checkpanic caller->respond({
                "message": "User registered successfully",
                "user": registeredUser
            });
        } else if (result is error) {
            log:printError("Error occurred while registering user", result);
            checkpanic caller->respond({"error": "Failed to register user"});
        }
    }

    resource function get buckets() returns json[] {
        var result = amazonS3Client->listBuckets();
        if (result is s3:Bucket[]|error) {
            if (result is s3:Bucket[]) {
                json[] buckets = [];
                foreach var bucket in result {
                    buckets.push({
                        "name": bucket.name,
                        "creationDate": bucket.creationDate.toString()
                    });
                }
                return buckets;
            } else {
                log:printError("Error occurred while listing buckets", result);
                return [];
            }
        }

    }

    resource function post upload(http:Caller caller, http:Request req) returns error? {
        // Get all body parts of the multipart request
        mime:Entity[] bodyParts = check req.getBodyParts();

        // Log the total number of body parts received
        log:printDebug("Total body parts received: " + bodyParts.length().toString());

        // Initialize variables to hold extracted values
        string bucketName = "";
        string key = "";
        byte[] fileContent = [];

        // Loop through each part and log its details
        foreach var part in bodyParts {
            // Log details about the current body part
            log:printDebug("Processing part with content type: " + part.getContentType());

            mime:ContentDisposition? contentDisposition = part.getContentDisposition();
            if contentDisposition is mime:ContentDisposition {
                // Log the content disposition for debugging
                log:printDebug("Content-Disposition Name: " + contentDisposition.name);

                // Check if this part is the 'file' part
                if contentDisposition.disposition == "attachment" || contentDisposition.name == "file" {
                    fileContent = check part.getByteArray();
                    log:printDebug("Extracted file content of size: " + fileContent.length().toString());
                } else if contentDisposition.name == "bucketName" {
                    bucketName = check part.getText();
                    log:printDebug("Extracted bucketName: " + bucketName);
                } else if contentDisposition.name == "key" {
                    key = check part.getText();
                    log:printDebug("Extracted key: " + key);
                }
            } else {
                // Log when no content disposition is found
                log:printWarn("No content disposition found for this part.");
            }
        }

        // Check if all required fields are extracted
        if bucketName == "" || key == "" || fileContent.length() == 0 {
            log:printError("Missing required fields or file. bucketName: '" + bucketName + "', key: '" + key + "', fileContentSize: " + fileContent.length().toString());
            checkpanic caller->respond({"error": "Missing required fields or file"});
            return;
        }

        // Log that all fields are present
        log:printInfo("All fields present. Uploading file to bucket: " + bucketName + " with key: " + key);

        // Call the S3 client to upload the file
        var result = amazonS3Client->createObject(bucketName, key, fileContent);
        if (result is error) {
            log:printError("Error occurred while uploading object", result);
            checkpanic caller->respond({"error": "Failed to upload object"});
        } else {
            log:printInfo("Object uploaded successfully");
            checkpanic caller->respond({"message": "Object uploaded successfully"});
        }
    }
}

@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:3000"],
        allowMethods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
        allowHeaders: ["Authorization", "Content-Type"],
        allowCredentials: true
    }
}
service /event on httpListener {
    final postgresql:Client databaseClient;

    public function init() returns error? {
        self.databaseClient = check new (host, username, password, databaseName, port);
        log:printInfo("Successfully connected to the database.");
    }

    resource function get .() returns string {
        return "Welcome to event";
    }

    resource function get all() returns json[] {
        sql:ParameterizedQuery query = `SELECT id,name, date, time, location,image, description FROM events`;
        stream<record {|string id; string name; string description; string date; string time; string location; string image;|}, error?> resultStream = self.databaseClient->query(query);

        json[] events = [];
        //record {|string id; string name; string description; string date; string time; string location; string image;|}? event;

        record {|string id; string name; string description; string date; string time; string location; string image;|}? event;

        while true {
            var result = resultStream.next();
            if result is error {
                log:printError("Error occurred while fetching events", result);
            } else if result is record {|record {|string id; string name; string description; string date; string time; string location; string image;|} value;|} {
                log:printInfo("Result: " + result.toString());
            }
            if result is error {
                break;
            } else if result is () {
                break;
            } else {
                // Extract the inner record from result
                var innerResult = result.value;
                if innerResult is record {|string id; string name; string description; string date; string time; string location; string image;|} {
                    event = innerResult;
                    if event is record {|string id; string name; string description; string date; string time; string location; string image;|} {
                        events.push({
                            "id": event.id,
                            "name": event.name,
                            "description": event.description,
                            "date": event.date,
                            "time": event.time,
                            "location": event.location,
                            "image": event.image
                        });
                    }
                }
            }
        }
        return events;
    }

    resource function post add(http:Caller caller, http:Request req) returns error? {
        json payload;
        var payloadResult = req.getJsonPayload();
        if (payloadResult is json) {
            payload = payloadResult;
        } else {
            checkpanic caller->respond({"error": "Invalid JSON payload"});
            return;
        }

        string name = (check payload.name).toString();
        string date = (check payload.date).toString();
        string time = (check payload.time).toString();
        string location = (check payload.location).toString();
        int availableTickets = 0;
        if payload.available_tickets is int {
            availableTickets = check payload.available_tickets;
        } else if payload.available_tickets is string {
            availableTickets = check int:fromString((check payload.available_tickets).toString());
        } else {
            checkpanic caller->respond({"error": "Invalid available tickets format"});
            return;
        }
        float ticketPrice;
        if payload.ticket_price is float {
            ticketPrice = check payload.ticket_price;
        } else if payload.ticket_price is string {
            ticketPrice = check float:fromString(check payload.ticket_price);
        } else {
            checkpanic caller->respond({"error": "Invalid ticket price format"});
            return;
        }
        string slug = (check payload.slug).toString();
        string image = (check payload.image).toString();
        boolean mealProvides;
        if payload.meal_provides is boolean {
            mealProvides = check payload.meal_provides;
        } else {
            checkpanic caller->respond({"error": "Invalid meal_provides format"});
            return;
        }
        string description = (check payload.description).toString();
        string createdBy = (check payload.created_by).toString();
       sql:ParameterizedQuery query = `INSERT INTO public.events 
        (name, date, time, location, available_tickets, ticket_price, slug, image, meal_provides, description, created_by) 
        VALUES (${name}, ${date}::date, ${time}::time, ${location}, ${availableTickets}, ${ticketPrice}, ${slug}, ${image}, ${mealProvides}, ${description},  CAST(${createdBy} AS UUID))`;

        var result = self.databaseClient->execute(query);

        if (result is sql:ExecutionResult) {
            log:printInfo("Event added successfully");

            // Create a JSON object with the added event details
            json addedEvent = {
                "name": name,
                "date": date,
                "time": time,
                "location": location,
                "available_tickets": availableTickets,
                "ticket_price": ticketPrice,
                "slug": slug,
                "image": image,
                "meal_provides": mealProvides,
                "description": description,
                "created_by": createdBy
            };

            // Send the added event details back to the caller
            checkpanic caller->respond({
                "message": "Event added successfully",
                "event": addedEvent
            });
        } else if (result is error) {
            log:printError("Error occurred while adding event", result);
            checkpanic caller->respond({"error": "Failed to add event"});
        }

    }
}
