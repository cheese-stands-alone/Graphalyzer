#!/bin/bash
APP=ServerApp
cp -R src temp
cd temp
pip install --target=. autobahn
pip install --target=. py2neo
pip install --target=. flask
zip -r ${APP} *
cp ${APP}.zip ../${APP}
rm -Rf ../temp

