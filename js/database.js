class DataBase{
    constructor() {
        this.users = [{username: 'talya', password: 'talya123', phoneNumber: '093248029', id: 1}];
        this.contacts = [{userid: 1, contactList: [{name: 'lskfjd', number: '43948', id: 1}]}];
        this.countUsers = 1;
        this.countContacts = 1;
    };

    getContact(userid, contactid) {
        
    }

    updateStorage() {
        localStorage.setItem('users', JSON.stringify(this.users));
        localStorage.setItem('contacts', JSON.stringify(this.contacts));
    }
}

const db = new DataBase();