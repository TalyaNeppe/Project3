class Server {
    constructor() {
        this.requests = [];
    }

    getCurrentRequest() {
        return this.requests[0] || false;
    }

    addRequest(request) {
        this.requests.push(request);
    }

    /* getting the function name */
    findFunction() {
        debugger;
        const request = this.getCurrentRequest();
        let str = '';
        const type = request.type;
        switch (type) {
            case 'GET':
                str += 'get';
                break;
            case 'POST':
                str += 'add';
                break;
            case 'PUT':
                str += 'update';
                break;
            case 'DELETE':
                str += 'delete';
                break;
            default:
                return false;
        }
        const urlArray = request.url.split('/');
        if (urlArray.includes('users')) {
            str += 'User';
        }
        if (urlArray.includes('contacts')) {
            str += 'Contact';
        }
        console.log(urlArray[urlArray.length - 1])
        console.log(typeof (parseInt(urlArray[urlArray.length - 1])))
        if ((typeof (parseInt(urlArray[urlArray.length - 1]))) !== 'number') {
            str += 's';
        }
        return str;
    }

    buildResponse(obj) {
        const func = obj.func;
        const params = obj.params;
        let answer;
        if (obj.func) {
            switch(params.length) {
                case 0:
                    answer = func();
                    break;
                case 1: 
                    answer = func(params[0]);
                    break;
                case 2: 
                    answer =func(params[0], params[1]);
                    break;
                default:
                    console.log('There are too many paramaters!');
                    break;
            }
            if (answer) {
                network.addRequest({'status': 200, 'requestText': JSON.stringify(answer)})
            } else {
                network.addRequest({'status': 404, 'requestText': 'User or contact was not found'})
            }
        } else {
            network.addRequest({'status': 404, 'requestText': 'User or contact was not found'})
        }

        //remove request
        server.requests.splice(0, 1);
    }
}

const server = new Server();

document.addEventListener('DOMContentLoaded', () => {
    setInterval(()=> {
        server.buildResponse(server.findFunction());
    }, 1000);
})
