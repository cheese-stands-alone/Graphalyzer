from websocketserver.handlers.GetGraphHandler import *
from websocketserver.handlers.ListGraphHandler import *
from websocketserver.handlers.SessionIDHandler import *
from websocketserver.handlers.GetGraphChunkHandler import *
from websocketserver.handlers.GetSubgraphHandler import *


class HandlerFactory(object):
    """Factory class to handle the different websocket requests."""
    @staticmethod
    def makehandler(payload: json) -> HandleInterface:
        # noinspection PyBroadException
        try:
            jsonmsg = json.loads(payload)
            # message_id = jsonmsg["message_id"]
            # sender_id = jsonmsg["sender_id"]
            # sender_time = jsonmsg["time"]
            request = jsonmsg["request"]
            # status = jsonmsg["status"]
            # error = jsonmsg["error"]
            payload = jsonmsg["payload"]
            # message = jsonmsg["message"]

            if request == "getgraph":
                return GetGraphHandler(request, payload)
            elif request == "listgraphs":
                return ListGraphHandler(request)
            elif request == "getgraphchunk":
                return GetGraphChunkHandler(request, payload)
            elif request == "getsubgraph":
                node = payload["node"]
                depth = payload["depth"]
                graphid = payload["graphid"]
                return GetSubgraphHandler(request, graphid, node, depth)
            elif request == "newid":
                return SessionIDHandler(request)
            else:
                return ErrorHandler(request, "Error unknown request type", payload)
        except ValueError:
            return ErrorHandler("malformatted", "Error parsing JSON message", "")
        except:  # catch *all* exceptions
            return ErrorHandler("malformatted"
                "Required JSON field not found or unknown server error", "")
