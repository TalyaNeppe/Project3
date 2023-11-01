class Server {
    constructor() {
        this.requests = [];
    }

    getCurrentRequest() {
        return this.requests[0] || false;
    }

    /* getting the function name */
    findFunction() {
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
            func: func,
            params: params
        };
    }
}

