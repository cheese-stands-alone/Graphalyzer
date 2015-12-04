import os
import datetime
import shutil
from os import path
from file_handler.os.OSWrapper import *

class OSWrapper(object):
	def validPath(self, path):
		return os.path.exists(path)

	def makeDirectory(self, directoryName):
		return os.makedirs(directoryName)

	def getFileListing(self, directory):
		return filter(path.isfile, os.listdir(directory))

	def getFileExtension(self, file):
		return os.path.splitext(file)

	def moveFile(self, oldFileLocation, newFileLocation):
		shutil.move(oldFileLocation, newFileLocation)

	def getCurrentUTCDate(self):
		return datetime.utcnow()