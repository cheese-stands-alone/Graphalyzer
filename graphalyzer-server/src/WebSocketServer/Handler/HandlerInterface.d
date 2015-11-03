module WebSocketServer.Handler.HandlerInterface;

import vibe.http.websockets, vibe.data.json;

/************************************************
 * Handler interface for all hadlers.
 * Authors: Richard White, rwhite22@iastate.edu
 * Date: October 23, 2015
 ***********************************************/
interface HandlerInterface {
    void handle(T)(string payload, scope T socket);
    void clean();
}

/************************************************
 * Creates a string of random alphanumeric chars
 * Returns: string of i random characters
 * Authors: Richard White, rwhite22@iastate.edu
 * Date: October 20, 2015
 ***********************************************/
public string generateMessageID(int i) {
    import std.algorithm, std.ascii, std.base64, std.conv, std.random,
        std.range;

    auto rnd = Random(unpredictableSeed);
    auto rndNums = rnd.map!(a => cast(ubyte) a)().take(i);
    auto result = appender!string();
    Base64.encode(rndNums, result);

    return result.data.filter!isAlphaNum().to!string();
}

/************************************************
 * Send and recieve message to neo4j server
 * Returns: json return message
 * Authors: Richard White, rwhite22@iastate.edu
 * Date: November 2, 2015
 ***********************************************/
public Json sendToNeo4J(Json msg) {
    import std.net.curl, first, std.conv, std.exception;

    Json response = null;
    bool done = true;

    try {
        auto http = HTTP(NEO4J_URL ~ "/db/data/transaction/commit");
        http.setPostData(serializeToJsonString(msg), "application/json");
        http.onReceive = (ubyte[] data) {
            response = (cast(string) data).parseJsonString();
            done = false;
            return data.length;
        };
        http.perform();
        while (done) {
        }
    }
    catch (Exception e) {
        import vibe.core.log;
        
        logError(e.toString());
    }
    return response;
}
