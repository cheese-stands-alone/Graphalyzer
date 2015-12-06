import unittest
from unittest.mock import *
from file_handler.local_storage.StorageFolderInit import *


class StorageFolderInitTest(unittest.TestCase):
    def test_initializeStorageFolders_calledTwiceForCreatingNonExistentDirectories(self):
        tempDirectory = "dir"
        backupDirectory = "dir"
        oSWrapper = Mock()
        oSWrapper.validPath.return_value = False

        storageFolderInit = StorageFolderInit(oSWrapper, tempDirectory, backupDirectory)


        storageFolderInit.initializeStorageFolders()
        self.assertTrue(oSWrapper.makeDirectory.call_count is 2)

    def test_initializeStorageFolders_calledZeroTimesForCreatingAlreadyExistentDirectories(self):
        tempDirectory = "dir"
        backupDirectory = "dir"
        oSWrapper = Mock()
        oSWrapper.validPath.return_value = True

        storageFolderInit = StorageFolderInit(oSWrapper, tempDirectory, backupDirectory)


        storageFolderInit.initializeStorageFolders()
        self.assertTrue(oSWrapper.makeDirectory.call_count is 0)



if __name__ == '__main__':
    unittest.main()
