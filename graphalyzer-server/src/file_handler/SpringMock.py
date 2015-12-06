from file_handler.ServerFileHandlingService import *
from file_handler.file_handling.FileScanner import *
from file_handler.file_handling.FileHandler import *
from file_handler.file_handling.PathManipulation import *
from file_handler.local_storage.StorageFolderInit import *
from file_handler.neo4j.Neo4JInteraction import *
from file_handler.neo4j.FileUpload import *

class SpringMock(object):

	waitTimeInMinutes = 0.1
	tempDirectory = "neo4j_file_handling/temp/"
	backupDirectory = "neo4j_file_handling/backup/"
	logDirectory = "neo4j_file_handling/logs/"

	def getServerFileHandlingService(self):
		self.appendOSPathHeader()
		fileScanner = self.getNewFileScanner()
		storageFolderInit = self.getNewStorageFolderInit()
		serverFileHandlingService = ServerFileHandlingService(fileScanner, storageFolderInit, self.waitTimeInMinutes)
		return serverFileHandlingService

	def getNewStorageFolderInit(self):
		oSWrapper = OSWrapper()
		storageFolderInit = StorageFolderInit(oSWrapper, self.tempDirectory, self.backupDirectory)
		return storageFolderInit

	def getNewFileScanner(self):
		fileHandler = self.getNewFileHandler()
		oSWrapper = OSWrapper()
		fileScanner = FileScanner(fileHandler, oSWrapper, self.tempDirectory, self.backupDirectory)
		return fileScanner

	def getNewFileHandler(self):
		oSWrapper = OSWrapper()
		neo4JInteraction = Neo4JInteraction(oSWrapper)
		fileUpload = FileUpload(neo4JInteraction)
		pathManipulation = PathManipulation()
		fileHandler = FileHandler(fileUpload, pathManipulation, oSWrapper)
		return fileHandler

	def appendOSPathHeader(self):
		oSWrapper = OSWrapper()
		self.tempDirectory = oSWrapper.getOSPathHeader() + self.tempDirectory
		self.backupDirectory = oSWrapper.getOSPathHeader() + self.backupDirectory
		self.logDirectory = oSWrapper.getOSPathHeader() + self.logDirectory