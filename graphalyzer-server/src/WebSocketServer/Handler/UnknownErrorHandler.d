module WebSocketServer.Handler.UnknownErrorHandler;

import WebSocketServer.Handler.HandlerInterface, vibe.http.websockets;

/************************************************
 * Handler for informing the client of an unknown error.
 * Authors: Richard White, rwhite22@iastate.edu
 * Date: October 23, 2015
 ***********************************************/
class UnknownErrorHandler : HandlerInterface {
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
        errorMsg["error"] = "Unknown Error: Error Supresses";
        errorMsg["payload"] = "";
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
		auto test = new UnknownErrorHandler();
		test.handle("", null);
		Json json = (new dummyWebSocket).receiveText().parseJsonString();
    	assert(json["sender_id"].get!string == "Server");
    	assert(json["request"].get!string == "error");
    	assert(json["status"].get!string == "error");
    	assert(json["error"].get!string == "Unknown Error: Error Supresses");
    	assert(json["payload"].get!string == "");
    	assert(json["message"].get!string == "");
	}
}