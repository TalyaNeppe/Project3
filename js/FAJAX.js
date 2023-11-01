class FXMLHttpRequest{
    constructor() {
        this.status = 404;
        this.request = {};
    }

    open(type, url, body) {
        body? 
        this.request = {'type': type,'url': url,'body': body} 
        : 
        this.request = {'type': type,'url': url}

    }

    send() {
        network.addRequest(this.request);
    }

    onload() {

    }
}