module WebSocketServer.Server;

import vibe.web.web;
import vibe.http.websockets;

/************************************************
 * Handles websocket connections and parses the json messages.
 * Returns: Responds to websocket client but does not return a value
 * Authors: Richard White, rwhite22@iastate.edu
 * Date: October 20, 2015
 ***********************************************/
public void handleWebsocket(scope WebSocket socket) {
    import vibe.core.log, std.json, vibe.data.json;

    logInfo("Got new web socket connection.");
    // Loop to keep socket alive.
    while (socket.connected()) {
        // Make sure there is data
        if (socket.waitForData()) {
            try {
                // Retreve message and parse to json.
                string messageString = socket.receiveText();
                Json json = messageString.parseJsonString();

                // Log json
                logInfo(serializeToPrettyJson(json));

                // Extract strings from json object in accorcance to api.
                string message_id = json["message_id"].get!string;
                string sender_id = json["sender_id"].get!string;
                string time = json["sender_id"].get!string;
                string request = json["request"].get!string;
                string status = json["status"].get!string;
                string error = json["error"].get!string;
                string payload = json["payload"].get!string;
                string message = json["message"].get!string;
                // Switch statement for request types to create the 
                // corresponding objects to handle them.
                switch (request) {
                case "newid":
                    import WebSocketServer.Handler.SessionIDHandler;

                    auto handler = new SessionIDHandler();
                    handler.handle(payload, socket);
                    handler.clean();
                    break;
                case "listgraphs":
                    import WebSocketServer.Handler.ListGraphHandler;

                    auto handler = new ListGraphHandler();
                    handler.handle(payload, socket);
                    handler.clean();
                    break;
                case "getgraph":
                    import WebSocketServer.Handler.GetGraphHandler;

                    auto handler = new GetGraphHandler();
                    handler.handle(payload, socket);
                    handler.clean();
                    break;
                    // Run if request type is not found above.    
                default:
                    import WebSocketServer.Handler.UnknownRequestHandler;

                    auto handler = new UnknownRequestHandler();
                    handler.handle(request, socket);
                    break;
                }
            }
            // Json parsing exception.
            catch (JSONException e) {
                logError(e.msg);
                import WebSocketServer.Handler.JsonParseErrorHandler;

                auto handler = new JsonParseErrorHandler();
                handler.handle(e.msg, socket);
            }
            // All other exceptions.
            catch (Exception e) {
                logError(e.msg);
                import WebSocketServer.Handler.UnknownErrorHandler;

                auto handler = new UnknownErrorHandler();
                handler.handle(e.msg, socket);
            }
        }
    }
    logInfo("Client disconnected.");
}