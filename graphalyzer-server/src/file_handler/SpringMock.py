from file_handler.ServerFileHandlingService import *
from file_handler.file_handling.FileScanner import *
from file_handler.file_handling.FileHandler import *
from file_handler.file_handling.PathManipulation import *
from file_handler.local_storage.StorageFolderInit import *
from file_handler.neo4j.Neo4JInteraction import *

class SpringMock(object):

	waitTimeInMinutes = 1

	def getServerFileHandlingService(self):
		fileScanner = getNewFileScanner()
		storageFolderInit = StorageFolderInit()
		serverFileHandlingService = ServerFileHandlingService(fileScanner, storageFolderInit, waitTimeInMinutes)
		return serverFileHandlingService

	def getNewFileScanner(self):
		fileHandler = getNewFileHandler()
		fileScanner = FileScanner(fileHandler)
		return fileScanner

	def getNewFileHandler(self):
		neo4JInteraction = Neo4JInteraction()
		pathManipulation = PathManipulation()
		fileHandler = FileHandler(neo4JInteraction, pathManipulation)
		return fileHandler