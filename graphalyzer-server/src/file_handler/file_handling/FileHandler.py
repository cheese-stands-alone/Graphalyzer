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

	def addToNeo4J(self, file):
		self.neo4JInteraction.addFileToDatabase(file)

	def handleNewFile(self, file, temp, backup):

		currentTime = self.oSWrapper.getCurrentUTCDate()

		currentTimeString = currentTime.replace(" ", "-")
		currentTimeString = currentTimeString.replace(":", "-")
		# //add original name to file
		filename, file_extension = self.oSWrapper.getFileExtension(file)
		newFileString = currentTimeString + file_extension
		# //	writefln("%s", newFileString)

		self.moveFileToBackup(file, newFileString, temp, backup)

		self.addToNeo4J(newFileString)