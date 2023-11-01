const database = db; // getting the database

let check = true;

/* checks if the password is 6 chars long */
const isPasswordInRightLength = (password) => {
    return password.length === 6;
}

const btn = document.getElementById('login-btn'); //getting the button
btn.addEventListener('click', (event) => {
    event.preventDefault();
    const username = document.getElementById('login-username').value; //getting the username
    const password = document.getElementById('login-password').value; //getting the password
    if (!isPasswordInRightLength(password)) {
        alert('Your password should be 6 charecters long');
        return;
    }

    const check = new FXMLHttpRequest();
    check.open('GET', `/api/users/?Username=${username}?Password=${password}`);
    check.onload = function () {
        const id = JSON.parse(check.requestText);
        if (id !== NaN) {
            localStorage.setItem('currentUser', JSON.stringify(id));
            switchPage('app');
        } else {
            alert('Incorrect password/username');
        }
    };
    check.send()

    // else if (!doesUserExist(username, password)) {
    //     alert('Incorrect password/username');
    //     return;
    // }
    // const user=db.getUser()
});