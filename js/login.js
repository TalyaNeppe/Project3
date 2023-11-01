
/* checks if the password is 6 chars long */
let isPasswordRightLength = (password) => {
    return password.length === 6;
}

const btn = document.getElementById('login-btn'); //getting the button
btn.addEventListener('click', (event) => {
    event.preventDefault();
    const username = document.getElementById('login-username').value; //getting the username
    const password = document.getElementById('login-password').value; //getting the password
    if (!isPasswordRightLength(password)) {
        alert('Your password should be 6 charecters long');
        return;
    }

    const check = new FXMLHttpRequest();
    check.open('GET', `/api/users/?Username=${username}?Password=${password}`);
    check.onload = function () {
        const id = JSON.parse(check.requestText);
        if (id !== NaN) {
            localStorage.setItem('currentUser', id);
            switchPage('app');
        } else {
            alert('Incorrect password/username');
        }
    };
    check.send()
});

const signup = document.getElementById('signup-btn');
signup.addEventListener('click', (event) => {
    event.preventDefault();
    switchPage('signup');
    console.log('signup')
});