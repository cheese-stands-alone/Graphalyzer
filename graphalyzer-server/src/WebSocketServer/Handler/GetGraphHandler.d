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
    	string[] nodes;
    	string[] edges;
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
    		nodes ~= json.serializeToJsonString();
    	}
    	
    	foreach (number; 0..n*2) { 
    		import std.conv; 
    		auto from = to!string(uniform(0, n));
    		auto to = to!string(uniform(0, n));
    		Json[string] json;
    		json["from"] = from;
    		json["to"] = to;
    		edges ~= json.serializeToJsonString();
    	}
    	
    	graph["nodes"] = nodes.serializeToJson();
    	graph["edges"] = edges.serializeToJson();
    	
        Json[string] jsonMsg;
        jsonMsg["message_id"] = generateMessageID(16);
        jsonMsg["sender_id"] = "Server";
        jsonMsg["time"] = to!string(core.stdc.time.time(null));
        jsonMsg["request"] = "response";
        jsonMsg["status"] = "success";
        jsonMsg["error"] = "";
        jsonMsg["payload"] = graph.serializeToJson();
        jsonMsg["message"] = "";
        socket.send(serializeToJsonString(jsonMsg));
        clean();
    }
    
    void clean() {
    	foreach(number; 0..2) {
    		import core.memory;
    		GC.minimize();
    		GC.collect();
    	}
    }
}
