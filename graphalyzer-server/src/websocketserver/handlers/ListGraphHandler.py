from websocketserver.handlers.HandlerInterface import *
import random
import json
import time
import string


class ListGraphHandler(HandleInterface):
    def handle(self, socket: WebSocketServerProtocol):
        nodes = "["
        jsonmsg = {}

        n = random.randint(1, 20)
        for number in range(0, n):
            nodes += "{\"Graph\":\" Graph " + str(number) + "\"},"
        nodes = nodes[:-1]
        nodes += "]"

        jsonmsg["message_id"] = "".join(
            random.choice(string.ascii_uppercase + string.digits) for _ in
            range(0, 15))
        jsonmsg["sender_id"] = "server"
        jsonmsg["time"] = int(time.time())
        jsonmsg["request"] = "response"
        jsonmsg["status"] = "success"
        jsonmsg["error"] = ""
        jsonmsg["payload"] = json.load(nodes)
        jsonmsg["message"] = ""

        socket.sendMessage(json.dumps(jsonmsg).encode('utf8'))
