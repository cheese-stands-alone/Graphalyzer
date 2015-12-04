from file_handler.neo4j.Neo4JInteraction import *
from file_handler.file_handling.PathManipulation import *
import shutil
import datetime
import os

class FileHandler(object):


	def __init__(self, neo4JInteraction, pathManipulation):
		self.neo4JInteraction = neo4JInteraction
		self.pathManipulation = pathManipulation

	def moveFileToBackup(self, file, newFileName, temp, backup):
		oldPath = pathManipulation.constructOldFilePath(file, temp)

		newPath = pathManipulation.constructNewFilePath(newFileName, backup)
		shutil.move(oldPath, newPath)

	def addToNeo4J(self, file):
		neo4JInteraction.addFileToDatabase(file)

	def handleNewFile(self, file, temp, backup):

		currentTime = datetime.utcnow()

		currentTimeString = currentTime.replace(" ", "-")
		currentTimeString = currentTimeString.replace(":", "-")
		# //add original name to file
		filename, file_extension = os.path.splitext(file)
		newFileString = currentTimeString + file_extension
		# //	writefln("%s", newFileString)

		moveFileToBackup(file, newFileString, temp, backup)

		addToNeo4J(newFileString)