# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.connector import Connector  # noqa: E501
from swagger_server.test import BaseTestCase


class TestConnectorController(BaseTestCase):
    """ConnectorController integration test stubs"""

    def test_addconnector(self):
        """Test case for addconnector

        Add a new connector to the database
        """
        body = Connector()
        response = self.client.open(
            '/api/v1/connector',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_getconnector_by_id(self):
        """Test case for getconnector_by_id

        Find connector by ID
        """
        response = self.client.open(
            '/api/v1/connector/{connectorId}'.format(connectorId=789),
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_getconnectors(self):
        """Test case for getconnectors

        get all connectors
        """
        response = self.client.open(
            '/api/v1/connector',
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_updateconnector(self):
        """Test case for updateconnector

        Update an existing connector
        """
        body = Connector()
        response = self.client.open(
            '/api/v1/connector',
            method='PUT',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
