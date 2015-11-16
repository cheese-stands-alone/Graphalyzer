from websocketserver.handlers.HandlerInterface import *
import random
import json
import time
import string


class GetGraphHandler(HandleInterface):
    _payload = ""

    def __init__(self, payload):
        self._payload = payload

    def handle(self, socket: WebSocketServerProtocol):
        nodes = "["
        edges = "["
        graph = {}
        jsonmsg = {}

        n = random.randint(1, 1000)
        for number in range(0, n):
            nodes += "{\"id\":\"" + str(number) + "\",\"label\":\"Node " + str(
                number) + "\"},"
        nodes = nodes[:-1]
        nodes += "]"

        for number in range(0, n):
            origin = random.randint(0, n)
            to = random.randint(0, n)
            edges += "{\"from\":\"" + str(origin) + "\",\"to\":\"" + str(
                to) + "\"},"
        edges = edges[:-1]
        edges += "]"

        graph["nodes"] = json.loads(nodes)
        graph["edges"] = json.loads(edges)

        jsonmsg["message_id"] = "".join(
            random.choice(string.ascii_uppercase + string.digits) for _ in
            range(0, 15))
        jsonmsg["sender_id"] = "server"
        jsonmsg["time"] = int(time.time())
        jsonmsg["request"] = "response"
        jsonmsg["status"] = "success"
        jsonmsg["error"] = ""
        jsonmsg["payload"] = graph
        jsonmsg["message"] = ""

        socket.sendMessage(json.dumps(jsonmsg).encode('utf8'))
