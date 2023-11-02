const backToList = () => {
    localStorage.removeItem('currentContact');
    location.reload();
}

const back = document.getElementById('back-btn');
back.addEventListener('click', () => {
    backToList();
});

if (localStorage.getItem('currentContact') !== 'new') {
    console.log('not new')
    let details;
    const nameLabel = document.getElementById('name-label');
    const phoneLabel = document.getElementById('phone-label');
    phoneLabel.disabled = true;
    nameLabel.disabled = true;

    const contactRequest = new FXMLHttpRequest();
    contactRequest.open('GET', `/api/users/${localStorage.getItem('currentUser')}/contacts/${localStorage.getItem('currentContact')}`);
    contactRequest.onload = function () {
        if (check.status==404){
            alert(check.requestText);
            return;
        }
        details = JSON.parse(this.requestText);
        nameLabel.value = details.name;
        phoneLabel.value = details.phone;
    };
    contactRequest.send();

    const deleteBtn = document.getElementById('delete-btn');
    deleteBtn.addEventListener('click', () => {
        const deleteRequest = new FXMLHttpRequest();
        deleteRequest.open('DELETE', `/api/users/${localStorage.getItem('currentUser')}/contacts/${localStorage.getItem('currentContact')}`);
        deleteRequest.onload = function () {
            backToList();
        };
        deleteRequest.send();
    });

    const updateBtn = document.getElementById('update-btn');
    updateBtn.addEventListener('click', () => {
        phoneLabel.disabled = false;
        nameLabel.disabled = false;
    });

    const commitBtn = document.getElementById('commit-btn');
    commitBtn.addEventListener('click', () => {
        const updateRequest = new FXMLHttpRequest();
        updateRequest.open('PUT', `/api/users/${localStorage.getItem('currentUser')}/contacts/${localStorage.getItem('currentContact')}`, {
            id: localStorage.getItem('currentContact'),
            name: nameLabel.value,
            phone: phoneLabel.value
        });
        updateRequest.onload = function () {
            location.reload();
        };
        updateRequest.send();
    })
}

else {
    const nameLabel = document.getElementById('name-label');
    const phoneLabel = document.getElementById('phone-label');
    phoneLabel.disabled = false;
    nameLabel.disabled = false;
    const updateBtn = document.getElementById('update-btn');
    updateBtn.style.display = 'none';
    const deleteBtn = document.getElementById('delete-btn');
    deleteBtn.style.display = 'none';
    const commitBtn = document.getElementById('commit-btn');
    commitBtn.addEventListener('click', () => {
        const userId = localStorage.getItem('currentUser');
        let user;

        const requestUser = new FXMLHttpRequest();
        requestUser.open('GET', `/api/users/${userId}`);
        requestUser.onload = function () {
            if (check.status==404){
                alert(check.requestText);
                return;
            }
            user = JSON.parse(this.requestText);
            const updateRequest = new FXMLHttpRequest();
            updateRequest.open('POST', `/api/users/${userId}/contacts`, {
                id: user.countContacts,
                name: nameLabel.value,
                phone: phoneLabel.value
            });
            updateRequest.onload = function () {
                localStorage.setItem('currentContact', user.countContacts);
                location.reload();
            };
            updateRequest.send();
        }
        requestUser.send();
    })
}