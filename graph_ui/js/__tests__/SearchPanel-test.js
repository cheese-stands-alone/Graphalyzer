jest.dontMock('../SearchPanel');
jest.dontMock('react');
jest.dontMock('react-bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';

var SearchPanel = require('../SearchPanel');

describe('getInitialState', function() {
  it('initializes the searchpanel with the correct values', function() {

    // Call into the function we want to test
    function getInitialState() {}
    SearchPanel(getInitialState);

    expect(searchErr).toBe(false);
  });
})
