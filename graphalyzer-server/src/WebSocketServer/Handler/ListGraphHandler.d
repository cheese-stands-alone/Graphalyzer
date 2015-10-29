module WebSocketServer.Handler.ListGraphHandler;
import WebSocketServer.Handler.HandlerInterface, vibe.http.websockets;

/************************************************
 * Handler for listing graphs for client
 * Authors: Richard White, rwhite22@iastate.edu
 * Date: October 28, 2015
 ***********************************************/
class ListGraphHandler : HandlerInterface {
    public void handle(T)(string payload, scope T socket)
    {
    	import std.json, vibe.data.json, std.datetime, std.conv;
    	string[] graphList;
    	
    	// Generate a random ammount of random names for now.
    	import std.random;
    	foreach (number; 0..uniform(5, 20)) {  
    		graphList ~= "name-" ~ generateMessageID(8) ~ "-" ~ SysTime(Clock.currStdTime()).toISOExtString;
    	}
    	
        Json[string] jsonMsg;
        jsonMsg["message_id"] = generateMessageID(16);
        jsonMsg["sender_id"] = "server";
        jsonMsg["time"] =  to!string(core.stdc.time.time(null));
        jsonMsg["request"] = "response";
        jsonMsg["status"] = "success";
        jsonMsg["error"] = "";
        jsonMsg["payload"] = graphList.serializeToJson();
        jsonMsg["message"] = "";
        import std.exception;
        try {
        	socket.send(serializeToJsonString(jsonMsg));
        } catch(core.exception.AssertError e) {
        	import vibe.core.log, WebSocketServer.test.testClasses;
        	logInfo("Detected unittest run: using dummy websocket");
        	auto dummy = new dummyWebSocket();
    		dummy.send(serializeToJsonString(jsonMsg));
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
		auto test = new ListGraphHandler();
		auto dummy = new dummyWebSocket();
		test.handle("", dummy);
		Json json = dummy.receiveText().parseJsonString();
    	assert(json["sender_id"].get!string == "server");
    	assert(json["request"].get!string == "response");
    	assert(json["status"].get!string == "success");
    	assert(json["message"].get!string == "");
    	assert(json["error"].get!string == "");
	}
}