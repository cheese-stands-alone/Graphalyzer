from autobahn.asyncio.websocket import WebSocketServerFactory

from ServerConfig import *
from websocketserver.SocketServer import *


def start_websocket_server():
    import asyncio

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    factory = WebSocketServerFactory(
        u"ws://127.0.0.1:" + str(PORT) + "/" + WS_URL, DEBUG)
    factory.protocol = GraphalyzerServerProtocol

    coro = loop.create_server(factory, '0.0.0.0', PORT)
    server = loop.run_until_complete(coro)

    try:
        print("Server started")
        loop.run_forever()
    except KeyboardInterrupt:
        pass
    finally:
        print("Server shutting down")
        server.close()
        loop.close()
