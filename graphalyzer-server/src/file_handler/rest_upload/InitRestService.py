from flask import Flask
from file_handler.rest_upload.RestUploadService import uploadAPI
from flask import Blueprint
from flask import request
import os
import uuid
import json
import subprocess
import sys


class InitRestService:


	def __init__(self, tempDirectory):
		self.tempDirectory = tempDirectory

	def startService(self):
		app = Flask(__name__)

		app.config['UPLOADDIR'] = self.tempDirectory
		# uploadAPI.config['UPLOADDIR'] = self.tempDirectoryy
		app.register_blueprint(uploadAPI)
		app.run(threaded=True)

		# self.child = subprocess.Popen([sys.executable, './RestUploadService.py', '--username', 'root'])
		#
		# initRestService = threading.Thread(target=RestUploadService.initMain, args=())
		# initRestService.start()
