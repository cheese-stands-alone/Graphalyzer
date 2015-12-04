from file_handler.SpringMock import *

class InitFileService:

	temp = "./temp/"
	backup = "./backup/"


	def initMain(self):
		springMock = SpringMock()
		serverFileHandlingService = springMock.getServerFileHandlingService()
		serverFileHandlingService.startService(self.temp, self.backup)