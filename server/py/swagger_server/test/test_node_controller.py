# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.node import Node  # noqa: E501
from swagger_server.test import BaseTestCase


class TestNodeController(BaseTestCase):
    """NodeController integration test stubs"""

    def test_add_node(self):
        """Test case for add_node

        Add a new node to the database
        """
        body = Node()
        response = self.client.open(
            '/api/v1/node',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_node_by_id(self):
        """Test case for get_node_by_id

        Find Node by ID
        """
        response = self.client.open(
            '/api/v1/node/{NodeId}'.format(NodeId=789),
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_nodes(self):
        """Test case for get_nodes

        get all nodes
        """
        response = self.client.open(
            '/api/v1/node',
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_update_node(self):
        """Test case for update_node

        Update an existing Node
        """
        body = Node()
        response = self.client.open(
            '/api/v1/node',
            method='PUT',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
