module WebSocketServer.Handler.SessionIDHandler;

import WebSocketServer.Handler.HandlerInterface, vibe.http.websockets;

/************************************************
 * Handler for giving client a session ID.
 * Authors: Richard White, rwhite22@iastate.edu
 * Date: October 23, 2015
 ***********************************************/
class SessionIDHandler : HandlerInterface {
    public void handle(T)(string payload, scope T socket)
    {
    	import std.json, vibe.data.json, std.conv;
        Json[string] json;
        json["message_id"] = generateMessageID(16);
        json["sender_id"] = "server";
        import std.datetime;
        json["time"] =  to!string(core.stdc.time.time(null));
        json["request"] = "response";
        json["status"] = "success";
        json["error"] = "";
        json["payload"] = generateMessageID(16);
        json["message"] = "";
        import std.exception;
        try {
        	socket.send(serializeToJsonString(json));
        } catch(core.exception.AssertError e) {
        	import vibe.core.log, WebSocketServer.test.testClasses;
        	logInfo("Detected unittest run: using dummy websocket");
        	auto dummy = new dummyWebSocket();
    		dummy.send(serializeToJsonString(json));
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
		auto test = new SessionIDHandler();
		auto dummy = new dummyWebSocket();
		test.handle("", dummy);
		Json json = dummy.receiveText().parseJsonString();
    	assert(json["sender_id"].get!string == "server");
    	assert(json["request"].get!string == "response");
    	assert(json["status"].get!string == "success");
    	assert(json["error"].get!string == "");
    	assert(json["message"].get!string == "");
	}
}