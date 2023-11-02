
/* checks if the password is 6 chars long */
let isPasswordInRightLength = (password) => {
    return password.length === 6;
}

const backbtn = document.getElementById('signup-back');
backbtn.addEventListener('click', (event) => {
    event.preventDefault();
    // console.log('hello');
    // switchPage('login');
    location.reload();
});

const send = document.getElementById('signup-btn');
send.addEventListener('click', (event) => {
    event.preventDefault();
    const username = document.getElementById('signup-username').value; //getting the username
    const password = document.getElementById('signup-password').value; //getting the password
    const phone = document.getElementById('signup-phone').value;
    if (!isPasswordInRightLength(password)) {
        alert('Your password should be 6 charecters long');
        return;
    }

    const check = new FXMLHttpRequest();

    check.open('POST', `/api/users`, new User(username, password, phone, localStorage.getItem('countUsers')));
    check.onload = function () {
        if (this.requestText !== '') {
            alert('You are signed in!');
            // switchPage('login');
            location.reload();
        } else {
            alert('something went wrong');
        }
    };
    check.send()
})