import setupFeed from './body.js';
import API_URL from './backend_url.js';

export default function handleLoginForm() {

    // here we grab the login form
    const loginForm = document.forms.login;

    // within this form, we extract the username and password entered
    const username = loginForm.elements.username.value;
    const password = loginForm.elements.password.value;

    // here we validate the information entered for the input
    validateLogin(username, password);
}

// ensures the given username and password are valid
function validateLogin(username, password) {

    const payload = {
        "username": `${username}`,
        "password": `${password}`
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    }

    // we use auth/login to authenticate this login
    fetch(`${API_URL}/auth/login`, options)
    .then(response =>  response.json())
    .then(response => {

        if (response.message === undefined) {
            alert('Success');
            // we now want to setup the feed for the page
            setupFeed();
        } else {
            alert(response.message); 
        }
    });
}