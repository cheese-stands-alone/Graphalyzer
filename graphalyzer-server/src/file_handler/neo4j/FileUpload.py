import sys

class FileUpload(object):

	def __init__(self, neo4JInteraction):
		self.neo4JInteraction = neo4JInteraction

	def addFileToDatabase(self, graphFileLocation, graphID):
		#//TODO change upload name and graph property
		try:
			if "edge" in graphID or "Edge" in graphID:
				self.neo4JInteraction.loadEdges(graphFileLocation, graphID)
			else:
				self.neo4JInteraction.loadProp(graphFileLocation, graphID)
		except:
			print("Problem uploading to Neo4J", sys.exc_info()[0])