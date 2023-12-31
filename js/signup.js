/* checks if the password is 6 chars long */
let isPasswordInRightLength = (password) => {
    return password.length >6;
}

const backbtn = document.getElementById('signup-back');
backbtn.addEventListener('click', (event) => {
    event.preventDefault();
    location.reload();
});

let isPhoneValid = (phone) => {
    const phoneRegex=/050\d{7}$|(050-|\(050\)\s)\d{3}-\d{4}/;
    // 0501234567/050-123-4567/(050) 123-4567
    return phoneRegex.test(phone);
}

const send = document.getElementById('signup-btn');
send.addEventListener('click', (event) => {
    event.preventDefault();
    const username = document.getElementById('signup-username').value; //getting the username
    const password = document.getElementById('signup-password').value; //getting the password
    const phone = document.getElementById('signup-phone').value;
    if (!isPasswordInRightLength(password)) {
        alert('Your password should be over 6 characters long');
        return;
    }

    if (!isPhoneValid(phone)) {
        alert('Your phone number is not valid');
        return;
    }

    const check = new FXMLHttpRequest();

    check.open('POST', `/api/users`, new User(username, password, phone, localStorage.getItem('countUsers')));
    check.onload = function () {
        if (this.status==404){
            alert(this.requestText);
            return;
        }
        if (this.requestText !== '') {
            alert('You are signed in!');
            location.reload();
        } else {
            alert('something went wrong');
        }
    };
    check.send()
})