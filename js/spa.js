const login = document.getElementById('login-template');
const app = document.getElementById('app-template');
const page = document.getElementById('page');

let currentPage;

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('currentUser')) {
        switchPage('app');
    } else { // needs to login
        switchPage('login');
    }
})

function switchPage(target) {
    let temp = document.getElementById((target + '-template'));
    let content = temp.content;
    let children = page.children;
    let length = children.length;
    for (let i = 0; i < length; i++) {
        page.removeChild(page.children[0]);
    }
    page.appendChild(content.cloneNode(true));
    if (target === 'app') {
        let script = document.createElement('script');
        script.src = "./js/app.js";
        script.id = 'app-script';
        document.body.appendChild(script);
        let login = document.getElementById('login-script');
        if (login) {
            login.remove();
        }
    }
    else {
        let script = document.createElement('script');
        script.src = "./js/login.js";
        script.id = 'login-script';
        document.body.appendChild(script);
        let app = document.getElementById('app-script');
        if (app) {
            app.remove();
        }
    }
}