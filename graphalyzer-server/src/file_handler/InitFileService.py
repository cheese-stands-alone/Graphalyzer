from file_handler.SpringMock import *

class InitFileService:
	def initMain(self):
		springMock = SpringMock()
		serverFileHandlingService = springMock.getServerFileHandlingService()
		serverFileHandlingService.startService(temp, backup)