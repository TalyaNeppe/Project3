const database = db; // getting the database

let check=true;

/* checks if the password is 6 chars long */
const isPasswordInRightLength = (password) => {
    return password.length === 6;
}

const btn = document.getElementById('login-btn'); //getting the button
const username = document.getElementById('login-username').value; //getting the username
const password = document.getElementById('login-password').value; //getting the password
btn.addEventListener('click', (event) => {
    event.preventDefault();
    console.log(username);
    console.log(password);
    // if (!isPasswordInRightLength(password)) {
    //     alert('Your password should be 6 charecters long');
    //     username='';
    //     password='';
    //     return;
    // }
    
    // if (check){ //server checks if the user exists
    //     localStorage.setItem('currentUser', username); //to fix
    // }
    // else if (!doesUserExist(username, password)) {
    //     alert('Incorrect password/username');
    //     return;
    // }
    // const user=db.getUser()
});