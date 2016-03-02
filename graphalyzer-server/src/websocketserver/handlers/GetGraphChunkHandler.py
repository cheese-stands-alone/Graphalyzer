from itertools import chain

from websocketserver.handlers.ErrorHandler import *
from py2neo import Graph
import math
import logging
import concurrent
import threading
import lz4

class GetGraphChunkHandler(HandleInterface):
    """Class to handle sending whole graph to client."""
    _payload = ""
    _request = ""

    def __init__(self, request, payload):
        self._payload = payload
        self._request = request

    """Sends data to frontend. Specificly built for chuncking"""
    def __send(self, socket: WebSocketServerProtocol, nodes, edges, cur, total):
        jsonmsg = {}
        graph = {}

        graph["nodes"] = nodes
        graph["edges"] = edges

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

        data = lz4.dumps((json.dumps(jsonmsg, separators=(',', ':')).encode('utf8')))

        socket.sendMessage(data)

    def __getGraphCount(self, socket, chunksize, graphid):
        try:
            neo4j = Graph()
            query = "START n=node(*) MATCH n WHERE n.graphid='" \
                    + graphid + "' RETURN COUNT(n)"
            for record in neo4j.cypher.execute(query):
                nodenum = int(math.ceil(int(record[0])/chunksize))
            query = "START n=node(*) MATCH (n {graphid:'" + graphid \
                    + "'})-[r{graphid:'" + graphid + "'}]->(m{graphid:'" \
                    + graphid + "'}) RETURN COUNT(r)"
            for record in neo4j.cypher.execute(query):
                edgenum = int(math.ceil(int(record[0])/chunksize))
            return nodenum + edgenum
        except Exception:
            logging.error("Unable to connect to neo4j")
            ErrorHandler(self._request, "Unable to connect to neo4j", "").handle(socket)
            return

    def __sendNodes(self, socket, chunksize, cont, numofchunks):
        graphid = self._payload
        try:
            neo4j = Graph()
            with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
                query = "MATCH n WHERE n.graphid='" + graphid + "' RETURN n"
                nodes = []
                for record in neo4j.cypher.stream(query):
                    dict = {}
                    for key in record[0].properties:
                        dict[key] = record[0].properties[key]
                    del dict["graphid"]
                    nodes.append(dict)
                    if(len(nodes) >= chunksize):
                        executor.submit(self.__send, socket, nodes, [], str(cont), str(numofchunks))
                        nodes = []
                if(len(nodes) < 1):
                    return
                executor.submit(self.__send, socket, nodes, [], str(cont), str(numofchunks))
                cont = cont + 1
        except Exception as ex:
            print(ex)
            logging.error("Unable to connect to neo4j")
            ErrorHandler(self._request, "Unable to connect to neo4j", "").handle(socket)
            return

    def __sendEdges(self, socket, chunksize, cont, numofchunks):
        graphid = self._payload
        try:
            neo4j = Graph()
            with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
                query = "MATCH (par{graphid:'" + graphid + "'})-[rel]->(cld) RETURN par, rel, cld;"
                edges = []
                for record in neo4j.cypher.stream(query):
                    dict = {}
                    for key in record[1].properties:
                        dict[key] = record[1].properties[key]
                    del dict["graphid"]
                    dict["from"] = record[0].properties["id"]
                    dict["to"] = record[2].properties["id"]
                    edges.append(dict)
                    if(len(edges) >= chunksize):
                        executor.submit(self.__send, socket, [], edges, str(cont), str(numofchunks))
                        edges = []
                if(len(edges) < 1):
                    return
                executor.submit(self.__send, socket, [], edges, str(cont), str(numofchunks))
        except Exception as ex:
            print(ex)
            logging.error("Unable to connect to neo4j")
            ErrorHandler(self._request, "Unable to connect to neo4j", "").handle(socket)
            return

    def handle(self, socket: WebSocketServerProtocol):
        graphid = self._payload
        chunksize = 10000

        if graphid == "":
            ErrorHandler("No graph specified", "").handle(socket)
            return

        numofchunks = self.__getGraphCount(socket, chunksize, graphid)
        cont = 0
        a = threading.Thread(target=self.__sendEdges, args=(socket, chunksize, cont, numofchunks, ))
        b = threading.Thread(target=self.__sendNodes, args=(socket, chunksize, cont, numofchunks, ))
        a.start()
        b.start()
