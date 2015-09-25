import std.stdio, std.datetime, vibe.d;

void postFile(HTTPServerRequest req, HTTPServerResponse res) {
    logInfo("%s: Recieved a POST from %s", Clock.currTime.toISOExtString(), req.peer);
    string str = req.toString();
    str = urlDecode(str[17 .. str.length-9]);
    res.writeBody("Sucess");
}

shared static this() {
	URLRouter router = new URLRouter;
	router.post("/filesubmit/*", &postFile);

    HTTPServerSettings settings = new HTTPServerSettings;
	settings.port = 8080;
	settings.bindAddresses = ["::1", "127.0.0.1"];

	listenHTTP(settings, router);
}