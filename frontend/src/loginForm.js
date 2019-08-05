export default function handleLoginForm() {

    // here we grab the login form
    const loginForm = document.forms.login;

    // within this form, we extract the username and password entered
    const username = loginForm.elements.username.value;
    const password = loginForm.elements.password.value;

    // here we validate the information entered for the input
    checkLogin(username, password);
}

// validates user input for the login form
function checkLogin(username, password) {

    // if the username or password fields were empty,
    // we inform the user
    if (username === '' || password === '') {
        alert('Please enter a username and password');
    // we also check to see if the given username
    // and password are valid
    } else if (!validatePassword(username, password)) {
        alert('Incorrect username or password');
    // if these checks succeeded, the user can log in
    } else {
        alert('Login successful');
    } 
}

// ensures the given username and password are valid
function validatePassword(username, password) {
    // here we would validate the username and password!
    return false;
}