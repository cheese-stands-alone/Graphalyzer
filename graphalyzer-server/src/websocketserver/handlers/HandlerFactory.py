from websocketserver.handlers.ErrorHandler import *
from websocketserver.handlers.GetGraphHandler import *
from websocketserver.handlers.ListGraphHandler import *
from websocketserver.handlers.SessionIDHandler import *


class HandlerFactory(object):
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
                return GetGraphHandler(payload)
            elif request == "listgraphs":
                return ListGraphHandler()
            elif request == "newid":
                return SessionIDHandler()
            else:
                return ErrorHandler("Error unknown request type", payload)
        except ValueError:
            return ErrorHandler("Error parsing JSON message", "")
        except:  # catch *all* exceptions
            return ErrorHandler(
                "Required JSON field not found or unknown server error", "")
