const heading = document.getElementById('app-heading');
const userId = localStorage.getItem('currentUser');

let user;

const requestUser = new FXMLHttpRequest();
requestUser.open('GET', `/api/users/${userId}`);
requestUser.onload = function () {
    user = JSON.parse(this.requestText);
    heading.textContent = user.username + "'s Contacts";
    const list = document.getElementById('contacts-list');
    const requestContacts = new FXMLHttpRequest();
    console.log(`/api/users/${userId}/contacts`)
    requestContacts.open('GET', `/api/users/${userId}/contacts`);
    requestContacts.onload = function () {
        console.log(this.requestText);
        const contacts = JSON.parse(this.requestText);
        if (contacts.length < 1) {
            list.innerHTML = 'No contacts...';
        } else {
            console.log('did else..')
            contacts.forEach(contact => {
                let li = document.createElement('li');
                li.style.borderBottom = '1px solid black';
                li.innerHTML = '<br><label>Name: ' + contact.name + '</label><br><label>Phone number: ' + contact.phone + '</label><br><br>'
                li.addEventListener('click', () => {
                    localStorage.setItem('currentContact', contact.id);
                    location.reload();
                });
                list.appendChild(li);
            });
        }
    }
    requestContacts.send();
}
requestUser.send();

const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    location.reload();
})

const contactList = document.getElementById('contacts-list');

const search = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', () => {
    const searchResults = new FXMLHttpRequest();
    searchResults.open("GET", `/api/users/${localStorage.getItem('currentUser')}/contacts/?Start=${search.value}`)
    searchResults.onload = function () {
        if (this.requestText) {
            const list = document.getElementById('contacts-list');
            list.innerHTML = '';
            const contacts = JSON.parse(this.requestText);
            if (contacts.length < 1) {
                list.innerHTML = 'No matching contacts...';
            } else {
                contacts.forEach(contact => {
                    let li = document.createElement('li');
                    li.style.borderBottom = '1px solid black';
                    li.innerHTML = '<br><label>Name: ' + contact.name + '</label><br><label>Phone number: ' + contact.phone + '</label><br><br>'
                    li.addEventListener('click', () => {
                        localStorage.setItem('currentContact', contact.id);
                        location.reload();
                    });
                    list.appendChild(li);
                });
            }
        }
    };
    searchResults.send();
});

const addn = document.getElementById('addContact');
addn.addEventListener('click', () => {
    localStorage.setItem('currentContact', 'new');
    location.reload();
})