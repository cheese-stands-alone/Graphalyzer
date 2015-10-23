module WebSocketServer.Handler.HandlerInterface;

import vibe.http.websockets;

/************************************************
 * Handler interface for all hadlers.
 * Authors: Richard White, rwhite22@iastate.edu
 * Date: October 23, 2015
 ***********************************************/
interface HandlerInterface {
    void handle(string payload, scope WebSocket socket);
}