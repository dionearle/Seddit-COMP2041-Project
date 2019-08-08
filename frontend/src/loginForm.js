import setupFeed from './body.js';
import API_URL from './backend_url.js';

const payload = {
    'username': '',
    'password': ''
}

const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
}

export default function handleLoginForm() {

    // here we grab the login form
    const loginForm = document.forms.login;

    // within this form, we extract the username and password entered
    const username = loginForm.elements.username.value;
    const password = loginForm.elements.password.value;

    // here we validate the information entered for the input
    validatePassword(username, password);
}

// ensures the given username and password are valid
function validatePassword(username, password) {

    payload.username = username;
    payload.password = password;

    // we use auth/login to authenticate this login
    fetch(`${API_URL}/auth/login`, options)
    .then(response =>  {
        console.log(response);
        return response.json();
    })
    .then(response => {

        alert(response.message);

        if (response.message === 'Success') {
            // we now want to setup the feed for the page
            setupFeed();
        }
    });
}