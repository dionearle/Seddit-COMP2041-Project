import API_URL from './backend_url.js';
import setupFeed from './body.js';
import setupBanner from './banner.js';

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

    // we construct a payload from the given username and password
    const payload = {
        "username": `${username}`,
        "password": `${password}`
    }

    // we also setup the options for our fetch request
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    }

    // we use auth/login to authenticate this login
    fetch(`${API_URL}/auth/login`, options)
    .then(response =>  {
        
        // if we did not recieve a success message, we
        // want to throw an error to handle this behaviour
        if (response.status !== 200) {
            throw new Error();
        }

        // otherwise we return the json object
        return response.json();
    })
    // if it was a successful fetch, we handle it here
    .then(response => {

        // we alert the user that they successfully logged in
        alert('Login Successful');

        // since a token is returned which needs to be used later,
        // we want to store this in session storage
        const token = response.token;
        sessionStorage.setItem('token', token);

        // we also set a value to keep track of what page
        // of the user's feed we are displaying
        sessionStorage.setItem('current-page', 0);

        // we now want to setup the banner and feed for the page
        setupBanner();
        setupFeed();
    })
    // if the fetch returned an error, we handle it here
    .catch(() => {
        // we simply alert the user that the login attempt failed
        alert('Invalid Username or Password');
    });
}