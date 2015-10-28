module WebSocketServer.Handler.SessionIDHandler;

import WebSocketServer.Handler.HandlerInterface, vibe.http.websockets;

/************************************************
 * Handler for giving client a session ID.
 * Authors: Richard White, rwhite22@iastate.edu
 * Date: October 23, 2015
 ***********************************************/
class SessionIDHandler : HandlerInterface {
    void handle(string payload, scope WebSocket socket)
    {
    	import std.json, vibe.data.json;
        Json[string] json;
        json["message_id"] = generateMessageID(16);
        json["sender_id"] = "server";
        import std.datetime;
        json["time"] = core.stdc.time.time(null);
        json["request"] = "response";
        json["status"] = "success";
        json["error"] = "";
        json["payload"] = generateMessageID(16);
        json["message"] = "";
        socket.send(serializeToJsonString(json));
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