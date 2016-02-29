from autobahn.asyncio.websocket import WebSocketServerFactory

from ServerConfig import *
from websocketserver.SocketServer import *
import sys
import logging
import os


def start_websocket_server():
    """Function to start the websocket server."""
    import asyncio

    if not os.path.exists(LOGFOLDER):
        os.makedirs(LOGFOLDER)
    logging.basicConfig(filename=LOGFOLDER+ "/" + WEBSOCKETLOG,level=LOGLEVEL)
    logging.info("Starting Server")
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    factory = WebSocketServerFactory(
        u"ws://127.0.0.1:" + str(PORT) + "/" + WS_URL, debug=False)
    factory.protocol = GraphalyzerServerProtocol

    coro = loop.create_server(factory, '0.0.0.0', PORT)
    server = loop.run_until_complete(coro)

    try:
        logging.info("Server started")
        loop.run_forever()
    except KeyboardInterrupt:
        pass
    finally:
        logging.info("Server shutting down")
        server.close()
        loop.close()
