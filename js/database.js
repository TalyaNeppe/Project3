class DataBase{
    constructor() {
        this.users = [{id: 1, username: 'talya', password: 'talya123', phoneNumber: '093248029', countContacts: 1}];
        this.contacts = [{userid: 1, contactList: [{id: 1, name: 'lskfjd', number: '43948'}]}];
        this.countUsers = 1;
    };

    addUser(username, password, phoneNumber) {
        this.countUsers++;
        this.users.push({'id': this.countUsers,'username': username, 'password': password, 'phoneNumber': phoneNumber});
        this.updateUsers();
    }

    getUserContacts(userid) {
        let userC;
        for (let contact of this.contacts) {
            if (contact.userid === userid) {
                userC = contact.contactList;
            }
        }
        return userC; // if user not found, will return false
    }

    getContact(userid, contactid) {
        let userC = this.getUserContacts(userid);
        if (userC) {
            for(let contact of userC){
                if (contact.id === contactid){
                    return contact;
                }
            }
        } else {
            return false;
        }
    }

    addContact(userid, cName, cNumber) {
        let userC = this.getUserContacts(userid);
        if(userC) {
            this.countContacts++;
            userC.push({id: this.countContacts, cName: cName, cNumber: cNumber});
            console.log(userC)
            this.contacts[this.getContactsIndex(userid)].contactList = userC;
            this.updateContacts();
            return this.getContact(userid, this.countContacts);
        } else {
            return false;
        }
    }

    getContactsIndex(userId) {
        for(let i in this.contacts) {
            if (this.contacts[i].userid === userId){
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
// console.log(db.getContactsIndex(1));
console.log()