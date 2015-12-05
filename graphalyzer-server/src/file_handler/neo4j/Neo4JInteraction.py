import sys
class Neo4JInteraction:
	def addFileToDatabase(self, graphFileLocation, graphID):
		#//TODO change upload name and graph property
		try:
			print("here")
			if "edge" in graphID or "Edge" in graphID:
				self.loadEdges(graphFileLocation, graphID)
			else:
				self.loadProp(graphFileLocation, graphID)
		except:
			print("Problem uploading to Neo4J", sys.exc_info()[0])

#TODO move to separate file
	def loadEdges(self, graphlocation: str, graphid: str):
		import py2neo
		print("graph location: " + graphlocation + " graphid: " + graphid)
		query = ("USING PERIODIC COMMIT LOAD CSV WITH HEADERS FROM 'file:" +
		graphlocation + "' AS line " +
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

	def loadProp(self, graphlocation: str, graphid: str):
		# noinspection PyBroadException
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
