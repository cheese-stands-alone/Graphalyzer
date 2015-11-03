module WebSocketServer.Handler.UnknownRequestHandler;

import WebSocketServer.Handler.HandlerInterface, vibe.http.websockets;

/************************************************
 * Handler for informing the client that the server did not reconize the
 * 			request type.
 * Authors: Richard White, rwhite22@iastate.edu
 * Date: October 23, 2015
 ***********************************************/
class UnknownRequestHandler : HandlerInterface {
    public void handle(T)(string payload, scope T socket) {
        import std.json, vibe.data.json, std.conv, std.datetime;

        Json[string] errorMsg;
        errorMsg["message_id"] = generateMessageID(16);
        errorMsg["sender_id"] = "server";
        errorMsg["time"] = to!string(core.stdc.time.time(null));
        errorMsg["request"] = "error";
        errorMsg["status"] = "error";
        errorMsg["error"] = "Unknown request type";
        errorMsg["payload"] = payload;
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
        import WebSocketServer.test.testClasses, vibe.data.json, std.stdio;

        write("Starting UnknownResquestHandler: ");
        auto test = new UnknownRequestHandler();
        auto dummy = new dummyWebSocket();
        test.handle("", dummy);
        Json json = dummy.receiveText().parseJsonString();
        assert(json["sender_id"].get!string == "server");
        assert(json["request"].get!string == "error");
        assert(json["status"].get!string == "error");
        assert(json["error"].get!string == "Unknown request type");
        assert(json["message"].get!string == "");
        writeln("✓");
    }
}
