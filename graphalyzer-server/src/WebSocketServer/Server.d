module WebSocketServer.WebsocketServer;
import vibe.web.web;
import vibe.http.websockets;

/************************************************
 * Creates a string of random alphanumeric chars
 * Returns: string of 16 random characters
 * Authors: Richard White, rwhite22@iastate.edu
 * Date: October 20, 2015
 ***********************************************/
private string generateMessageID()
{
    import std.algorithm, std.ascii, std.base64, std.conv, std.random, std.range;
    auto rndNums = rndGen().map!(a => cast(ubyte)a)().take(16);
    auto result = appender!string();
    Base64.encode(rndNums, result);
    return result.data.filter!isAlphaNum().to!string();
}

/************************************************
 * Handles websocket connections and parses the json messages.
 * Returns: Responds to websocket client but does not return a value
 * Authors: Richard White, rwhite22@iastate.edu
 * Date: October 20, 2015
 ***********************************************/
public void handleWebsocket(scope WebSocket socket)
{
    import vibe.core.log, std.json, vibe.data.json;
    logInfo("Got new web socket connection.");
    // Loop to keep socket alive.
    while(socket.connected()) {
    	// Make sure there is data
        if(socket.waitForData()) {
            try {
            	// Retreve message and parse to json.
                string messageString = socket.receiveText();
                Json json = messageString.parseJsonString();
                
                // Log json
                logInfo(serializeToPrettyJson(json));
                
                // Extract strings from json object in accorcance to api.
                string message_id = json["message_id"].get!string;
                string sender_id = json["sender_id"].get!string;
                string time = json["sender_id"].get!string;
                string request = json["request"].get!string;
                string status = json["status"].get!string;
                string error = json["error"].get!string;
                string payload = json["payload"].get!string;
                string message = json["message"].get!string;
                // Switch statement for request types to create the 
                // corresponding objects to handle them.
                switch(request) {
                case "newid":
                    int i;
                    break;
                case "asdfsdf":
                    int b;
                    break;
                case "sdfsdf":
                    int c;
                    break;
                // Run if request type is not found above.    
                default:
                    Json[string] errorMsg;
                	errorMsg["message_id"] = generateMessageID();
                	errorMsg["sender_id"] = "Server";
                	import std.datetime;
                	errorMsg["time"] = core.stdc.time.time(null);
                	errorMsg["request"] = "error";
                	errorMsg["status"] = "error";
                	errorMsg["error"] = "Unknown request type";
                	errorMsg["payload"] = request;
                	errorMsg["message"] = "";
                	socket.send(serializeToJsonString(errorMsg));
                    break;
                }
            }
            // Json parsing exception.
            catch (JSONException e) {
                logError(e.msg);
                Json[string] errorMsg;
                errorMsg["message_id"] = generateMessageID();
                errorMsg["sender_id"] = "Server";
                import std.datetime;
                errorMsg["time"] = core.stdc.time.time(null);
                errorMsg["request"] = "error";
                errorMsg["status"] = "error";
                errorMsg["error"] = e.msg;
                errorMsg["payload"] = "";
                errorMsg["message"] = "";
                socket.send(serializeToJsonString(errorMsg));
            }
            // All other exceptions.
            catch (Exception e) {
                logError(e.msg);
                Json[string] errorMsg;
                errorMsg["message_id"] = generateMessageID();
                errorMsg["sender_id"] = "Server";
                import std.datetime;
                errorMsg["time"] = core.stdc.time.time(null);
                errorMsg["request"] = "error";
                errorMsg["status"] = "error";
                errorMsg["error"] = "Unknown Error: Error Supresses";
                errorMsg["payload"] = "";
                errorMsg["message"] = "";
                socket.send(serializeToJsonString(errorMsg));
            }
        }
    }
    logInfo("Client disconnected.");
}
