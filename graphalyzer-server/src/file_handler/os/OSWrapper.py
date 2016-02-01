import os
import datetime
import shutil
from os import path

class OSWrapper(object):
	def validPath(self, path):
		return os.path.exists(path)

	def makeDirectory(self, directoryName):
		return os.makedirs(directoryName)

	def makeFile(self, fileName):
		open(fileName, 'w').close()

	def getFileListing(self, directory):
		files = [x for x in os.listdir(directory) if path.isfile(directory+os.sep+x)]
		return files

	def getFileExtension(self, file):
		return os.path.splitext(file)

	def getFileName(self, file):
		return os.path.splitext(os.path.basename(file))[0]

	def moveFile(self, oldFileLocation, newFileLocation):
		shutil.move(oldFileLocation, newFileLocation)

	def getCurrentUTCDate(self):
		return datetime.datetime.utcnow().strftime("%a-%b-%d-%H-%M-%S-%Z-%Y")

	def getOSPathHeader(self):
		if self.oSIsWindows():
			return "c:/"
		else:
			return "/"

	def oSIsWindows(self):
		return os.name is 'nt'

	def getFileURI(self, graphLocation):
		if self.oSIsWindows():
			fileURI = "///" + graphLocation
		else:
			fileURI = "//" + graphLocation

		return fileURI