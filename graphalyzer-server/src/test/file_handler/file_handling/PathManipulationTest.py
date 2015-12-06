import unittest
from file_handler.file_handling.PathManipulation import *


class PathManipulationTest(unittest.TestCase):
    def test_constructOldFilePath_returnsTrue(self):
        pathManipulation = PathManipulation()
        self.assertEqual(pathManipulation.constructOldFilePath("file.txt", "/path/"), "/path/file.txt")

    def test_constructNewFilePath_returnsTrue(self):
        pathManipulation = PathManipulation()
        self.assertEqual(pathManipulation.constructNewFilePath("file.txt", "/path/"), "/path/file.txt")

if __name__ == '__main__':
    unittest.main()
