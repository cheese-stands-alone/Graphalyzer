from file_handler.file_handling.FileHandler import *
from file_handler.os.OSWrapper import *
import sys

class FileScanner(object):

	def __init__(self, fileHandler, oSWrapper, tempDirectory, backupDirectory):
		self.fileHandler = fileHandler
		self.oSWrapper = oSWrapper
		self.tempDirectory = tempDirectory
		self.backupDirectory = backupDirectory

	def scanForNewFiles(self):
		try:
			dFiles = self.oSWrapper.getFileListing(self.tempDirectory)
			print(dFiles)

			for d in dFiles:
				# //			writefln("%s", d.name);
				# //TODO - add file lock check
				self.fileHandler.handleNewFile(d, self.tempDirectory, self.backupDirectory)
		except:
			print("Error scanning for files ", sys.exc_info()[0])