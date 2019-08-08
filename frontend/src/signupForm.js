import setupFeed from './body.js';
import API_URL from './backend_url.js';

export default function handleSignupForm() {

    // here we grab the signup form
    const signupForm = document.forms.signup;

    // within this form, we extract the username and passwords entered
    const username = signupForm.elements.username.value;
    const password1 = signupForm.elements.password1.value;
    const password2 = signupForm.elements.password2.value;
    const email = signupForm.elements.email.value;
    const name = signupForm.elements.name.value;

    // here we validate the information entered for the input
    validateInput(username, password1, password2, email, name);
}


// validates user input for the signup form
function validateInput(username, password1, password2, email, name) {

    // if the username or password fields were empty,
    // we inform the user
    if (username === '' || password1 === '' || password2 === ''
    || email === '' || name === '') {
        alert('Please fill all fields');
    // we also check to see if the two passwords
    // given are equal
    } else if (password1 !== password2) {
        alert('Passwords don\'t match');
    // TODO: we finally want to check the email is in the correct form
    // USE REGEX!
    } else if (0 === 1) {
        alert('Not a valid email address');
    // if these checks succeeded, then we will attempt to sign up
    } else {
        validateSignup(username, password1, email, name);
    }
}

// ensures the given username and password are valid
function validateSignup(username, password, email, name) {

    const payload = {
        "username": `${username}`,
        "password": `${password}`,
        "email": `${email}`,
        "name": `${name}`
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    }

    // we use auth/signup to authenticate this login
    fetch(`${API_URL}/auth/signup`, options)
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

        // we alert the user that they successfully signed up
        alert('Signup Successful');

        // we now want to setup the feed for the page
        setupFeed();
    })
     // if the fetch returned an error, we handle it here
    .catch(() => {
        // we simply alert the user that the signup attempt failed
        alert('Username Taken');
    });
}