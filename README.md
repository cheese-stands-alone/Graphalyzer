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
3. This will greate a file called ServerApp.
4. Run python3 ./ServerApp

### Setting up test environment
1. `npm install` takes care of installing Jest.
2. Due to a recent update to React, manually run `npm install --save-dev babel-preset-react babel-preset-es2015`, otherwise, Jest will throw a syntax error when using `babel-react`
3. `npm test` to run the tests in the `__test__` folder.

