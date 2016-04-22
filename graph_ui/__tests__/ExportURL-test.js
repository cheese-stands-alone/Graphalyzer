'use strict';

jest.unmock('../js/ExportURL');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ExportURL from '../js/ExportURL';

describe('ExportURL', () => {

  var URL = "http://graphalyzer.wk-dev.wdesk.org/"

  const exportURL = TestUtils.renderIntoDocument(
      <ExportURL />
    );

  it('renders the button', () => {

    const exportURLNode = ReactDOM.findDOMNode(exportURL);

    expect(exportURLNode).toBeDefined();
  });

  it('returns a url', () => {
    
    exportURL.createURL();

    expect(exportURL).toEqual(URL);
  });
  
});