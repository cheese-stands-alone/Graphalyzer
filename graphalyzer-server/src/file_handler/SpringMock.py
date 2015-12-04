from file_handler.ServerFileHandlingService import *
from file_handler.file_handling.FileScanner import *
from file_handler.file_handling.FileHandler import *
from file_handler.file_handling.PathManipulation import *
from file_handler.local_storage.StorageFolderInit import *
from file_handler.neo4j.Neo4JInteraction import *

class SpringMock(object):

	waitTimeInMinutes = 1

	def getServerFileHandlingService(self):
		fileScanner = self.getNewFileScanner()
		storageFolderInit = self.getNewStorageFolderInit()
		serverFileHandlingService = ServerFileHandlingService(fileScanner, storageFolderInit, self.waitTimeInMinutes)
		return serverFileHandlingService

	def getNewStorageFolderInit(self):
		oSWrapper = OSWrapper()
		storageFolderInit = StorageFolderInit(oSWrapper)
		return storageFolderInit

	def getNewFileScanner(self):
		fileHandler = self.getNewFileHandler()
		oSWrapper = OSWrapper()
		fileScanner = FileScanner(fileHandler, oSWrapper)
		return fileScanner

	def getNewFileHandler(self):
		neo4JInteraction = Neo4JInteraction()
		pathManipulation = PathManipulation()
		oSWrapper = OSWrapper()
		fileHandler = FileHandler(neo4JInteraction, pathManipulation, oSWrapper)
		return fileHandler