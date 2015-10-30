module WebSocketServer.test.testClasses;

class dummyWebSocket {
    private static string _text;
    private int count = 0;
    public this(string text) {
        _text = text;
    }

    public this() {
        count = 0;
    }

    public void send(string text) {
        _text = text;
        count = 0;
    }

    public string receiveText(bool strict = true) {
        return _text;
    }

    public bool connected() {
        if (count == 0) {
            count++;
            return true;
        }
        return false;
    }

    public bool waitForData() {
        return true;
    }
}
