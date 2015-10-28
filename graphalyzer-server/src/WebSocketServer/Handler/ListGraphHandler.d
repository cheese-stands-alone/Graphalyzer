module WebSocketServer.Handler.ListGraphHandler;
import WebSocketServer.Handler.HandlerInterface, vibe.http.websockets;

/************************************************
 * Handler for listing graphs for client
 * Authors: Richard White, rwhite22@iastate.edu
 * Date: October 28, 2015
 ***********************************************/
class ListGraphHandler : HandlerInterface {
    override void handle(string payload, scope WebSocket socket)
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
        jsonMsg["sender_id"] = "Server";
        jsonMsg["time"] =  to!string(core.stdc.time.time(null));
        jsonMsg["request"] = "response";
        jsonMsg["status"] = "success";
        jsonMsg["error"] = "";
        jsonMsg["payload"] = graphList.serializeToJson();
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