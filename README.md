# Graphalyzer
![travis-ci status](https://travis-ci.org/rwhite226/Graphalyzer.svg?branch=master) [![Coverage Status](https://coveralls.io/repos/rwhite226/Graphalyzer/badge.svg?branch=master&service=github)](https://coveralls.io/github/rwhite226/Graphalyzer?branch=master)

Senior Design Project

### Running web client (for development)
1. Go to `graph_ui/`
2. `npm install -g browserify gulp` to install Browserify and Gulp globally on your machine (skip this if you have done so before)
3. `npm install` to load all packages from `package.json`
4. Run `gulp` to compile the JavaScript
5. Open up the client locally on your machine
6. When adding changes, re-compile with `gulp`

### Running backend (for development)
1. Go into the graphalyzer-server directory
2. 'dub build' to build.
3. 'dub test' to run unittests.
4. 'dub run' to run server.
