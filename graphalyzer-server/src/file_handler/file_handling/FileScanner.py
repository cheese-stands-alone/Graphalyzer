from file_handler.file_handling.FileHandler import *
from file_handler.os.OSWrapper import *
import sys

class FileScanner(object):

	def __init__(self, fileHandler, oSWrapper):
		self.fileHandler = fileHandler
		self.oSWrapper = oSWrapper

	def scanForNewFiles(self, temp, backup):
		try:
			dFiles = self.oSWrapper.getFileListing(temp)
			print(dFiles)

			for d in dFiles:
				# //			writefln("%s", d.name);
				# //TODO - add file lock check
				self.fileHandler.handleNewFile(d, temp, backup)
		except:
			print("Error scanning for files ", sys.exc_info()[0])