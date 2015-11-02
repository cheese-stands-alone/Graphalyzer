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

    import vibe.http.client, std.net.curl, first, std.conv,
        vibe.stream.operations;

    Json response;
    try {
        requestHTTP(NEO4J_URL ~ "/db/data/transaction/commit", (scope req) {
            req.method = HTTPMethod.POST;
            req.contentType = "application/json";
            req.writeJsonBody = msg;
        }, (scope res) {
            //logInfo("Response: %s", res.bodyReader.readAllUTF8());
            response = res.bodyReader.readAllUTF8().parseJsonString();
        });
    }
    catch (Exception e) {
    }

    /+
    try {
        auto http = HTTP(NEO4J_URL ~ "/db/data/transaction/commit");
        http.setPostData(serializeToJsonString(msg), "application/json");
        http.onReceive = (ubyte[] data) {
            Json response = to!string(data).parseJsonString();
            return data.length;
        };
        http.perform();
        while (response == null) {
            
        }
    }
    catch (Exception e) {
    } +/
    while (response == null) {

    }
    return response;
}
