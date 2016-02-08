from flask import Flask
from file_handler.rest_upload.RestUploadService import uploadAPI
from flask import Blueprint
from flask import request
import os
import uuid
import json
import subprocess
import sys
import zlib


class InitRestService:


	def __init__(self, tempDirectory, logger, restUploadServiceLogger):
		self.tempDirectory = tempDirectory
		self.logger = logger
		self.restUploadServiceLogger = restUploadServiceLogger

	def startService(self):
		app = Flask(__name__)
		app.config['UPLOADDIR'] = self.tempDirectory
		app.config['LOGGER'] = self.restUploadServiceLogger
		app.register_blueprint(uploadAPI)
		self.logger.info("Starting Flask with upload directory: " + self.tempDirectory)
		app.run(threaded=True)