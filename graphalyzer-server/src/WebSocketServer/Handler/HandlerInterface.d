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
    import std.net.curl, first;

    string content = cast(string) post(NEO4J_URL ~ "/db/data/transaction",
        serializeToJsonString(msg));

    Json json = content.parseJsonString();

    return json;
}
