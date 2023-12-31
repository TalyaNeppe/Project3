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
        const request = this.getCurrentRequest();
        if (!request) { return; }
        const urlArray = (request.url).split('/');
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
        // if (this.notValidUrl(urlArray)) {
        //     return false;
        // }
        if (urlArray.includes('users')) {
            name += 'User';
        }
        if (urlArray.includes('contacts')) {
            name += 'Contact';
        }
        let params = [];
        params = urlArray.filter(item => !isNaN((parseInt(item))));
        if (isNaN((parseInt(urlArray[urlArray.length - 1]))) && type === 'GET') {
            name += 's';
            if (urlArray[urlArray.length - 1][0] == '?') {
                const q = urlArray[urlArray.length - 1];
                const questionsArr = q.split('?');
                questionsArr.splice(0, 1);
                let qArr = [];
                questionsArr.forEach(q => {
                    qArr.push(...(q.split('=')));
                });
                qArr.forEach((word, index) => {
                    if (index % 2 === 0) {
                        name += word;
                    } else {
                        params.push(word);
                    }
                })
                let func = db[name];
                if (!func) { return; }
                return {
                    func: name,
                    params: params
                };
            }
        }
        let func = db[name];
        if (!func) { return; }
        if (request.body) {
            params.push(request.body);
        }
        return {
            func: name,
            params: params
        };
    }

    buildResponse(obj) {
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
                case 3: 
                    answer = db[func](params[0], params[1], params[2]);
                    break;
                default:
                    console.log('There are too many paramaters!');
                    break;
            }
            if (answer) {
                request.status = 200;
                request.requestText = JSON.stringify(answer);
            } else {
                request.status = 404;
                request.requestText = 'User or contact was not found';
            }
        } else {
            request.status = 404;
            request.requestText = 'User or contact was not found';
        }

        request.send();

        //remove request
        server.requests.splice(0, 1);
    }

    notValidUrl(urlArray) {
        if(urlArray[0] !== 'api') {
            return true;
        }
        urlArray.splice(0, 1);
        let usersFound = false;
        let contactsFound = false;
        for (let i = 0; i < urlArray.length; i++) {
            const word = urlArray[i];
            if (word !== 'users' && word !== 'contacts' && word[0] !== '?' && isNaN(parseInt(word))) {
                return true;
            }
            if (word === 'users') {
                if (usersFound) {
                    return true;
                }
                usersFound = true;
            }
            if (word === 'contacts') {
                if (!usersFound || contactsFound) {
                    return true;
                }
                contactsFound = true;
            }
            if (!isNaN(parseInt(word))) {
                if(!isNaN(parseInt(urlArray[i+1]))) {
                    return true;
                }
            }
        }
        return false;
    }
}

const server = new Server();

document.addEventListener('DOMContentLoaded', () => {
    setInterval(() => {
        if (server.requests.length > 0) {
            server.buildResponse(server.findFunction());
        }
    }, 500);
})
