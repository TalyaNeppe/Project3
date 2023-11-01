class Network{
    constructor() {
        this.requests = [];
    }

    addRequest(request) {
        this.requests.push(request);
    }
}

const network = new Network();

document.addEventListener('DOMContentLoaded', () => {
    setInterval(()=> {
        if(network.requests.length > 0) {
            const request = network.requests[0];
            // check if request is to server or client
            if (request.status) {
                // send request to client
            } else {
                // send request to server
                server.addRequest(request);
            }

            // remove request
            network.requests.splice(0, 1);
        }
    }, 1000);
})
