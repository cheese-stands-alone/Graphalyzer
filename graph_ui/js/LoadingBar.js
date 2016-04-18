/**
 * Loading Bar to display data collection progress
 * 
 * @author Andrew Bowler
 */

var React = require('react');
var Styles = require('./Styles.js');

var LoadingBar = React.createClass({
  render: function() {
    return (
      <div id='loadingBar' style={Styles.loadingBarStyle}>
        <div className='outerBorder' style={Styles.outerBorderStyle}>
          <div ref='text' id='text' style={Styles.textStyle}>{this.props.percentageText}</div>
          <div id='border' style={Styles.borderStyle}>
           <div ref='bar' id='bar' style={this.props.barStyle} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LoadingBar;
