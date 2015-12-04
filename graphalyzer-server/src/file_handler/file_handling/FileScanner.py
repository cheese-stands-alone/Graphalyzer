import os
from os import path
from file_handler.file_handling.FileHandler import *

class FileScanner(object):

	def __init__(self, fileHandler):
		self.fileHandler = fileHandler

	def scanForNewFiles(self, temp, backup):
		try:
			dFiles = filter(path.isfile, os.listdir(temp))


			for d in dFiles:
				# //			writefln("%s", d.name);
				# //TODO - add file lock check
				fileHandler.handleNewFile(d, temp, backup)
		except:
			print("Error scanning for files")