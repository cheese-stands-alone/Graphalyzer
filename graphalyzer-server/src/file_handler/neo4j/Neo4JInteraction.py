import sys, traceback
from py2neo.packages.httpstream import http


class Neo4JInteraction(object):
	def __init__(self, oSWrapper, logger):
		self.oSWrapper = oSWrapper
		self.logger = logger

	def loadEdges(self, graphlocation: str, graphid: str):
		self.logger.info("Uploading " + graphid + " to Neo4J")
		"""Load edges cvs file into neo4j. graphlocation is string location of file
			and graphid is the unique id for this graph"""
		from py2neo import Graph
		from py2neo.packages.httpstream import http
		import os
		# Increase timeout because it can take a really long time.
		http.socket_timeout = 9999
		self.logger.info(graphlocation)
		if graphlocation.find("/") != 0 and graphlocation.find(":") != 1:
			graphlocation = os.getcwd() + "/" + graphlocation
		self.logger.info(graphlocation)
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
		except Exception as e:
			self.logger.error(e);
			self.logger.error("Edges failed. Unable to connect to neo4j.")

	def loadProp(self, graphlocation: str, graphid: str):
		self.logger.info("Uploading " + graphid + " to Neo4J")
		"""Load properties cvs file into neo4j. graphlocation is string location of file
			and graphid is the unique id for this graph"""
		from py2neo.packages.httpstream import http
		# Increase timeout because it can take a really long time.
		http.socket_timeout = 9999
		self.logger.info(graphlocation)
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
				query = ("MATCH (pnode:node { id:'" + row[0] + "', graphid:'" + graphid +
                     "'}) SET pnode." + row[1] + " = '" + row[2] + "'")
				tx.append(query)
				count += 1
			tx.commit()
		except Exception as e:
			self.logger.error(e);
			self.logger.error("Properties failed. Unable to connect to neo4j.")
