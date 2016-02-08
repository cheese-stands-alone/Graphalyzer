import threading
import logging
from file_handler.SpringMock import *


class InitFileService:




	def initMain(self):
		springMock = SpringMock()

		initRestService = springMock.getInitRestService()
		initRestServiceThread = threading.Thread(target=initRestService.startService, args=())
		initRestServiceThread.start()

		serverFileHandlingService = springMock.getServerFileHandlingService()
		serverFileHandlingService.startService()

if __name__ == "__main__":
	initFileService = InitFileService()
	initFileService.initMain()