from autobahn.asyncio.websocket import WebSocketServerProtocol


class HandleInterface(object):
    def handle(self, socket: WebSocketServerProtocol):
        raise NotImplementedError("Should have implemented this")
