from websocketserver.handlers.HandlerInterface import *
import random
import json
import time
import string


class ErrorHandler(HandleInterface):
    """Class to handle generic errors."""
    _error = ""
    _payload = ""

    def __init__(self, errormsg, payload):
        self._error = errormsg
        self._payload = payload

    # noinspection PyDictCreation
    def handle(self, socket: WebSocketServerProtocol):
        jsonmsg = {}

        jsonmsg["message_id"] = "".join(
            random.choice(string.ascii_uppercase + string.digits) for _ in
            range(0, 15))
        jsonmsg["sender_id"] = "server"
        jsonmsg["time"] = int(time.time())
        jsonmsg["request"] = "error"
        jsonmsg["status"] = "error"
        jsonmsg["error"] = self._error
        jsonmsg["payload"] = self._payload
        jsonmsg["message"] = "error"

        socket.sendMessage(json.dumps(jsonmsg).encode('utf8'))
