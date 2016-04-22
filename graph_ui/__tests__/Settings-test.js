'use strict';

jest.unmock('../js/Settings');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Settings from '../js/Settings';

describe('Settings', () => {

  it('renders the settings panel correctly', () => {
    
    const settings = TestUtils.renderIntoDocument(
      <Settings />
    );

    const settingsNode = ReactDOM.findDOMNode(settings);

    expect(settingsNode).toBeDefined();
  });

  it('opens the settings panel when button is clicked', () => {
    
    const settings = new Settings();

    const btns = TestUtils.scryRenderedDOMComponentsWithTag(settings, 'Button');

    const Button = btns[1];

    TestUtils.Simulate.click(Button);

    expect(settings.state.show).toEqual(true);

    TestUtils.Simulate.click(Button);

    expect(settings.state.show).toEqual(false);
  });

});