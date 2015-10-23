module WebSocketServer.Handler.JsonParseErrorHandler;

import WebSocketServer.Handler.HandlerInterface, vibe.http.websockets;

/************************************************
 * Handler for informing client of malformated json message.
 * Authors: Richard White, rwhite22@iastate.edu
 * Date: October 23, 2015
 ***********************************************/
class JsonParseErrorHandler : HandlerInterface {
    void handle(string payload, scope WebSocket socket)
    {
    	import std.json, vibe.data.json;
        Json[string] errorMsg;
        import WebSocketServer.Server;
        errorMsg["message_id"] = generateMessageID();
        errorMsg["sender_id"] = "Server";
        import std.datetime;
        errorMsg["time"] = core.stdc.time.time(null);
        errorMsg["request"] = "error";
        errorMsg["status"] = "error";
        errorMsg["error"] = payload;
        errorMsg["payload"] = "";
        errorMsg["message"] = "";
        socket.send(serializeToJsonString(errorMsg));
    }
}