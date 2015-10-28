import vibe.d;

/************************************************
 * Handles Main entrypoint for server as opposed to void main()
 * Authors: Richard White, rwhite22@iastate.edu
 * Date: October 20, 2015
 ***********************************************/
shared static this() {

    import vibe.http.router, WebSocketServer.Server;

    auto router = new URLRouter;
    router.get("/ws", handleWebSockets(&handleWebsocket));

    auto settings = new HTTPServerSettings;
    settings.port = 1618;
    settings.bindAddresses = ["::1", "127.0.0.1"];
    listenHTTP(settings, router);

}
