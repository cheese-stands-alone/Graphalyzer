import unittest
from unittest.mock import *
from file_handler.file_handling.FileScanner import *


class FileScannerTest(unittest.TestCase):
	def test_scanForNewFiles_returnsFalseForNoFiles(self):
		tempDirectory = "dir"
		backupDirectory = "dir"
		fileHandler = Mock()
		oSWrapper = Mock()
		oSWrapper.getFileListing.return_value = []

		fileScanner = FileScanner(fileHandler, oSWrapper, tempDirectory, backupDirectory)

		fileScanner.scanForNewFiles()
		self.assertFalse(fileHandler.handleNewFile.called)

	def test_scanForNewFiles_returnsTrueForOneFile(self):
		tempDirectory = "dir"
		backupDirectory = "dir"
		fileHandler = Mock()
		oSWrapper = Mock()
		oSWrapper.getFileListing.return_value = ['file.txt', 'file.txt']

		fileScanner = FileScanner(fileHandler, oSWrapper, tempDirectory, backupDirectory)

		fileScanner.scanForNewFiles()
		self.assertTrue(fileHandler.handleNewFile.called)


if __name__ == '__main__':
	unittest.main()
