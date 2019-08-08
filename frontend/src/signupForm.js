import setupFeed from './body.js';

export default function handleSignupForm() {

    // here we grab the signup form
    const signupForm = document.forms.signup;

    // within this form, we extract the username and passwords entered
    const username = signupForm.elements.username.value;
    const password1 = signupForm.elements.password1.value;
    const password2 = signupForm.elements.password2.value;

    // here we validate the information entered for the input
    checkSignup(username, password1, password2);
}

// validates user input for the signup form
function checkSignup(username, password1, password2) {

    // if the username or password fields were empty,
    // we inform the user
    if (username === '' || password1 === '' || password2 === '') {
        alert('Please fill all fields');
    // we also check to see if the two passwords
    // given are equal
    } else if (password1 !== password2) {
        alert('Passwords don\'t match');
    // if these checks succeeded, the user can signup
    } else if (!validateInput(username, password1, password2)) {
        alert('Input credentials rejected');
    } else {
        alert('signup successful');

        // we now want to setup the feed for the page
        setupFeed();
    } 
}

// ensures the given username and password are valid
function validateInput(username, password1, password2) {
    // here we would validate the given input!
    // (could include checking this info doesn't already
    // exit in the database, name too long/wrong characters, etc.)
    return false;
}