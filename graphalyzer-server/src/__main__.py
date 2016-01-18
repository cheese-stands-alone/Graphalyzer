import threading

from app import *
from file_handler.InitFileService import *


def main():
    """Main method to start program."""
    thread = threading.Thread(target=start_websocket_server,
                              args=())
    thread.start()

    fileHandlingThread = threading.Thread(target=InitFileService.initMain, args=())
    fileHandlingThread.start()



if __name__ == "__main__":
    main()
