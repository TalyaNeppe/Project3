class Network{
    constructor() {
        this.requests = [];
    }

    addRequest(request) {
        this.requests.push(request);
        console.log('did newtwork addRequest')
    }
}

const network = new Network();

document.addEventListener('DOMContentLoaded', () => {
    setInterval(()=> {
        if(network.requests.length > 0) {
            console.log('found request in network')
            const request = network.requests[0];
            // check if request is to server or client
            if (request.status !== 0) {
                // send request to client
                console.log('there is a status in request');
                const req = request;
                setTimeout(() => {
                    req.onload();
                }, 3000)
            } else {
                // send request to server
                console.log('there is no status in request')
                server.addRequest(request);
            }

            // remove request
            network.requests.splice(0, 1);
        }
        // console.log('did network')
    }, 500);
})
