#!flask/bin/python
from flask import Flask
from flask import request
from flask import Blueprint
from flask import current_app
import os
import uuid
import json

uploadAPI = Blueprint('uploadAPI', __name__)


@uploadAPI.route('/upload', methods=['POST'])
def uploadFile():
	if request.method == 'POST':
		file = request.files['file']
		f_name = str(uuid.uuid4()).replace("-", "") + "-" + file.filename
		logger = current_app.config['LOGGER']
		logger.info("Received file upload: " + f_name)
		file.save(os.path.join(current_app.config['UPLOADDIR'], f_name))
		return json.dumps({'filename': f_name})
