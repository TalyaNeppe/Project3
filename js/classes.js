class User {
    constructor(username, password, phone, id) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.phone = phone;
        this.countContacts = 1;
    }
}

class ContactsList {
    constructor(userid) {
        this.userid = userid;
        this.contactList = [];
    }
}

class Contact {
    constructor(id, name, phone) {
        this.id = id;
        this.name = name;
        this.phone = phone;
    }
}