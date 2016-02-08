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
		self.setupLogger()

	def getServerFileHandlingService(self):
		fileScanner = self.getNewFileScanner()
		storageFolderInit = self.getNewStorageFolderInit()
		serverFileHandlingService = ServerFileHandlingService(fileScanner, storageFolderInit, FOLDERSCANWAITTIMEINMINUTES, self.logger.getChild("ServerFileHandlingService.py"))
		return serverFileHandlingService

	def getInitRestService(self):
		initRestService = InitRestService(self.tempDirectory, self.logger.getChild("InitRestService.py"), self.logger.getChild("RestUploadService.py"));
		return initRestService


	def getNewStorageFolderInit(self):
		oSWrapper = OSWrapper(self.logger.getChild("OSWrapper.py"))
		storageFolderInit = StorageFolderInit(oSWrapper, self.tempDirectory, self.backupDirectory, self.logger.getChild("StorageFolderInit.py"))
		return storageFolderInit

	def getNewFileScanner(self):
		fileHandler = self.getNewFileHandler()
		oSWrapper = OSWrapper(self.logger.getChild("OSWrapper.py"))
		fileScanner = FileScanner(fileHandler, oSWrapper, self.tempDirectory, self.backupDirectory, self.logger.getChild("FileScanner.py"))
		return fileScanner

	def getNewFileHandler(self):
		oSWrapper = OSWrapper(self.logger.getChild("OSWrapper.py"))
		neo4JInteraction = Neo4JInteraction(oSWrapper, self.logger.getChild("Neo4JInteraction.py"))
		fileUpload = FileUpload(neo4JInteraction, self.logger.getChild("FileUpload.py"))
		pathManipulation = PathManipulation(self.logger.getChild("PathManipulation.py"))
		fileHandler = FileHandler(fileUpload, pathManipulation, oSWrapper, self.logger.getChild("FileHandler.py"))
		return fileHandler

	def appendOSPathHeader(self):
		oSWrapper = OSWrapper(logging.getLogger("OSWrapper.py"))
		relativePathString = "."
		if TEMPDIRECTORY.find(relativePathString) != 0:
			self.tempDirectory = oSWrapper.getOSPathHeader() + TEMPDIRECTORY
		if BACKUPDIRECTORY.find(relativePathString) != 0:
			self.backupDirectory = oSWrapper.getOSPathHeader() + BACKUPDIRECTORY
		if LOGDIRECTORY.find(relativePathString) != 0:
			self.logDirectory = oSWrapper.getOSPathHeader() + LOGDIRECTORY

	def setupLogger(self):
		self.initLoggerFile()
		return self.configureLogger()

	def initLoggerFile(self):
		oSWrapper = OSWrapper(logging.getLogger("OSWrapper.py"))
		if not oSWrapper.validPath(self.logDirectory):
			oSWrapper.makeDirectory(self.logDirectory)
		if not oSWrapper.validPath(self.logDirectory + LOGFILE):
			oSWrapper.makeFile(self.logDirectory + LOGFILE)

	def configureLogger(self):
		logLocation = self.logDirectory + LOGFILE
		logging.basicConfig(level=LOGGERLEVEL)
		#filename=logLocation, level=LOGGERLEVEL)
		handler = logging.FileHandler(logLocation)
		self.logger = logging.getLogger()
		formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(name)s - %(message)s")
		handler.setFormatter(formatter)
		self.logger.addHandler(handler)