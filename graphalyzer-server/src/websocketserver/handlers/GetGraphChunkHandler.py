from websocketserver.handlers.ErrorHandler import *
from py2neo import Graph
import math
import logging


class GetGraphChunkHandler(HandleInterface):
    """Class to handle sending whole graph to client."""
    _payload = ""
    _request = ""

    def __init__(self, request, payload):
        self._payload = payload
        self._request = request

    def __send(self, socket: WebSocketServerProtocol, nodes, edges, cur, total):
        jsonmsg = {}
        graph = {}

        if(nodes != ""):
            nodes = nodes[:-1]
            nodes += "]"
            graph["nodes"] = json.loads(nodes)
        if(edges != ""):
            edges = edges[:-1]
            edges += "]"
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
        message = {}
        message["client_request_type"] = self._request
        message["currchunk"] = cur
        message["totalchunk"] = total
        jsonmsg["message"] = message

        socket.sendMessage(json.dumps(jsonmsg,
                                      separators=(',', ':')).encode('utf8'))

    def handle(self, socket: WebSocketServerProtocol):
        neo4j = Graph()
        graphid = self._payload


        try:
            query = "START n=node(*) MATCH n WHERE n.graphid='" \
                    + graphid + "' RETURN COUNT(n)"
            for record in neo4j.cypher.execute(query):
                    nodenum = record[0]
            query = "START n=node(*) MATCH (n {graphid:'" + graphid \
                    + "'})-[r{graphid:'" + graphid + "'}]->(m{graphid:'" \
                    + graphid + "'}) RETURN COUNT(r)"
            for record in neo4j.cypher.execute(query):
                edgenum = record[0]
            total = int(nodenum) + int(edgenum)
        except Exception:
            logging.error("Unable to connect to neo4j")
            ErrorHandler(self._request, "Unable to connect to neo4j", "").handle(socket)
            return

        nodes = "["
        edges = "["

        if graphid == "":
            ErrorHandler("No graph specified", "").handle(socket)
            return

        counter = 0
        numofchunks = int(math.ceil(total))
        currchunk = 1
        # noinspection PyBroadException
        try:
            query = "START n=node(*) MATCH n WHERE n.graphid='" \
                    + graphid + "' RETURN n"
            for record in neo4j.cypher.execute(query):
                nodes += "{"
                for key in record[0].properties:
                    if key == "graphid":
                        continue
                    nodes += "\"" + key + "\":\"" + record[0].properties[key] \
                             + "\","
                nodes = nodes[:-1]
                nodes += "},"
                counter += 1
                if(counter >= 10000):
                    self.__send(socket, nodes, "", str(currchunk), str(numofchunks))
                    currchunk += 1
                    nodes = "["
                    counter = 0
            query = "START n=node(*) MATCH (n {graphid:'" + graphid \
                    + "'})-[r{graphid:'" + graphid + "'}]->(m{graphid:'" \
                    + graphid + "'}) RETURN r"
            for record in neo4j.cypher.execute(query):
                edges += "{"
                for key in record[0].properties:
                    if key == "graphid":
                        continue
                    edges += "\"" + key + "\":\"" + record[0].properties[key] \
                             + "\","
                edges += "\"from\":\"" + \
                         record[0].start_node.properties["id"] + \
                         "\",\"to\":\"" + record[0].end_node.properties["id"] \
                         + "\"},"
                if(counter >= 10000):
                    self.__send(socket, nodes, edges, str(currchunk), str(numofchunks))
                    currchunk += 1
                    edges = "["
                    nodes = ""
                    counter = 0
        except Exception:
            logging.error("Unable to connect to neo4j")
            ErrorHandler(self._request, "Unable to connect to neo4j", "").handle(socket)
            return

        if nodes == edges:
            ErrorHandler(self._request, "Graph not found", graphid).handle(socket)
            return
        self.__send(socket, nodes, edges, str(currchunk), str(numofchunks))
