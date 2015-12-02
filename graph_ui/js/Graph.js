var Vis = require('vis');

var updateGraph = function(data) {
  if (Object.keys(data).length === 2 && typeof data === 'object') {
    console.log('updateGraph called');
    console.log(data);
    var identifier = document.getElementById('graph');
    var options = {
      height: '100%',
      width: '100%',
      interaction: {
        dragNodes: false
      }
    };
    var network = new Vis.Network(identifier, data, options);
  }
}

module.exports = {
  updateGraph
};