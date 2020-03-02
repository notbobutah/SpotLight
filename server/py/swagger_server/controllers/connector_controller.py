import connexion
import six

from swagger_server.models.connector import Connector  # noqa: E501
from swagger_server import util


def addconnector(body):  # noqa: E501
    """Add a new connector to the database

     # noqa: E501

    :param body: connectorModel object that needs to be added to the diagram
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = Connector.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def getconnector_by_id(connectorId):  # noqa: E501
    """Find connector by ID

    Returns a single connector # noqa: E501

    :param connectorId: ID of connector to return
    :type connectorId: int

    :rtype: Connector
    """
    return 'do some magic!'


def getconnectors():  # noqa: E501
    """get all connectors

    Returns an array pf connectors # noqa: E501


    :rtype: Connector
    """
    return 'do some magic!'


def updateconnector(body):  # noqa: E501
    """Update an existing connector

     # noqa: E501

    :param body: connector object that needs to be added to the diagram
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = Connector.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
