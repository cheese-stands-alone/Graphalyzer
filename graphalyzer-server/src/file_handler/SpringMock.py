from file_handler.ServerFileHandlingService import *
from file_handler.file_handling.FileScanner import *
from file_handler.file_handling.FileHandler import *
from file_handler.file_handling.PathManipulation import *
from file_handler.local_storage.StorageFolderInit import *
from file_handler.os.OSWrapper import *
from file_handler.neo4j.Neo4JInteraction import *
from file_handler.neo4j.FileUpload import *
from file_handler.rest_upload.InitRestService import *
import logging
from ServerConfig import *

class SpringMock(object):



	def __init__(self):
		self.appendOSPathHeader()

	def getServerFileHandlingService(self):
		fileScanner = self.getNewFileScanner()
		storageFolderInit = self.getNewStorageFolderInit()
		serverFileHandlingService = ServerFileHandlingService(fileScanner, storageFolderInit, FOLDERSCANWAITTIMEINMINUTES)
		self.setupLogger()
		return serverFileHandlingService

	def getInitRestService(self):
		initRestService = InitRestService(self.tempDirectory);
		return initRestService


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
		relativePathString = "."
		if TEMPDIRECTORY.find(relativePathString) != 0:
			self.tempDirectory = oSWrapper.getOSPathHeader() + TEMPDIRECTORY
		if BACKUPDIRECTORY.find(relativePathString) != 0:
			self.backupDirectory = oSWrapper.getOSPathHeader() + BACKUPDIRECTORY
		if LOGDIRECTORY.find(relativePathString) != 0:
			self.logDirectory = oSWrapper.getOSPathHeader() + LOGDIRECTORY

	def setupLogger(self):
		self.initLoggerFile()
		self.setLoggerLevel()

	def initLoggerFile(self):
		oSWrapper = OSWrapper()
		if not oSWrapper.validPath(self.logDirectory):
			oSWrapper.makeDirectory(self.logDirectory)
		if not oSWrapper.validPath(self.logDirectory + LOGFILE):
			oSWrapper.makeFile(self.logDirectory + LOGFILE)

	def setLoggerLevel(self):
		logLocation = self.logDirectory + LOGFILE
		logging.basicConfig(filename=logLocation, level=LOGGERLEVEL)