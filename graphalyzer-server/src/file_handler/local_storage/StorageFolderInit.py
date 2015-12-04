import os
class StorageFolderInit(object):


	def intitializeStorageFolders(self, temp, backup):
		if not os.path.exists(temp):
			os.makedirs(temp)

		if not os.path.exists(backup):
			os.makedirs(backup)
