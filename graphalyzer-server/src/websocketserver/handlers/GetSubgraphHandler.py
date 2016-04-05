from websocketserver.handlers.ErrorHandler import *
from py2neo import Graph
import math
import logging
import concurrent


class GetSubgraphHandler(HandleInterface):
    """Class to handle sending whole graph to client."""
    _graphid = ""
    _depth = 0
    _node = ""
    _request = ""

    def __init__(self, request, graphid, node, depth):
        self._graphid = graphid
        self._depth = depth
        self._node = node
        self._request = request

    """Sends data to frontend. Specificly built for chuncking"""

    def __send(self, socket: WebSocketServerProtocol, nodes, edges, cur, total):
        jsonmsg = {}
        graph = {}

        # Check if nodes or edges are empty and correct the json of they are not.
        if (nodes != ""):
            nodes = nodes[:-1]
            nodes += "]"
            graph["nodes"] = json.loads(nodes)
        if (edges != ""):
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

    def __getGraphCount(self, socket, chunksize, graphid):
        neo4j = Graph()
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
        return int(math.ceil(total / chunksize))

    def __queryNeo4J(self, query):
        neo4j = Graph()
        return neo4j.cypher.stream(query)

    def handle(self, socket: WebSocketServerProtocol):
        graphid = self._graphid
        chunksize = 100

        if graphid == "":
            ErrorHandler("No graph specified", "").handle(socket)
            return

        # noinspection PyBroadException
        try:
            with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
                # Get total number of nodes and edges in the graph.
                numofchunks = executor.submit(self.__getGraphCount, socket, chunksize, graphid)
                query = "MATCH (n {graphid:'" + graphid + "',id:'" + self._node + "'})-[r*.." + \
                        self._depth + "]->(m{graphid:'" + graphid + "'}) RETURN m;"
                nodequery = executor.submit(self.__queryNeo4J, query)
                query = "MATCH (n {graphid:'" + graphid + "',id:'" + self._node + "'})-[r*.." + \
                        self._depth + "]->(m{graphid:'" + graphid + "'}) RETURN r;"
                edgequery = executor.submit(self.__queryNeo4J, query)

            print("here")
            nodes = "["
            edges = "["
            currchunk = 1
            counter = 0

            for record in nodequery.result():
                nodes += "{"
                for key in record[0].properties:
                    if key == "graphid":
                        continue
                    nodes += "\"" + key + "\":\"" + record[0].properties[key] \
                             + "\","
                nodes = nodes[:-1]
                nodes += "},"
                counter += 1
                if (counter >= chunksize):
                    self.__send(socket, nodes, "", str(currchunk), str(numofchunks.result()))
                    currchunk += 1
                    nodes = "["
                    counter = 0
            if (nodes == "["):
                nodes = ""
            print("nodes done")
            for record in edgequery.result():
                for item in record[0]:
                    edges += "{"
                    print(item)
                    for key in item.properties:
                        print(key)
                        if key == "graphid":
                            continue
                        edges += "\"" + key + "\":\"" + item.properties[key] \
                                 + "\","
                    edges += "\"from\":\"" + \
                             item.start_node.properties["id"] + \
                             "\",\"to\":\"" + item.end_node.properties["id"] \
                             + "\"},"
                    counter += 1
                    if (counter >= chunksize):
                        self.__send(socket, nodes, edges, str(currchunk), str(numofchunks.result()))
                        currchunk += 1
                        edges = "["
                        nodes = ""
                        counter = 0
                        # Send final chunk
            self.__send(socket, nodes, edges, str(currchunk), str(numofchunks.result()))
        except Exception:
            logging.error("Unable to connect to neo4j")
            ErrorHandler(self._request, "Unable to connect to neo4j", "").handle(socket)
            return
