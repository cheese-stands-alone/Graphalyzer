'use strict';

jest.unmock('../js/ExportURL');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ExportURL from '../js/ExportURL';

describe('ExportURL', () => {

  it('renders the button', () => {
    
    const exportURL = TestUtils.renderIntoDocument(
      <ExportURL />
    );

    const exportURLNode = ReactDOM.findDOMNode(exportURL);

    expect(exportURLNode).toBeUndefined();
  });
  
});