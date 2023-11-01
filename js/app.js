const heading = document.getElementById('app-heading');
const user = localStorage.getItem('currentUser');
heading.textContent = user + ' Contacts';

const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    location.reload();
})

const contactList = document.getElementById('contacts-list');

