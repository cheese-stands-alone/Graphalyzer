class PathManipulation(object):

	def __init__(self, logger):
		self.logger = logger

	def constructOldFilePath(self, file, temp):
		oldPath = temp + file
		self.logger.debug("Constructing file path for temporary directory: " + oldPath)
		return oldPath

	def constructNewFilePath(self, file, backup):
		newPath = backup + file
		self.logger.debug("Constructing file path for backup directory: " + newPath)
		return newPath