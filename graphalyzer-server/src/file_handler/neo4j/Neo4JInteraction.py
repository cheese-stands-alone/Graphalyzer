from ServerConfig import *

class Neo4JInteraction:
    def sendToNeo4J(self, request):
        print("Client connecting: {}".format(request.peer))

    def addFileToDatabase(self, fileName):



    def load_edges(graphlocation: str, graphid: str):
        from py2neo import Graph

        query = ("USING PERIODIC COMMIT LOAD CSV  WITH HEADERS FROM 'file://" +
                 graphlocation + "' AS line " +
                 "MERGE (child:node {id:line.childid, graphid:\"" +
                 graphid + "\"}) " +
                 "MERGE (parent:node {id:line.parentid, graphid:\"" +
                 graphid + "\"}) " +
                 "MERGE (child)-[edge:edge {id:line.edgeid, graphid:\"" +
                 graphid + "\"}]-(parent)")
        # noinspection PyBroadException
        try:
            graph = Graph()
            graph.cypher.execute(query)
        except Exception:
            print("Unable to connect to neo4j")


    def load_prop(graphlocation: str, graphid: str):
        # noinspection PyBroadException
        try:
            from py2neo import Graph
            import csv
            graph = Graph()

            iterator = iter(csv.reader(open(graphlocation)))
            next(iterator)
            count = 0
            tx = graph.cypher.begin()
            for row in iterator:
                if count >= 500:
                    tx.process()
                    count = 0
                query = ("MATCH (n { id:'" + row[0] + "', graphid:'" + graphid +
                         "'}) SET n." + row[1] + " = '" + row[2] + "'")
                tx.append(query)
                count += 1
            tx.commit()
        except Exception:
            print("Prop failed")
            print("Unable to connect to neo4j")


    def onOpen(self):
        print("WebSocket connection open.")
        response = SessionIDHandler()
        response.handle(self)

    def onMessage(self, payload, isbinary):
        if isbinary:
            print("Binary message received: {} bytes".format(len(payload)))
            response = ErrorHandler(
                "Error received binary message: Not supported", "")
            response.handle(self)
        else:
            print("Text message received: {}".format(payload.decode('utf8')))
            handler = HandlerFactory.makehandler(payload.decode('utf8'))
            handler.handle(self)

    def onClose(self, wasclean, code, reason):
        print("WebSocket connection closed: {}".format(reason))