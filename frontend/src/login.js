import handleLoginForm from './loginForm.js'; 

export default function login() {

    // tear down function which removes the HTML elements of the banner
    removeFeedHTML();

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

// removes the HTML for the feed section of the page
function removeFeedHTML() {

    // we obtain the main element of the page
    const main = document.querySelector('main');

    // then we simply get the feed element and remove it as a child from main
    const feed = document.getElementById('feed');
    main.removeChild(feed);
}

// simply sets up the HTML for the login section of the page
function setupLoginHTML() {

    // we obtain the main element of the page
    const main = document.querySelector('main');

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
}