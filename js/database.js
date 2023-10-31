class DataBase {
    constructor() {
        this.countUsers = 1;
        this.users = [new User('talya', 'talya123', '087873682', this.countUsers)];
        this.contacts = [new ContactsList(this.countUsers)];
    };

    addUser(username, password, phoneNumber) {
        this.countUsers++;
        this.users.push(new User(username, password, phoneNumber, this.countUsers));
        this.updateUsers();
    }

    getUserContacts(userid) {
        debugger;
        let userC;
        for (let contact of this.contacts) {
            console.log(contact);
            if (contact.userid === userid) {
                userC = contact.contactList;
            }
        }
        return userC || false; // if user not found, will return false
    }

    getContact(userid, contactid) {
        let userC = this.getUserContacts(userid);
        if (userC) {
            for (let contact of userC) {
                if (contact.id === contactid) {
                    return contact;
                }
            }
        } else {
            return false;
        }
    }

    addContact(userid, cName, cNumber) {
        let user = this.getUser(userid);
        let userC = this.getUserContacts(userid);
        if (userC) {
            user.countContacts++;
            userC.push(new Contact(user.countContacts, cName, cNumber));
            this.contacts[this.getContactsIndex(userid)].contactList = userC;
            this.updateContacts();
            return this.getContact(userid, this.countContacts);
        } else {
            return false;
        }
    }

    getUser(userid) {
        for (let user of this.users) {
            if (user.id === userid) {
                return user;
            }
        }
        return false;
    }

    getUserIdByUsername(username) {
        for (let user of this.users) {
            if (user.username === username) {
                return user.id;
            }
        }
        return false;
    }

    getContactsIndex(userId) {
        for (let i in this.contacts) {
            if (this.contacts[i].userid === userId) {
                return i;
            }
        }
        return false;
    }

    updateUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }
    updateContacts() {
        localStorage.setItem('contacts', JSON.stringify(this.contacts));
    }
}

const db = new DataBase();
db.addContact(1, 'fdggsdf', '034958304');