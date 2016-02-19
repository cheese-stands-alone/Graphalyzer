from websocketserver.handlers.HandlerFactory import *
import gc
import logging


class GraphalyzerServerProtocol(WebSocketServerProtocol):
    """Class to represent websocket server."""
    def onConnect(self, request):
        logging.info("Client connecting: {}".format(request.peer))

    def onOpen(self):
        """Send register request on websocket open."""
        logging.info("WebSocket connection open.")
        response = SessionIDHandler("newid")
        response.handle(self)

    def onMessage(self, payload, isbinary):
        """Method to recieve file. Rejects binary ones."""
        if isbinary:
            response = ErrorHandler(
                "Error received binary message: Not supported", "")
            response.handle(self)
        else:
            # Use factory to determin request type and handle it.
            handler = HandlerFactory.makehandler(payload.decode('utf8'))
            try:
                handler.handle(self)
            except:
                return
            gc.collect()

    def onClose(self, wasclean, code, reason):
        logging.info("WebSocket connection closed: {}".format(reason))
