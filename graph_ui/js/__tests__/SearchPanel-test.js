jest.dontMock('../SearchPanel');
jest.dontMock('react');
jest.dontMock('react-bootstrap');

var React = require('react/addons');
var ReactDOM = require('react-dom');
var TestUtils = React.addons.TestUtils;

var SearchPanel = require('../SearchPanel');

describe('getInitialState', function() {
  it('initializes the searchpanel with the correct values', function() {
    // mock these functions and get rid of the nulls
    var search = TestUtils.renderIntoDocument(
      <SearchPanel graphList={null} getGraphList={null} sendWebSocketMessage={null}/>
    );

    var nodeName = search.state.nodeName;

    expect(nodeName).toEqual('');
  });
})
