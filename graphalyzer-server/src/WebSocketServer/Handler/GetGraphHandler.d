module WebSocketServer.Handler.GetGraphHandler;

import WebSocketServer.Handler.HandlerInterface, vibe.http.websockets;

/************************************************
 * Handler for listing graphs for client
 * Authors: Richard White, rwhite22@iastate.edu
 * Date: October 28, 2015
 ***********************************************/
class GetGraphHandler : HandlerInterface {
    override void handle(string payload, scope WebSocket socket)
    {
    	import std.json, vibe.data.json, std.datetime, std.conv;
    	Json nodes = Json.emptyArray();
    	Json edges = Json.emptyArray();
    	Json[string] graph;
    	
    	// Generate a random ammount of random names for now.
    	import std.random;
    	auto n = uniform(1, 100);
    	foreach (number; 0..n) { 
    		import std.conv; 
    		string numString = to!string(number);
    		Json[string] json;
    		json["id"] = numString;
    		json["label"] = "Node " ~ numString;
    		nodes ~= json;
    	}
    	
    	foreach (number; 0..n*2) { 
    		import std.conv; 
    		auto from = to!string(uniform(0, n));
    		auto to = to!string(uniform(0, n));
    		Json[string] json;
    		json["from"] = from;
    		json["to"] = to;
    		edges ~= json;
    	}
    	
    	import std.string;
    	graph["nodes"] = nodes;
    	graph["edges"] = edges;
    	
        Json[string] jsonMsg;
        jsonMsg["message_id"] = generateMessageID(16);
        jsonMsg["sender_id"] = "server";
        jsonMsg["time"] = to!string(core.stdc.time.time(null));
        jsonMsg["request"] = "response";
        jsonMsg["status"] = "success";
        jsonMsg["error"] = "";
        jsonMsg["payload"] = graph.serializeToJson();
        jsonMsg["message"] = "";
        import std.exception;
        try {
        	import std.string;
        	socket.send(removechars(serializeToJsonString(jsonMsg), "\\"));
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
		auto test = new GetGraphHandler();
		test.handle("", null);
		Json json = (new dummyWebSocket).receiveText().parseJsonString();
    	assert(json["sender_id"].get!string == "server");
    	assert(json["request"].get!string == "response");
    	assert(json["status"].get!string == "success");
    	assert(json["error"].get!string == "");
    	assert(json["message"].get!string == "");
	}
}