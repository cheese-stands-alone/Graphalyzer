from websocketserver.handlers.ErrorHandler import *
from py2neo import Graph
import logging


class ListGraphHandler(HandleInterface):
    _request = ""

    def __init__(self, request):
        self._request = request

    def handle(self, socket: WebSocketServerProtocol):
        """Class to list available graps in neo4j."""
        nodes = "["
        jsonmsg = {}
        graph = Graph()

        # noinspection PyBroadException
        try:
            for record in graph.cypher.execute("START n=node(*) RETURN DISTINCT"
                                               " n.graphid"):
                nodes += "{\"Graph\":\"" + record[0] + "\"},"
            nodes = nodes[:-1]
            nodes += "]"
        except Exception:
            logging.error("Unable to connect to neo4j")
            ErrorHandler(self._request, "Unable to connect to neo4j", "").handle(socket)
            return

        jsonmsg["message_id"] = "".join(
            random.choice(string.ascii_uppercase + string.digits) for _ in
            range(0, 15))
        jsonmsg["sender_id"] = "server"
        jsonmsg["time"] = int(time.time())
        jsonmsg["request"] = "response"
        jsonmsg["status"] = "success"
        jsonmsg["error"] = ""
        jsonmsg["payload"] = json.loads(nodes)
        message = {}
        message["client_request_type"] = self._request
        jsonmsg["message"] = message

        socket.sendMessage(json.dumps(jsonmsg).encode('utf8'))
