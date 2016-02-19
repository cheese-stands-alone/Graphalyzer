import os
import datetime
import shutil
from os import path

class OSWrapper(object):

	def __init__(self, logger):
		self.logger = logger

	def validPath(self, path):
		self.logger.debug(path + " returns " + str(os.path.exists(path)))
		return os.path.exists(path)

	def makeDirectory(self, directoryName):
		self.logger.debug("Making directory " + directoryName)
		return os.makedirs(directoryName)

	def makeFile(self, fileName):
		self.logger.debug("Making file " + fileName)
		open(fileName, 'w').close()

	def getFileListing(self, directory):
		self.logger.debug("Retrieving file listing for " + directory)
		files = [x for x in os.listdir(directory) if path.isfile(directory+os.sep+x)]
		self.logger.debug("Files are: " + str(files))
		return files

	def getFileExtension(self, file):
		self.logger.debug("Retrieving file extension " + str(os.path.splitext(file)) + " for file " + file)
		return os.path.splitext(file)

	def getFileName(self, file):
		self.logger.debug("Retrieving file name " + os.path.splitext(os.path.basename(file))[0] + " for file " + file)
		return os.path.splitext(os.path.basename(file))[0]

	def moveFile(self, oldFileLocation, newFileLocation):
		self.logger.debug("Moving file from " + oldFileLocation + " to " + newFileLocation)
		shutil.move(oldFileLocation, newFileLocation)

	def getCurrentUTCDate(self):
		timestamp = datetime.datetime.utcnow().strftime("%a-%b-%d-%H-%M-%S-%Z-%Y")
		self.logger.debug("Getting new timestamp: " + str(timestamp))
		return timestamp

	def getOSPathHeader(self):
		if self.oSIsWindows():
			self.logger.debug("OS is Windows. Returning path header 'c:/'")
			return "c:/"
		else:
			self.logger.debug("OS is Linux. Returning no header. Logs being placed in current directory.")
			return ""

	def oSIsWindows(self):
		return os.name is 'nt'

	def getFileURI(self, graphLocation):
		if self.oSIsWindows():
			fileURI = "///" + graphLocation
			self.logger.debug("OS is Windows. Returning file URI: " + fileURI)
		else:
			fileURI = "//" + graphLocation
			self.logger.debug("OS is Linux. Returning file URI: " + fileURI)

		return fileURI
