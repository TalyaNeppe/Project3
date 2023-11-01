class Server {
    constructor() {
        this.requests = [];
    }

    getCurrentRequest() {
        return this.requests[0] || false;
    }

    addRequest(request) {
        this.requests.push(request);
        console.log('did server addRequest')
    }

    /* getting the function name */
    findFunction() {
        console.log('did findFunction')
        const request = this.getCurrentRequest();
        if (!request) { return; }
        let name = '';
        const type = request.type;
        switch (type) {
            case 'GET':
                name += 'get';
                break;
            case 'POST':
                name += 'add';
                break;
            case 'PUT':
                name += 'update';
                break;
            case 'DELETE':
                name += 'delete';
                break;
            default:
                return false;
        }
        const urlArray = request.url.split('/');
        if (urlArray.includes('users')) {
            name += 'User';
        }
        if (urlArray.includes('contacts')) {
            name += 'Contact';
        }
        if (isNaN((parseInt(urlArray[urlArray.length - 1]))) && type === 'GET') {
            name += 's';
        }
        let func = db[name];
        if (!func) { return; }
        const params = urlArray.filter(item => !isNaN((parseInt(item))));
        if (request.body) {
            params.push(request.body);
        }
        return {
            func: func.name,
            params: params
        };
    }

    buildResponse(obj) {
        console.log('did buildResponse');
        const func = obj.func;
        const params = obj.params;
        const request = this.getCurrentRequest();
        let answer;
        if (obj.func) {
            switch (params.length) {
                case 0:
                    answer = db[func]();
                    break;
                case 1: 
                    answer = db[func](params[0]);
                    break;
                case 2: 
                    answer = db[func](params[0], params[1]);
                    break;
                default:
                    console.log('There are too many paramaters!');
                    break;
            }
            if (answer) {
                request.status = 200;
                request.requestText = JSON.stringify(answer);
                // network.addRequest({'status': 200, 'requestText': JSON.stringify(answer)})
            } else {
                request.status = 404;
                request.requestText = 'User or contact was not found';
                // network.addRequest({'status': 404, 'requestText': 'User or contact was not found'})
            }
        } else {
            request.status = 404;
            request.requestText = 'User or contact was not found';
            // network.addRequest({'status': 404, 'requestText': 'User or contact was not found'})
        }
        
        request.send();

        //remove request
        server.requests.splice(0, 1);
    }
}

const server = new Server();

document.addEventListener('DOMContentLoaded', () => {
    setInterval(()=> {
        if (server.requests.length > 0) {
            console.log('there is a request in server')
            server.buildResponse(server.findFunction());
        }
        // console.log('did server')
    }, 1000);
})
