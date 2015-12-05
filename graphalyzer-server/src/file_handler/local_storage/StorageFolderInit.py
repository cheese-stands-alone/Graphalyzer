from file_handler.os.OSWrapper import *

class StorageFolderInit(object):

	def __init__(self, oSWrapper, tempDirectory, backupDirectory):
		self.oSWrapper = oSWrapper
		self.tempDirectory = tempDirectory
		self.backupDirectory = backupDirectory

	def intitializeStorageFolders(self):
		if not self.oSWrapper.validPath(self.tempDirectory):
			self.oSWrapper.makeDirectory(self.tempDirectory)

		if not self.oSWrapper.validPath(self.backupDirectory):
			self.oSWrapper.makeDirectory(self.backupDirectory)
