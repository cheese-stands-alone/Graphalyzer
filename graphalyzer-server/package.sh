#!/bin/bash
APP=ServerApp
cp -R src temp
cd temp
pip3 install --target=. autobahn
pip3 install --target=. py2neo
pip3 install --target=. flask
pip3 install --target=. lz4
zip -r ${APP} *
cp ${APP}.zip ../${APP}
rm -Rf ../temp

