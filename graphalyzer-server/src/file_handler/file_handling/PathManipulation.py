class PathManipulation(object):
	def constructOldFilePath(self, file, temp):
		oldPath = temp + file
		return oldPath

	def constructNewFilePath(self, file, backup):
		newPath = backup + file
		return newPath