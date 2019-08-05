export default function banner() {

    // setup function which creates the HTML elements of the banner
    setupBanner();
}

function setupBanner() {

    // we first retrieve the existing root HTML element
    const root = document.getElementById('root');

    // setting up the outer banner class
    const banner = document.createElement('header');
    banner.classList.add('banner');
    banner.id = 'nav';

    // setting up the logo element within the banner
    const logo = document.createElement('h1');
    logo.id = 'logo';
    logo.classList.add('flex-center');
    logo.textContent = 'Seddit';
    banner.appendChild(logo);

    // setting up the nav list element within the banner
    const nav = document.createElement('ul');
    nav.classList.add('nav');
    banner.appendChild(nav);
    
    // setting up the nav items within this nav list

    // the first item is the search element
    const outerSearch = document.createElement('li');
    outerSearch.classList.add('nav-item');

    const search = document.createElement('input');
    search.id = 'search';
    search.setAttribute('data-id-search', "");
    search.placeholder = 'Search Seddit';
    search.type = 'search';

    outerSearch.appendChild(search);
    nav.appendChild(outerSearch);

    // next is the login element
    const outerLogin = document.createElement('li');
    outerLogin.classList.add('nav-item');

    const login = document.createElement('button');
    login.setAttribute('data-id-login', "");
    login.classList.add('button', 'button-primary');
    login.textContent = 'Log In';

    // we also want to add an event listener for this button
    login.addEventListener('click', handleLoginButton);
    
    outerLogin.appendChild(login);
    nav.appendChild(outerLogin);

    // finally we add the signup element
    const outerSignup = document.createElement('li');
    outerSignup.classList.add('nav-item');

    const signup = document.createElement('button');
    signup.setAttribute('data-id-signup', "");
    signup.classList.add('button', 'button-secondary');
    signup.textContent = 'Sign Up';
    
    outerSignup.appendChild(signup);
    nav.appendChild(outerSignup);

    // once all the elements are setup, we append it to the
    // already existing root HTML element
    root.appendChild(banner);
}

function handleLoginButton() {

    // tear down function which removes the HTML elements of the banner
    removeFeed();

    // setup function to create the HTML elements of a login page
    setupLogin();
}

function removeFeed() {
    const main = document.querySelector('main');

    const feed = document.getElementById('feed');
    main.removeChild(feed);
}

function setupLogin() {
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

    // here we create the post element
    const loginBox = document.createElement('div');
    loginBox.classList.add('loginBox');     
    login.appendChild(loginBox);

    const loginForm = document.createElement('form');
    loginForm.classList.add('login-form'); 
    loginForm.name = 'login';
    loginBox.appendChild(loginForm);

    const loginFormTitle = document.createElement('h3');
    loginFormTitle.textContent = 'Login to Seddit';
    loginForm.appendChild(loginFormTitle);

    const loginFormUsername = document.createElement('input');
    loginFormUsername.placeholder = 'Username';
    loginFormUsername.type = 'text';
    loginFormUsername.name = 'username';
    loginForm.appendChild(loginFormUsername);

    const loginFormPassword = document.createElement('input');
    loginFormPassword.placeholder = 'Password';
    loginFormPassword.type = 'password';
    loginFormPassword.name = 'password';
    loginForm.appendChild(loginFormPassword);

    const loginFormSubmit = document.createElement('input');
    loginFormSubmit.type = 'submit';
    loginFormSubmit.value = 'Login';
    loginForm.appendChild(loginFormSubmit);

    const loginFormInfo = document.forms.login;

    loginFormInfo.addEventListener('submit',(event) => {
        event.preventDefault();

        handleLoginForm();
    });

}

function handleLoginForm() {

    const loginFormInfo = document.forms.login;

    const username = loginFormInfo.elements.username.value;
    const password = loginFormInfo.elements.password.value;

    if (username === '' || password === '') {
        alert('Please enter a username and password');
    } else if (!validatePassword(username, password)) {
        alert('Incorrect username or password');
    } else {
        alert('Login successful');
    } 
}

const validatePassword = (username, password) => {
    // here we would validate the username and password!
    return false;
}