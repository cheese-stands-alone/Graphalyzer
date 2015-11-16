from websocketserver.handlers.HandlerInterface import *
import random
import json
import time
import string


class SessionIDHandler(HandleInterface):
    def handle(self, socket: WebSocketServerProtocol):
        jsonmsg = {}
        jsonmsg["message_id"] = "".join(
            random.choice(string.ascii_uppercase + string.digits) for _ in
            range(0, 15))
        jsonmsg["sender_id"] = "server"
        jsonmsg["time"] = int(time.time())
        jsonmsg["request"] = "response"
        jsonmsg["status"] = "success"
        jsonmsg["error"] = ""
        jsonmsg["payload"] = "".join(
            random.choice(string.ascii_uppercase + string.digits) for _ in
            range(0, 15))
        jsonmsg["message"] = ""

        socket.sendMessage(json.dumps(jsonmsg).encode('utf8'))
