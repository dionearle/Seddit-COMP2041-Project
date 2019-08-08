import handleLoginForm from './loginForm.js'; 
import removeMainHTML from './removeMain.js';

export default function login() {

    // tear down function which removes the HTML elements of the body
    removeMainHTML();

    // setup function to create the HTML elements of a login page
    setupLoginHTML();

    // here we setup an event listener for when the login
    // form is completed
    document.forms.login.addEventListener('submit',(event) => {
        
        // we ensure the default action for a submit button is prevented
        event.preventDefault();

        // we call an imported function to handle the login request
        handleLoginForm();
    });
}

// simply sets up the HTML for the login section of the page
function setupLoginHTML() {

    // we first retrieve the existing root HTML element
    const root = document.getElementById('root');

    // setting up the outer main class
    const main = document.createElement('main');
    main.setAttribute('role', 'main');

    // setting up the login element within main
    const login = document.createElement('div');
    login.id = 'login';
    main.appendChild(login);

    // adding a login header to this feed element
    const loginHeader = document.createElement('div');
    loginHeader.classList.add('login-header');
    login.appendChild(loginHeader);

    // this login header contains a title
    const loginTitle = document.createElement('h3');
    loginTitle.classList.add('login-title', 'alt-text');
    loginTitle.textContent = 'Login';
    loginHeader.appendChild(loginTitle);

    // now we append the login form

    // here we create the loginBox which contains all login information
    const loginBox = document.createElement('div');
    loginBox.classList.add('loginBox');     
    login.appendChild(loginBox);

    // next we make a form that the user will fill out
    const loginForm = document.createElement('form');
    loginForm.classList.add('login-form'); 
    loginForm.name = 'login';
    loginBox.appendChild(loginForm);

    // this form contains a title
    const loginFormTitle = document.createElement('h3');
    loginFormTitle.textContent = 'Login to Seddit';
    loginForm.appendChild(loginFormTitle);

    // the first piece of input for the form is the username
    const loginFormUsername = document.createElement('input');
    loginFormUsername.placeholder = 'Username';
    loginFormUsername.type = 'text';
    loginFormUsername.name = 'username';
    loginForm.appendChild(loginFormUsername);

    // the other piece of input for the login form is password
    const loginFormPassword = document.createElement('input');
    loginFormPassword.placeholder = 'Password';
    loginFormPassword.type = 'password';
    loginFormPassword.name = 'password';
    loginForm.appendChild(loginFormPassword);

    // finally we have a submit button for the form
    const loginFormSubmit = document.createElement('input');
    loginFormSubmit.type = 'submit';
    loginFormSubmit.value = 'Login';
    loginForm.appendChild(loginFormSubmit);

    // once all the elements are setup, we add it before
    // the footer element within the HTMLs
    const footer = document.getElementById('footer');
    root.insertBefore(main, footer);
}