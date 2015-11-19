import threading

from app import *


def main():
    thread = threading.Thread(target=start_websocket_server,
                              args=())
    thread.start()


if __name__ == "__main__":
    main()
