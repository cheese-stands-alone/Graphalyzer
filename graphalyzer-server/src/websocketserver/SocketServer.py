from websocketserver.handlers.HandlerFactory import *


class GraphalyzerServerProtocol(WebSocketServerProtocol):
    def onConnect(self, request):
        print("Client connecting: {}".format(request.peer))

    def onOpen(self):
        print("WebSocket connection open.")
        response = SessionIDHandler()
        response.handle(self)

    def onMessage(self, payload, isbinary):
        if isbinary:
            print("Binary message received: {} bytes".format(len(payload)))
            response = ErrorHandler(
                "Error received binary message: Not supported", "")
            response.handle(self)
        else:
            print("Text message received: {}".format(payload.decode('utf8')))
            handler = HandlerFactory.makehandler(payload.decode('utf8'))
            handler.handle(self)

    def onClose(self, wasclean, code, reason):
        print("WebSocket connection closed: {}".format(reason))
