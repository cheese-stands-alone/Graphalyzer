import unittest
from unittest.mock import *
from file_handler.file_handling.FileHandler import *


class FileUploadTest(unittest.TestCase):
	def test_moveFileToBackup_returnsTrueForOSWrapperMoveFileCalled(self):
		fileUpload = Mock()
		pathManipulation = PathManipulation()
		oSWrapper = Mock()
		fileHandler = FileHandler(fileUpload, pathManipulation, oSWrapper)

		fileHandler.moveFileToBackup("file", "newfile", "tempdir", "backupdir")
		self.assertTrue(oSWrapper.moveFile.called)

if __name__ == '__main__':
    unittest.main()
