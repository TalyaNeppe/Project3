class Server {
    constructor() {
        this.requests = [];
    }

    getCurrentRequest() {
        return this.requests[0] || false;
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

}

