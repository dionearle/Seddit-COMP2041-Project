import API_URL from './backend_url.js';
import setupBanner from './banner.js';
import setupFeed from './body.js';

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

    // we will use this regular expression to test for valid email addresses
    const emailFormat = /\S+@\S+\.\S+/;

    // if the username or password fields were empty,
    // we inform the user
    if (username === '' || password1 === '' || password2 === ''
    || email === '' || name === '') {
        alert('Please fill all fields');
    // we also check to see if the two passwords
    // given are equal
    } else if (password1 !== password2) {
        alert('Passwords don\'t match');
    // we finally want to check the email is in the correct format
    } else if (!emailFormat.test(email)) {
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
        // we simply alert the user that the signup attempt failed
        alert('Username Taken');
    });
}