import sys

class FileUpload(object):

	def __init__(self, neo4JInteraction, logger):
		self.neo4JInteraction = neo4JInteraction
		self.logger = logger

	def addFileToDatabase(self, graphFileLocation, graphID):
		try:
			if "edge" in graphID or "Edge" in graphID:
				#remove edge from graph name
				graphID = graphID.replace("edges", "")
				graphID = graphID.replace("Edges", "")
				graphID = graphID.replace("edge", "")
				graphID = graphID.replace("Edge", "")
				self.logger.info("Edge graph to be uploaded to database. Graph ID is " + graphID)
				self.neo4JInteraction.loadEdges(graphFileLocation, graphID)
			else:
				#remove property from graph name
				graphID = graphID.replace("properties", "")
				graphID = graphID.replace("Properties", "")
				graphID = graphID.replace("props", "")
				graphID = graphID.replace("Props", "")
				graphID = graphID.replace("prop", "")
				graphID = graphID.replace("Prop", "")
				self.logger.info("Property graph to be uploaded to database. Graph ID is " + graphID)
				self.neo4JInteraction.loadProp(graphFileLocation, graphID)
		except Exception as e:
			self.logger.error(e)
			self.logger.error("Problem uploading to Neo4J " + str(sys.exc_info()))