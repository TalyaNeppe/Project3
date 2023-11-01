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
        // body? 
        // this.request = {'type': type,'url': url,'body': body} 
        // : 
        // this.request = {'type': type,'url': url}
    }

    send() {
        network.addRequest(this);
    }

    onload() {}
}