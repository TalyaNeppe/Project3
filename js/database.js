class DataBase {

    getUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }

    getContacts() {
        return JSON.parse(localStorage.getItem('contacts')) || [];
    }

    getUserContacts(userid) {
        const contacts = this.getContacts().sort();
        userid = String(userid);
        for (let contactL of contacts) {
            if (contactL.userid === userid) {
                return contactL.contactList;
            }
        }
        return false;
    }

    getUserContact(userid, contactid) {
        userid = String(userid);
        const contacts = this.getUserContacts(userid);
        for (let contact of contacts) {
            if (contact.id == contactid) {
                return contact;
            }
        }
        return false;
    }

    getUser(userid) {
        const users = this.getUsers();
        userid = String(userid);
        for (let user of users) {
            if (user.id === userid) {
                return user;
            }
        }
        return false;
    }

    getUsersUsernamePassword(username, password) {
        const users = this.getUsers();
        for (let user of users) {
            if (user.username === username && user.password === password) {
                return user.id
            }
        }
        return false;
    }

    getUserContactsStart(userid, start) {
        const contacts = this.getContacts();
        let found = [];
        for (let contacL of contacts) {
            if (contacL.userid == userid) {
                const list = contacL.contactList;
                for (let contact of list) {
                    if (contact.name.startsWith(start)) {
                        found.push(contact);
                    }
                }
                return found;
            }
        }
        return false;
    }

    addUser(obj) {
        const username = obj.username;
        const password = obj.password;
        const phone = obj.phone;
        const users = this.getUsers();
        if (!username || !password || !phone) { return; }
        let count = localStorage.getItem('countUsers') || 1;
        users.push(new User(username, password, phone, count));
        const contacts = this.getContacts();
        contacts.push(new ContactsList(count));

        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('contacts', JSON.stringify(contacts));
        localStorage.setItem('countUsers', ++count);

        return users[users.length - 1];
    }

    addUserContact(userid, obj) {
        debugger;
        const name = obj.name;
        const phone = obj.phone;
        if (!name || !phone) { return; }
        const contacts = this.getContacts();
        const users = this.getUsers();
        let user;
        // find user with userid
        userid = String(userid);
        for (let usr of users) {
            if (usr.id == userid) {
                user = usr;
            }
        }
        for (let contactL of contacts) {
            if (contactL.userid == userid && user) {
                contactL.contactList.push(new Contact(user.countContacts, name, phone));
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
        userid = String(userid);
        let delUser = false;
        let delContact = false;
        let retObj;
        if (users.length === contacts.length) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].id === userid) {
                    //remove from users
                    retObj = users[i];
                    users.splice(i, 1);
                    localStorage.setItem('users', JSON.stringify(users));
                    delUser = true;
                }
                if (contacts[i].userid === userid) {
                    //remove from contacts
                    contacts.splice(i, 1);
                    localStorage.setItem('contacts', JSON.stringify(contacts));
                    delContact = true;
                }
            }
            if (delContact && delUser) {
                return retObj;
            }
        }
        return retObj;
    }

    deleteUserContact(userid, contactid) {
        const contacts = this.getContacts();
        const users = this.getUsers();
        let contactL;
        userid = String(userid);
        for (let contact of contacts) {
            if (contact.userid == userid) {
                contactL = contact;
                for (let i in contactL.contactList) {
                    if (contactL.contactList[i].id == contactid) {
                        //remove contact from contacts
                        const retObj = contactL.contactList[i];
                        contactL.contactList.splice(i, 1);
                        localStorage.setItem('contacts', JSON.stringify(contacts));
                        return retObj;
                    }
                }
            }
        }
        return false;
    }

    updateUser(userid, obj) {
        const users = this.getUsers();
        const name = obj.name;
        const password = obj.password;
        const phone = obj.phone;
        if (!name || !password || !phone) { return false; }
        for (let i in users) {
            if (users[i].id == userid) {
                users[i] = new User(name, password, phone, userid);
                localStorage.setItem('users', JSON.stringify(users));
                return users[i];
            }
        }
        return false;
    }

    updateUserContact(userid, contactid, obj) {
        debugger;
        const contacts = this.getContacts();
        const name = obj.name;
        const phone = obj.phone;
        if (!name || !phone) { return false; }
        for (let contacL of contacts) {
            if (contacL.userid == userid) {
                const list = contacL.contactList;
                for (let i in list) {
                    if (list[i].id == contactid) {
                        list[i] = new Contact(contactid, name, phone);
                        localStorage.setItem('contacts', JSON.stringify(contacts));
                        return list[i];
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