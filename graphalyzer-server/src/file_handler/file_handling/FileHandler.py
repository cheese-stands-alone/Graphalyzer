import datetime
import os
import shutil

from file_handler.file_handling.PathManipulation import *
from file_handler.neo4j.Neo4JInteraction import *


class FileHandler(object):


	def __init__(self, neo4JInteraction, pathManipulation):
		self.neo4JInteraction = neo4JInteraction
		self.pathManipulation = pathManipulation

	def moveFileToBackup(self, file, newFileName, temp, backup):
		oldPath = self.pathManipulation.constructOldFilePath(file, temp)

		newPath = self.pathManipulation.constructNewFilePath(newFileName, backup)
		shutil.move(oldPath, newPath)

	def addToNeo4J(self, file):
		self.neo4JInteraction.addFileToDatabase(file)

	def handleNewFile(self, file, temp, backup):

		currentTime = datetime.utcnow()

		currentTimeString = currentTime.replace(" ", "-")
		currentTimeString = currentTimeString.replace(":", "-")
		# //add original name to file
		filename, file_extension = os.path.splitext(file)
		newFileString = currentTimeString + file_extension
		# //	writefln("%s", newFileString)

		self.moveFileToBackup(file, newFileString, temp, backup)

		self.addToNeo4J(newFileString)