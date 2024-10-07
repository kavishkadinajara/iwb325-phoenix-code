import ballerina/http;

listener http:Listener httpListener = new (8080);

service / on httpListener {

    resource function get .() returns string {
        return "Welcome to Eventure!";
    }

}
