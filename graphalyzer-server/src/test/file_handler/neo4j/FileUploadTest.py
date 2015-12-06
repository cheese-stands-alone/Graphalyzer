import unittest
from unittest.mock import *
from file_handler.neo4j.FileUpload import *


class FileUploadTest(unittest.TestCase):
	def test_addFileToDatabase_returnsTrueForEdgeLoadForGraphIDContainingLowercaseEdge(self):
		neo4JInteraction = Mock()
		fileUpload = FileUpload(neo4JInteraction)

		fileUpload.addFileToDatabase("loc", "edge")
		self.assertTrue(neo4JInteraction.loadEdges.called)
		self.assertFalse(neo4JInteraction.loadProp.called)

	def test_addFileToDatabase_returnsTrueForEdgeLoadForGraphIDContainingUppercaseCaseEdge(self):
		neo4JInteraction = Mock()
		fileUpload = FileUpload(neo4JInteraction)

		fileUpload.addFileToDatabase("loc", "Edge")
		self.assertTrue(neo4JInteraction.loadEdges.called)
		self.assertFalse(neo4JInteraction.loadProp.called)

	def test_addFileToDatabase_returnsTrueForEdgeLoadForGraphIDNotContainingEdge(self):
		neo4JInteraction = Mock()
		fileUpload = FileUpload(neo4JInteraction)

		fileUpload.addFileToDatabase("loc", "id")
		self.assertFalse(neo4JInteraction.loadEdges.called)
		self.assertTrue(neo4JInteraction.loadProp.called)

if __name__ == '__main__':
    unittest.main()
