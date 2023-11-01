class FXMLHttpRequest{
    constructor() {
        this.status = 0;
        this.requestText = '';
    }

    open(type, url, body) {
        this.type = type;
        this.url = url;
        if (body) {
            this.body = body;
        }
    }

    send() {
        network.addRequest(this);
    }

    onload() {
        console.log("You did not define an 'onload' function");
    }
}