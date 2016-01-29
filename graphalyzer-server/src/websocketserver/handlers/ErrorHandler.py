from websocketserver.handlers.HandlerInterface import *
import random
import json
import time
import string


class ErrorHandler(HandleInterface):
    """Class to handle generic errors."""
    _error = ""
    _payload = ""
    _request = ""

    def __init__(self, request, errormsg, payload):
        self._error = errormsg
        self._payload = payload
        self._request = request

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
        message = {}
        message["client_request_type"] = self._request
        jsonmsg["message"] = message

        socket.sendMessage(json.dumps(jsonmsg).encode('utf8'))
