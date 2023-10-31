class User {
    constructor(username, password, phone, id) {
        this.id=id;
        this.username=username;
        this.password=password;
        this.phoneNumber=phone;
        this.countContacts=1;
    }
}

class Contacts {
    constructor(userid){
        this.userid=userid;
        this.contactList=[];
    }
}