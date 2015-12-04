from file_handler.os.OSWrapper import *

class StorageFolderInit(object):

	def __init__(self, oSWrapper):
		self.oSWrapper = oSWrapper

	def intitializeStorageFolders(self, temp, backup):
		if not self.oSWrapper.validPath(temp):
			self.oSWrapper.makeDirectory(temp)

		if not self.oSWrapper.validPath(backup):
			self.oSWrapper.makeDirectory(backup)
