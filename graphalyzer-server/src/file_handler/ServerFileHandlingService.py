from file_handler.file_handling.FileScanner import *
from file_handler.local_storage.StorageFolderInit import *
import time

class ServerFileHandlingService(object):

	def __init__(self, fileScanner, storageFolderInit, waitTimeInMinutes):
		self.fileScanner = fileScanner
		self.storageFolderInit = storageFolderInit
		self.waitTimeInMinutes = waitTimeInMinutes



	def startService(self):
		self.storageFolderInit.intitializeStorageFolders()

		# //TODO
		# //parseConfig();
		# if 1/*result from parseConfig indicates use backup data*/:
		# 	//parse backup files
		# }
		while 1:
			time.sleep(self.waitTimeInMinutes * 60)
			self.fileScanner.scanForNewFiles()