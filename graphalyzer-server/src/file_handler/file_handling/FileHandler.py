import sys
from file_handler.file_handling.PathManipulation import *
from file_handler.neo4j.Neo4JInteraction import *


class FileHandler(object):


	def __init__(self, neo4JInteraction, pathManipulation, oSWrapper):
		self.neo4JInteraction = neo4JInteraction
		self.pathManipulation = pathManipulation
		self.oSWrapper = oSWrapper

	def moveFileToBackup(self, file, newFileName, temp, backup):
		oldPath = self.pathManipulation.constructOldFilePath(file, temp)

		newPath = self.pathManipulation.constructNewFilePath(newFileName, backup)
		self.oSWrapper.moveFile(oldPath, newPath)

	def addToNeo4J(self, file, graphName):
		self.neo4JInteraction.addFileToDatabase(file, graphName)

	def handleNewFile(self, file, temp, backup):
		try:
			currentTime = self.oSWrapper.getCurrentUTCDate()

			# //add original name to file
			filename, file_extension = self.oSWrapper.getFileExtension(file)
			newFileString = currentTime + "-" + self.oSWrapper.getFileName(file) + file_extension
			# //	writefln("%s", newFileString)
			self.moveFileToBackup(file, newFileString, temp, backup)

			self.addToNeo4J(backup + newFileString, self.oSWrapper.getFileName(newFileString))
		except:
			print("Error handling file", sys.exc_info()[0])