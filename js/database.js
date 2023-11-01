class DataBase {

    getUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }

    getContacts() {
        return JSON.parse(localStorage.getItem('contacts')) || [];
    }

    getUserContacts(userid) {
        const contacts = this.getContacts();
        userid = JSON.stringify(userid);
        for (let contactL of contacts) {
            if (contactL.userid === userid) {
                return contactL.contactList;
            }
        }
        return false;
    }

    getUser(userid) {
        const users = this.getUsers();
        userid = JSON.stringify(userid);
        for (let user of users) {
            if (user.id === userid) {
                return user;
            }
        }
        return false;
    }

    addUser(obj) {
        const username = obj.username;
        const password = obj.password;
        const phone = obj.phone;
        const users = this.getUsers();
        if (!username || !password || !phone) {return;}
        let count = localStorage.getItem('countUsers') || 1;
        users.push({ 'id': count, 'name': username, 'password': password, 'phone': phone, 'countContacts': 1 });

        const contacts = this.getContacts();
        contacts.push({ 'userid': count, 'contactList': [] })

        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('contacts', JSON.stringify(contacts));
        localStorage.setItem('countUsers', ++count);

        return users[users.length - 1];
    }

    addUserContact(userid, obj) {
        const name = obj.name;
        const phone = obj.phone;
        if (!name || ! phone) {return}
        const contacts = this.getContacts();
        const users = this.getUsers();
        let user;
        // find user with userid
        userid = JSON.stringify(userid);
        for (let usr of users) {
            if (usr.id === userid) {
                user = usr;
            }
        }
        for (let contactL of contacts) {
            if (contactL.userid === userid && user) {
                contactL.contactList.push({ 'id': user.countContacts, 'name': name, 'phone': phone });
                //update user.countContacts in db
                user.countContacts++;
                localStorage.setItem('users', JSON.stringify(users));
                //update contacts in db
                localStorage.setItem('contacts', JSON.stringify(contacts));
                return contactL.contactList[contactL.contactList.length - 1];
            }
        }
        return false;
    }

    deleteUser(userid) {
        const users = this.getUsers();
        const contacts = this.getContacts();
        userid = JSON.stringify(userid);
        if (users.length === contacts.length) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].id === userid) {
                    //remove from users
                    users.splice(i, 1);
                    localStorage.setItem('users', JSON.stringify(users));
                }
                if (contacts[i].userid === userid) {
                    //remove from contacts
                    contacts.splice(i, 1);
                    localStorage.setItem('contacts', JSON.stringify(contacts));
                }
            }
            // return true;
        }
        // return false;
    }

    deleteUserContact(userid, contactid) {
        const contacts = this.getContacts();
        const users = this.getUsers();
        let contactL;
        userid = JSON.stringify(userid);
        for (let contact of contacts) {
            if (contact.userid === userid) {
                contactL = contact;
                for (let i in contactL.contactList) {
                    if (contactL.contactList[i].id === contactid) {
                        //remove contact from contacts
                        contactL.contactList.splice(i, 1);
                        localStorage.setItem('contacts', JSON.stringify(contacts));
                        return true;
                    }
                }
            }
        }
        return false;
    }

    refreshStorage() {
        localStorage.setItem('users', '[]');
        localStorage.setItem('contacts', '[]');
        localStorage.setItem('countUsers', 1);
    }
}

const db = new DataBase();
// db.refreshStorage();
// console.log(db.addUser('Talya', 'lskdflka', '394085945'))
// console.log(db.addContact(1, 'Opal', '9340530'));
// console.log(db.removeContact(1, 1));
// db.removeUser(1);
// console.log(db.getUserContacts(1));
// console.log(db.getUser(1));