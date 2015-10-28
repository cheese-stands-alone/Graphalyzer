module WebSocketServer.Handler.UnknownRequestHandler;

import WebSocketServer.Handler.HandlerInterface, vibe.http.websockets;

/************************************************
 * Handler for informing the client that the server did not reconize the
 * 			request type.
 * Authors: Richard White, rwhite22@iastate.edu
 * Date: October 23, 2015
 ***********************************************/
class UnknownRequestHandler : HandlerInterface {
    void handle(string payload, scope WebSocket socket)
    {
    	import std.json, vibe.data.json, std.conv;
        Json[string] errorMsg;
        errorMsg["message_id"] = generateMessageID(16);
        errorMsg["sender_id"] = "Server";
        import std.datetime;
        errorMsg["time"] =  to!string(core.stdc.time.time(null));
        errorMsg["request"] = "error";
        errorMsg["status"] = "error";
        errorMsg["error"] = "Unknown request type";
        errorMsg["payload"] = payload;
        errorMsg["message"] = "";
        import std.exception;
        try {
        	socket.send(serializeToJsonString(errorMsg));
        } catch(core.exception.AssertError e) {
        	import vibe.core.log, WebSocketServer.test.testClasses;
        	logInfo("Detected unittest run: using dummy websocket");
        	auto dummy = new dummyWebSocket();
    		dummy.send(serializeToJsonString(errorMsg));
        }
    }
    
    void clean() {
    	foreach(number; 0..2) {
    		import core.memory;
    		GC.minimize();
    		GC.collect();
    	}
    }
    
    unittest
	{
		import WebSocketServer.test.testClasses, vibe.data.json;
		auto test = new UnknownRequestHandler();
		test.handle("", null);
		Json json = (new dummyWebSocket).receiveText().parseJsonString();
    	assert(json["sender_id"].get!string == "Server");
    	assert(json["request"].get!string == "error");
    	assert(json["status"].get!string == "error");
    	assert(json["error"].get!string == "Unknown request type");
    	assert(json["message"].get!string == "");
	}
}