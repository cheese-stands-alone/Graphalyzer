module WebSocketServer.Server;

import vibe.web.web;
import vibe.http.websockets;

/************************************************
 * Handles websocket connections and parses the json messages.
 * breaks: Responds to websocket client but does not break a value
 * Authors: Richard White, rwhite22@iastate.edu
 * Date: October 20, 2015
 ***********************************************/
public void handleWebsocket(T)(scope T socket) {
    import vibe.core.log, std.json, vibe.data.json;

    logDebug("Got new web socket connection.");
    // Loop to keep socket alive.
    while (socket.connected()) {
        // Make sure there is data
        if (socket.waitForData()) {
            try {
                // Retreve message and parse to json.
                string messageString = socket.receiveText();
                Json json = messageString.parseJsonString();

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
                default: // Run if request type is not found above.
                    import WebSocketServer.Handler.UnknownRequestHandler;

                    auto handler = new UnknownRequestHandler();
                    handler.handle(request, socket);
                    break;
                }
            }
            // Json parsing exception.
            catch (std.json.JSONException e) {
                import WebSocketServer.Handler.JsonParseErrorHandler;

                version (unittest) {
                } else {
                    logError(e.msg);
                }

                auto handler = new JsonParseErrorHandler();
                handler.handle(e.msg, socket);
                break;
            }
            // All other exceptions.
            catch (Exception e) {
                import WebSocketServer.Handler.UnknownErrorHandler;

                version (unittest) {
                } else {
                    logError(e.msg);
                }

                auto handler = new UnknownErrorHandler();
                handler.handle(e.msg, socket);
                break;
            }
        }
    }
    logDebug("Client disconnected.");
}

// json parse error test
unittest {
    import WebSocketServer.test.testClasses, vibe.data.json,
        WebSocketServer.Handler.HandlerInterface, std.stdio;

    write("Starting json parse error test: ");
    Json[string] jsonMsg;
    jsonMsg["message_id"] = generateMessageID(16);
    jsonMsg["sender_id"] = "client";
    jsonMsg["time"] = to!string(core.stdc.time.time(null));
    jsonMsg["request"] = "newid";
    jsonMsg["status"] = "initrequest";
    jsonMsg["error"] = "";
    jsonMsg["payload"] = "";
    jsonMsg["message"] = "";
    auto dummy = new dummyWebSocket(serializeToJsonString(jsonMsg) ~ "test");
    handleWebsocket(dummy);
    Json json = dummy.receiveText().parseJsonString();
    assert(json["sender_id"].get!string == "server");
    assert(json["request"].get!string == "error");
    assert(json["status"].get!string == "error");
    assert(json["error"].get!string == "(1): Error: Expected end of string after JSON value.");
    assert(json["message"].get!string == "");
    assert(json["payload"].get!string == "");
    writeln("✓");
}

// unknown request test
unittest {
    import WebSocketServer.test.testClasses, vibe.data.json,
        WebSocketServer.Handler.HandlerInterface, std.stdio;

    write("Starting unknown request test: ");
    Json[string] jsonMsg;
    jsonMsg["message_id"] = generateMessageID(16);
    jsonMsg["sender_id"] = "client";
    jsonMsg["time"] = to!string(core.stdc.time.time(null));
    jsonMsg["request"] = "something";
    jsonMsg["status"] = "dfsf";
    jsonMsg["error"] = "";
    jsonMsg["payload"] = "sadfdsf";
    jsonMsg["message"] = "sadfsdf";
    auto dummy = new dummyWebSocket(serializeToJsonString(jsonMsg));
    handleWebsocket(dummy);
    Json json = dummy.receiveText().parseJsonString();
    assert(json["sender_id"].get!string == "server");
    assert(json["request"].get!string == "error");
    assert(json["status"].get!string == "error");
    assert(json["error"].get!string == "Unknown request type");
    assert(json["message"].get!string == "");
    assert(json["payload"].get!string == "something");
    writeln("✓");
}

// new id test
unittest {
    import WebSocketServer.test.testClasses, vibe.data.json,
        WebSocketServer.Handler.HandlerInterface, std.stdio;

    write("Starting new id test: ");
    Json[string] jsonMsg;
    jsonMsg["message_id"] = generateMessageID(16);
    jsonMsg["sender_id"] = "client";
    jsonMsg["time"] = to!string(core.stdc.time.time(null));
    jsonMsg["request"] = "newid";
    jsonMsg["status"] = "initrequest";
    jsonMsg["error"] = "";
    jsonMsg["payload"] = "";
    jsonMsg["message"] = "";
    auto dummy = new dummyWebSocket(serializeToJsonString(jsonMsg));
    handleWebsocket(dummy);
    Json json = dummy.receiveText().parseJsonString();
    assert(json["sender_id"].get!string == "server");
    assert(json["request"].get!string == "response");
    assert(json["status"].get!string == "success");
    assert(json["error"].get!string == "");
    assert(json["message"].get!string == "");
    writeln("✓");
}

// list graph test
unittest {
    import WebSocketServer.test.testClasses, vibe.data.json,
        WebSocketServer.Handler.HandlerInterface, std.stdio;

    write("Starting new id test: ");
    Json[string] jsonMsg;
    jsonMsg["message_id"] = generateMessageID(16);
    jsonMsg["sender_id"] = "client";
    jsonMsg["time"] = to!string(core.stdc.time.time(null));
    jsonMsg["request"] = "listgraphs";
    jsonMsg["status"] = "initrequest";
    jsonMsg["error"] = "";
    jsonMsg["payload"] = "";
    jsonMsg["message"] = "";
    auto dummy = new dummyWebSocket(serializeToJsonString(jsonMsg));
    handleWebsocket(dummy);
    Json json = dummy.receiveText().parseJsonString();
    assert(json["sender_id"].get!string == "server");
    assert(json["request"].get!string == "response");
    assert(json["status"].get!string == "success");
    assert(json["error"].get!string == "");
    assert(json["message"].get!string == "");
    writeln("✓");
}

// get graph test
unittest {
    import WebSocketServer.test.testClasses, vibe.data.json,
        WebSocketServer.Handler.HandlerInterface, std.stdio;

    write("Starting get graph test: ");
    Json[string] jsonMsg;
    jsonMsg["message_id"] = generateMessageID(16);
    jsonMsg["sender_id"] = "client";
    jsonMsg["time"] = to!string(core.stdc.time.time(null));
    jsonMsg["request"] = "getgraph";
    jsonMsg["status"] = "initrequest";
    jsonMsg["error"] = "";
    jsonMsg["payload"] = "something";
    jsonMsg["message"] = "";
    auto dummy = new dummyWebSocket(serializeToJsonString(jsonMsg));
    handleWebsocket(dummy);
    Json json = dummy.receiveText().parseJsonString();
    assert(json["sender_id"].get!string == "server");
    assert(json["request"].get!string == "response");
    assert(json["status"].get!string == "success");
    assert(json["error"].get!string == "");
    assert(json["message"].get!string == "");
    writeln("✓");
}
