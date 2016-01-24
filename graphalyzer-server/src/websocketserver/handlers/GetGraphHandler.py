from websocketserver.handlers.ErrorHandler import *
from py2neo import Graph


class GetGraphHandler(HandleInterface):
    """Class to handle sending whole graph to client."""
    _payload = ""

    def __init__(self, payload):
        self._payload = payload

    def handle(self, socket: WebSocketServerProtocol):
        nodes = "["
        edges = "["
        graph = {}
        jsonmsg = {}
        neo4j = Graph()

        graphid = self._payload
        if graphid == "":
            ErrorHandler("No graph specified", "").handle(socket)
            return

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
            nodes = nodes[:-1]
            nodes += "]"
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
            edges = edges[:-1]
            edges += "]"
        except Exception:
            print("Unable to connect to neo4j")
            return

        if nodes == edges:
            ErrorHandler("Graph not found", graphid).handle(socket)
            return

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
        jsonmsg["message"] = "getgraph"

        socket.sendMessage(json.dumps(jsonmsg,
                                      separators=(',', ':')).encode('utf8'))
