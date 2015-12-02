var Vis = require('vis');

var updateGraph = function(data) {
  if (Object.keys(data).length === 2 && typeof data === 'object') {
    var identifier = document.getElementById('graph');
    var options = {
      edges: {
        arrows: {
          to: {
            scaleFactor: 0.5
          }
        }
      },
      height: '100%',
      interaction: {
        dragNodes: false
      },
      width: '100%'
    };
    var network = new Vis.Network(identifier, data, options);
  }
};

module.exports = {
  updateGraph
};