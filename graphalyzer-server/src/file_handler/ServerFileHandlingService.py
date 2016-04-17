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
		while 1:
			#wait appropriate time, then scan for new files
			time.sleep(self.waitTimeInMinutes * 60)
			self.fileScanner.scanForNewFiles()