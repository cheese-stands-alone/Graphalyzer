from autobahn.asyncio.websocket import WebSocketServerFactory

from ServerConfig import *
from websocketserver.SocketServer import *
import sys


def start_websocket_server():
    """Function to start the websocket server."""
    import asyncio

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    factory = WebSocketServerFactory(
        u"ws://127.0.0.1:" + str(PORT) + "/" + WS_URL, DEBUG)
    factory.protocol = GraphalyzerServerProtocol

    coro = loop.create_server(factory, '0.0.0.0', PORT)
    server = loop.run_until_complete(coro)

    try:
        print("Server started")
        loop.run_forever()
    except KeyboardInterrupt:
        pass
    finally:
        print("Server shutting down")
        server.close()
        loop.close()


def load_edges(graphlocation: str, graphid: str):
    """Load edges cvs file into neo4j. graphlocation is string location of file
        and graphid is the unique id for this graph"""
    from py2neo import Graph
    from py2neo.packages.httpstream import http
    # Increase timeout because it can take a really long time.
    http.socket_timeout = 9999

    query = ("USING PERIODIC COMMIT 1000 LOAD CSV  WITH HEADERS FROM 'file://" +
             graphlocation + "' AS line " +
             "MERGE (child:node {id:line.childid, graphid:\"" +
             graphid + "\"}) " +
             "MERGE (parent:node {id:line.parentid, graphid:\"" +
             graphid + "\"}) " +
             "MERGE (parent)-[rel:edge {id:line.edgeid, graphid:\"" +
             graphid + "\"}]->(child)")
    # noinspection PyBroadException
    try:
        graph = Graph()
        graph.cypher.execute("CREATE CONSTRAINT ON (child:node) ASSERT child.id IS UNIQUE")
        graph.cypher.execute("CREATE CONSTRAINT ON (parent:node) ASSERT parent.id IS UNIQUE")
        graph.cypher.execute("CREATE CONSTRAINT ON (rel:edge) ASSERT rel.id IS UNIQUE")
        graph.cypher.execute(query)
    except Exception:
        print("Edges failed")
        print("Unable to connect to neo4j")


def load_prop(graphlocation: str, graphid: str):
    """Load properties cvs file into neo4j. graphlocation is string location of file
        and graphid is the unique id for this graph"""
    from py2neo.packages.httpstream import http
    # Increase timeout because it can take a really long time.
    http.socket_timeout = 9999
    # noinspection PyBroadException
    try:
        from py2neo import Graph
        import csv
        graph = Graph()

        iterator = iter(csv.reader(open(graphlocation)))
        next(iterator)
        count = 0

        graph.cypher.execute("CREATE CONSTRAINT ON (pnode:node) ASSERT pnode.id IS UNIQUE")
        tx = graph.cypher.begin()
        # Loop each csv row so that the prop name can be included.
        for row in iterator:
            if count >= 1000:
                tx.process()
                count = 0
            query = ("MATCH (pnode:node { id:'" + row[0] + "', graphid:'" + graphid +
                     "'}) SET pnode." + row[1] + " = '" + row[2] + "'")
            tx.append(query)
            count += 1
        tx.commit()
    except Exception:
        print("Prop failed")
        print("Unable to connect to neo4j")
