from websocketserver.handlers.HandlerInterface import *
import random
import json
import time
import string


class SessionIDHandler(HandleInterface):

    _request = ""

    def __init__(self, request):
        self._request = request

    """Class to register client."""
    # noinspection PyDictCreation
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
        message = {}
        message["client_request_type"] = self._request
        jsonmsg["message"] = message

        socket.sendMessage(json.dumps(jsonmsg).encode('utf8'))
