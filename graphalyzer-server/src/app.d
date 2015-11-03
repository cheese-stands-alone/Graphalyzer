module first;
import vibe.d;

/*
* Here wll be the config options parsed from some config file
* They are hard coded for now.
*/

/************************************************
 * Handles Main entrypoint for server as opposed to void main()
 * Authors: Richard White, rwhite22@iastate.edu
 * Date: October 20, 2015
 ***********************************************/
shared static this() {
    import vibe.http.router, WebSocketServer.Server, config.config;

    /*
    * Here wll be the config options parsed from some config file
    * They are hard coded for now.
    */

    PORT = 1618;
    MAX_REST_SIZE = 1 * 1024 * 1024 * 1024;
    UPLOAD_LOCATION = "./dir";
    NEO4J_URL = "http://localhost:7474";

    auto router = new URLRouter;

    //TEST
    router.get("/test", staticTemplate!"upload_form.dt");

    // Websocket Server
    router.get("/ws", handleWebSockets(&handleWebsocket!WebSocket));

    // REST
    router.post("/upload", &uploadFile);

    auto settings = new HTTPServerSettings;

    // Port running on
    settings.port = PORT;

    // Max request size in bytes
    settings.maxRequestSize = MAX_REST_SIZE;
    listenHTTP(settings, router);

    logInfo(""); // Space for format.

}

/************************************************
 * Handles the revieving of uploaded files via REST to UPLOAD_LOCATION.
 * Authors: Richard White, rwhite22@iastate.edu
 * Date: October 30, 2015
 ***********************************************/
void uploadFile(scope HTTPServerRequest req, scope HTTPServerResponse res) {
    import config.config;
    
    foreach (pf; req.files) {
        try
            moveFile(pf.tempPath, Path(UPLOAD_LOCATION) ~ pf.filename);
        catch (Exception e) {
            logWarn("Failed to move file to destination folder: %s", e.msg);
            logInfo("Performing copy+delete instead.");
            copyFile(pf.tempPath, Path(UPLOAD_LOCATION) ~ pf.filename);
        }
    }
    res.writeBody("File uploaded!", "text/plain");
}
