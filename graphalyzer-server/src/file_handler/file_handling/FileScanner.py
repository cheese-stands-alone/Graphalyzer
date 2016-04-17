from file_handler.file_handling.FileHandler import *
from file_handler.os.OSWrapper import *
import sys

class FileScanner(object):

	def __init__(self, fileHandler, oSWrapper, tempDirectory, backupDirectory, logger):
		self.fileHandler = fileHandler
		self.oSWrapper = oSWrapper
		self.tempDirectory = tempDirectory
		self.backupDirectory = backupDirectory
		self.logger = logger

	def scanForNewFiles(self):
		try:
			dFiles = self.oSWrapper.getFileListing(self.tempDirectory)
			if len(dFiles) > 0:
				self.logger.debug("Files found: " + str(dFiles))

			for d in dFiles:
				self.fileHandler.handleNewFile(d, self.tempDirectory, self.backupDirectory)
		except Exception as e:
			self.logger.error(e)
			self.logger.error("Error scanning for files " + str(sys.exc_info()))