from file_handler.SpringMock import *

class InitFileService:

	temp = "c:/neo4j_file_handling/temp/"
	backup = "c:/neo4j_file_handling/backup/"


	def initMain(self):
		springMock = SpringMock()
		serverFileHandlingService = springMock.getServerFileHandlingService()
		serverFileHandlingService.startService(self.temp, self.backup)

if __name__ == "__main__":
	initFileService = InitFileService()
	initFileService.initMain()