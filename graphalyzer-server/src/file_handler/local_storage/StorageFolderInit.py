from file_handler.os.OSWrapper import *

class StorageFolderInit(object):

	def __init__(self, oSWrapper, tempDirectory, backupDirectory, logger):
		self.oSWrapper = oSWrapper
		self.tempDirectory = tempDirectory
		self.backupDirectory = backupDirectory
		self.logger = logger

	def initializeStorageFolders(self):
		if not self.oSWrapper.validPath(self.tempDirectory):
			self.logger.info("Temporary upload directory does not exist. Creating at " + self.tempDirectory)
			self.oSWrapper.makeDirectory(self.tempDirectory)

		if not self.oSWrapper.validPath(self.backupDirectory):
			self.logger.info("Backup directory does not exist. Creating at " + self.backupDirectory)
			self.oSWrapper.makeDirectory(self.backupDirectory)
