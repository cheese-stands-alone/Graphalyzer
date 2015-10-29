module WebSocketServer.Handler.UnknownErrorHandler;

import WebSocketServer.Handler.HandlerInterface, vibe.http.websockets;

/************************************************
 * Handler for informing the client of an unknown error.
 * Authors: Richard White, rwhite22@iastate.edu
 * Date: October 23, 2015
 ***********************************************/
class UnknownErrorHandler : HandlerInterface {
    public void handle(T)(string payload, scope T socket) {
        import std.json, vibe.data.json, std.conv, std.datetime;

        Json[string] errorMsg;
        errorMsg["message_id"] = generateMessageID(16);
        errorMsg["sender_id"] = "server";
        errorMsg["time"] = to!string(core.stdc.time.time(null));
        errorMsg["request"] = "error";
        errorMsg["status"] = "error";
        errorMsg["error"] = "Unknown Error: Error Supresses";
        errorMsg["payload"] = "";
        errorMsg["message"] = "";

        socket.send(serializeToJsonString(errorMsg));
    }

    void clean() {
        foreach (number; 0 .. 2) {
            import core.memory;

            GC.minimize();
            GC.collect();
        }
    }

    unittest {
        import WebSocketServer.test.testClasses, vibe.data.json;

        auto test = new UnknownErrorHandler();
        auto dummy = new dummyWebSocket();
        test.handle("", dummy);
        Json json = dummy.receiveText().parseJsonString();
        assert(json["sender_id"].get!string == "server");
        assert(json["request"].get!string == "error");
        assert(json["status"].get!string == "error");
        assert(json["error"].get!string == "Unknown Error: Error Supresses");
        assert(json["payload"].get!string == "");
        assert(json["message"].get!string == "");
    }
}
