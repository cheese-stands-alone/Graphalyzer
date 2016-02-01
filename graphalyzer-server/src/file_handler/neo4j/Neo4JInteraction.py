import sys, traceback
from py2neo.packages.httpstream import http


class Neo4JInteraction(object):
	def __init__(self, oSWrapper):
		self.oSWrapper = oSWrapper

	def loadEdges(self, graphlocation: str, graphid: str):
		"""Load edges cvs file into neo4j. graphlocation is string location of file
			and graphid is the unique id for this graph"""
		from py2neo import Graph
		from py2neo.packages.httpstream import http
		# Increase timeout because it can take a really long time.
		http.socket_timeout = sys.maxsize

		query = ("USING PERIODIC COMMIT 1000 LOAD CSV  WITH HEADERS FROM 'file://" +
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
			print("Edges failed")
			print("Unable to connect to neo4j")

	def loadProp(self, graphlocation: str, graphid: str):
		"""Load properties cvs file into neo4j. graphlocation is string location of file
			and graphid is the unique id for this graph"""
		from py2neo.packages.httpstream import http
		# Increase timeout because it can take a really long time.
		http.socket_timeout = sys.maxsize
		# noinspection PyBroadException
		try:
			from py2neo import Graph
			import csv
			graph = Graph()

			iterator = iter(csv.reader(open(graphlocation)))
			next(iterator)
			count = 0
			tx = graph.cypher.begin()
			# Loop each csv row so that the prop name can be included.
			for row in iterator:
				if count >= 1000:
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
