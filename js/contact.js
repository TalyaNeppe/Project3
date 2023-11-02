const backToList = () => {
    localStorage.removeItem('currentContact');
    location.reload();
}

const back = document.getElementById('back-btn');
back.addEventListener('click', () => {
    backToList();
});

let isPhoneValid = (phone) => {
    const phoneRegex=/050\d{7}$|(050-|\(050\)\s)\d{3}-\d{4}/;
    // 0501234567/050-123-4567/(050) 123-4567
    return phoneRegex.test(phone);
}

if (localStorage.getItem('currentContact') !== 'new') {
    const userId = localStorage.getItem('currentUser');
    let details;
    const nameLabel = document.getElementById('name-label');
    const phoneLabel = document.getElementById('phone-label');
    phoneLabel.disabled = true;
    nameLabel.disabled = true;

    //add username 
    const requestUser = new FXMLHttpRequest();
    requestUser.open('GET', `/api/users/${userId}`);
    requestUser.onload = function () {
        user = JSON.parse(this.requestText);
        const heading = document.getElementById('contact-heading');
        if (this.status==404){
            alert(this.requestText);
            return;
        }
        heading.textContent = user.username + "'s Contact";
    }
    requestUser.send();

    const contactRequest = new FXMLHttpRequest();
    contactRequest.open('GET', `/api/users/${localStorage.getItem('currentUser')}/contacts/${localStorage.getItem('currentContact')}`);
    contactRequest.onload = function () {
        if (this.status == 404) {
            alert(this.requestText);
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
        if(phoneLabel.disabled) {
            alert("You didn't make any changes");
            return;
        }
        if (!isPhoneValid(phoneLabel.value)){
            alert('Your phone number is not valid');
            return;
        }
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
    commitBtn.classList.add('center');
    commitBtn.addEventListener('click', () => {
        const userId = localStorage.getItem('currentUser');
        let user;

        const requestUser = new FXMLHttpRequest();
        requestUser.open('GET', `/api/users/${userId}`);
        requestUser.onload = function () {
            if (this.status == 404) {
                alert(this.requestText);
                return;
            }
            user = JSON.parse(this.requestText);
            if (nameLabel.value==''||phoneLabel.value==''){
                alert('Both fields are required');
                return;
            }
            if (!isPhoneValid(phoneLabel.value)){
                alert('Your phone number is not valid');
                return;
            }
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