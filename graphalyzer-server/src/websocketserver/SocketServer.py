from websocketserver.handlers.HandlerFactory import *
import gc


class GraphalyzerServerProtocol(WebSocketServerProtocol):
    def onConnect(self, request):
        print("Client connecting: {}".format(request.peer))

    def onOpen(self):
        print("WebSocket connection open.")
        response = SessionIDHandler()
        response.handle(self)

    def onMessage(self, payload, isbinary):
        if isbinary:
            response = ErrorHandler(
                "Error received binary message: Not supported", "")
            response.handle(self)
        else:
            handler = HandlerFactory.makehandler(payload.decode('utf8'))
            handler.handle(self)
            gc.collect()

    def onClose(self, wasclean, code, reason):
        print("WebSocket connection closed: {}".format(reason))
