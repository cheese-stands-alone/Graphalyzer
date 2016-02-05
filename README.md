# Graphalyzer
![travis-ci status](https://travis-ci.org/rwhite226/Graphalyzer.svg?branch=master) [![Coverage Status](https://coveralls.io/repos/rwhite226/Graphalyzer/badge.svg?branch=master&service=github)](https://coveralls.io/github/rwhite226/Graphalyzer?branch=master)

Senior Design Project

### Running web client (for development)
1. Go to `graph_ui/`
2. `npm install -g browserify gulp` to install Browserify and Gulp globally on your machine (skip this if you have done so before)
3. `npm install` to load all packages from `package.json`
4. Run `gulp` to compile the JavaScript for development environment, or `gulp production` for minified code
5. Open up the client locally on your machine

### Running backend (for development)
1. Go into the graphalyzer-server directory
2. Run package.sh.
3. This will create a file called ServerApp.
4. Run python[3] ./ServerApp

### Running Jasmine (for testing)
1. cd into the Graphalyzer directory
2. `npm install -g jasmine`
3. `jasmine init` to initialize jasmine for testing
4. If you do not have the examples loaded on your machine, run `jasmine examples` to seed the project with some examples. These tests will always return true
5. `jasmine` to run all tests. The tests will be defined in the /spec directory
6. Jasmine is pretty thoroughly documented, this http://evanhahn.com/how-do-i-jasmine/ is a pretty concise tutorial on how to get started writing your own tests
