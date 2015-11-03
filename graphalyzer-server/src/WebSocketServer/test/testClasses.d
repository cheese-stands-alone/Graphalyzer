module WebSocketServer.test.testClasses;

class dummyWebSocket {
    private static string _text;
    private bool isConnected;
    private int count = 0;
    public this(string text) {
        this();
        _text = text;
    }

    public this() {
        count = 0;
        isConnected = true;
    }

    public void send(string text) {
        _text = text;
        count = 0;
        close(9, "23423");
    }

    public string receiveText(bool strict = true) {
        return _text;
    }

    public bool connected() {
        return isConnected;
    }

    public bool waitForData() {
        return isConnected;
    }

    public void close(ushort num, string msg) {
        isConnected = false;
    }
}
