import sys, traceback
from py2neo.packages.httpstream import http

class Neo4JInteraction(object):

	def __init__(self, oSWrapper):
		self.oSWrapper = oSWrapper

	def loadEdges(self, graphlocation: str, graphid: str):
		import py2neo
		http.socket_timeout = sys.maxsize

		print("graph location: " + graphlocation + " graphid: " + graphid)

		fileURI = self.oSWrapper.getFileURI(graphlocation)

		query = ("USING PERIODIC COMMIT LOAD CSV WITH HEADERS FROM 'file:" +
		fileURI + "' AS line " +
		"MERGE (child:node {id:line.childid, graphid:\"" +
		graphid + "\"}) " +
		"MERGE (parent:node {id:line.parentid, graphid:\"" +
		graphid + "\"}) " +
		"MERGE (child)-[edge:edge {id:line.edgeid, graphid:\"" +
		graphid + "\"}]-(parent)")
		print(query)
		# noinspection PyBroadException
		try:
			graph = py2neo.Graph()
			graph.cypher.execute(query)
		except Exception:
			print("Unable to connect to neo4j", sys.exc_info()[0])
			traceback.print_exc(file=sys.stdout)

	def loadProp(self, graphlocation: str, graphid: str):
		# noinspection PyBroadException

		http.socket_timeout = sys.maxsize

		try:
			import py2neo
			import csv
			graph = py2neo.Graph()

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
