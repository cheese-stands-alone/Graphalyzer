module WebSocketServer.test.testClasses;

class dummyWebSocket {
	private static string _text;
    public this(string text)
    {
        _text = text;
    }
    public this()
    {
    }
    public void send(string text)
    {
        _text = text;
    }
    public string receiveText(bool strict = true)
    {
        return _text;
    }
}