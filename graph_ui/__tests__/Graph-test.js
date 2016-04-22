'use strict';

jest.unmock('../js/Graph');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Graph from '../js/Graph';

describe('Graph', () => {

  it('renders the graph area', () => {
    
    const graph = TestUtils.renderIntoDocument(
      <Graph />
    );

    const graphNode = ReactDOM.findDOMNode(graph);

    expect(graphNode).toBeDefined();
  });

  it('sets the correct default state', () => {
    
    const graph = new Graph();

    graph.render();

    expect(graph.network).toBeFalsy();
    expect(graph.oldData).toBeFalsy();
  });

});