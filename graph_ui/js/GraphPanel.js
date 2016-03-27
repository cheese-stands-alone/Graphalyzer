/**
 * GraphPanel.js
 *
 * @author Andrew Bowler, Alberto Gomez-Estrada
 */

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Graph = require('./Graph.js');
var LoadingBar = require('./LoadingBar.js');
var Styles = require('./Styles.js');

var GraphPanel = React.createClass({
  /**
   * Calculates the loading bar progress based 
   * on number of chunks of graph data processed.
   */
  calculateLoadingBarProgress: function() {
    if (this.props.totalChunks) {
      var maxWidth = 496;
      var minWidth = 20;
      var widthFactor = parseInt(this.props.currentChunk) / parseInt(this.props.totalChunks);
      var width = Math.max(minWidth, maxWidth * widthFactor);
      var text = Math.round(widthFactor * 100) + '%';
      var result = {
        width: width,
        text: text
      };
      return result;
    } else {
      var result = {
        width: 0,
        text: '0%'
      };
      return result;
    }
  },

  render: function() {
    var progress = this.calculateLoadingBarProgress();
    var percentageText = progress.text;
    var barWidth = progress.width;
    var barStyle = Styles.barStyle;
    barStyle.width = barWidth;
    var loadingBar;
    if ((this.props.currentChunk == 0 && this.props.totalChunks == 0) || percentageText == '100%') {
      loadingBar = null;
    }
    else {
      loadingBar = 
        <LoadingBar
          barStyle={barStyle}
          percentageText={percentageText}
        />;
    }
    return (
      <div>
        <Graph 
          filter={this.props.filter}
          filterActive={this.props.filterActive}
          graphData={this.props.graphData} 
          logger={this.props.logger} 
          nodeInFocus={this.props.nodeInFocus}
          updateNodeInFocus={this.props.updateNodeInFocus}
          updateSelectedNode={this.props.updateSelectedNode}
        />
        {loadingBar}
      </div>
    );
  }
});

module.exports = GraphPanel;
