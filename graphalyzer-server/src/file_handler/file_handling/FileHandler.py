import sys
from file_handler.file_handling.PathManipulation import *
from file_handler.neo4j.Neo4JInteraction import *


class FileHandler(object):


	def __init__(self, fileUpload, pathManipulation, oSWrapper, logger):
		self.fileUpload = fileUpload
		self.pathManipulation = pathManipulation
		self.oSWrapper = oSWrapper
		self.logger = logger

	def moveFileToBackup(self, file, newFileName, temp, backup):
		oldPath = self.pathManipulation.constructOldFilePath(file, temp)
		newPath = self.pathManipulation.constructNewFilePath(newFileName, backup)
		self.logger.info("Moving file " + file + " from " + oldPath + " to " + newFileName + " in " + backup)
		self.oSWrapper.moveFile(oldPath, newPath)

	def addToNeo4J(self, file, graphName):
		self.logger.info("Adding file " + file + " to database under graph name " + graphName)
		self.fileUpload.addFileToDatabase(file, graphName)

	def handleNewFile(self, file, temp, backup):
		try:
			currentTime = self.oSWrapper.getCurrentUTCDate()

			filename, file_extension = self.oSWrapper.getFileExtension(file)
			newFileString = currentTime + "-" + self.oSWrapper.getFileName(file) + file_extension
			self.moveFileToBackup(file, newFileString, temp, backup)
			self.logger.error(filename)
			self.logger.error(filename.find("-"))
			self.logger.error(filename[filename.find("-") + 1:])
			self.addToNeo4J(backup + newFileString, filename[filename.find("-") + 1:])
		except Exception as e:
			self.logger.error(e)
			self.logger.error("Error handling file " + str(sys.exc_info()))