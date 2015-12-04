from file_handler.file_handling.FileScanner import *
from file_handler.local_storage.StorageFolderInit import *

class ServerFileHandlingService(object):

	def __init__(self, fileScanner, storageFolderInit, waitTimeInMinutes):
		self.fileScanner = fileScanner
		self.storageFolderInit = storageFolderInit
		self.waitTimeInMinutes = waitTimeInMinutes


	def startService(self, temp, backup):
		storageFolderInit.intitializeStorageFolders(temp, backup)

		# //TODO
		# //parseConfig();
		# if 1/*result from parseConfig indicates use backup data*/:
		# 	//parse backup files
		# }

		while 1:
			time.sleep(waitTimeInMinutes * 60)
			fileScanner.scanForNewFiles(temp, backup)