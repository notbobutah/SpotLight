import connexion
import six

from swagger_server.models.node import Node  # noqa: E501
from swagger_server import util


def add_node(body):  # noqa: E501
    """Add a new node to the database

     # noqa: E501

    :param body: NodeModel object that needs to be added to the diagram
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = Node.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def get_node_by_id(NodeId):  # noqa: E501
    """Find Node by ID

    Returns a single Node # noqa: E501

    :param NodeId: ID of Node to return
    :type NodeId: int

    :rtype: Node
    """
    return 'do some magic!'


def get_nodes():  # noqa: E501
    """get all nodes

    Returns an array pf Nodes # noqa: E501


    :rtype: Node
    """
    return 'do some magic!'


def update_node(body):  # noqa: E501
    """Update an existing Node

     # noqa: E501

    :param body: Node object that needs to be added to the diagram
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = Node.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
