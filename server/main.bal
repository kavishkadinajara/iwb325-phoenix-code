import ballerina/http;
import ballerina/jwt;
import ballerina/log;
import ballerina/sql;
import ballerinax/postgresql;
import ballerinax/postgresql.driver as _;



listener http:Listener httpListener = new (8080);

// Supabase DB connection config
configurable string host = ?;
configurable int port = ?;
configurable string username = ?;
configurable string password = ?;
configurable string databaseName = ?;


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

}
