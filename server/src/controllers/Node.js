'use strict';

var utils = require('../utils/writer.js');
var Node = require('../service/NodeService');

module.exports.addNode = function addNode (req, res, next) {
  var body = req.swagger.params['body'].value;
  Node.addNode(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getNodeById = function getNodeById (req, res, next) {
  var nodeId = req.swagger.params['NodeId'].value;
  Node.getNodeById(nodeId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getNodes = function getNodes (req, res, next) {
  Node.getNodes()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateNode = function updateNode (req, res, next) {
  var body = req.swagger.params['body'].value;
  Node.updateNode(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
