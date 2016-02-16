import time

class ServerFileHandlingService(object):

	def __init__(self, fileScanner, storageFolderInit, waitTimeInMinutes, logger):
		self.fileScanner = fileScanner
		self.storageFolderInit = storageFolderInit
		self.waitTimeInMinutes = waitTimeInMinutes
		self.logger = logger



	def startService(self):
		self.storageFolderInit.initializeStorageFolders()
		self.logger.info("Service starting.")
		# //TODO
		# //parseConfig();
		# if 1/*result from parseConfig indicates use backup data*/:
		# 	//parse backup files
		# }
		while 1:
			time.sleep(self.waitTimeInMinutes * 60)
			self.fileScanner.scanForNewFiles()