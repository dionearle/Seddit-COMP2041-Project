import handleLoginButton from './login.js'; 
import handleSignupButton from './signup.js'; 

export default function banner() {

    // setup function which creates the HTML elements of the banner
    setupBannerHTML();

    // we want to add an event listener for the login button
    const loginButton = document.getElementById('login-button');
    loginButton.addEventListener('click', handleLoginButton);

    // we also want to add an event listener for the signup button
    const signupButton = document.getElementById('signup-button');
    signupButton.addEventListener('click', handleSignupButton);
}

// simply sets up the HTML for the banner section of the page
function setupBannerHTML() {

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
    login.id = 'login-button';
    login.setAttribute('data-id-login', "");
    login.classList.add('button', 'button-primary');
    login.textContent = 'Log In';
    
    outerLogin.appendChild(login);
    nav.appendChild(outerLogin);

    // finally we add the signup element
    const outerSignup = document.createElement('li');
    outerSignup.classList.add('nav-item');

    const signup = document.createElement('button');
    signup.id = 'signup-button';
    signup.setAttribute('data-id-signup', "");
    signup.classList.add('button', 'button-secondary');
    signup.textContent = 'Sign Up';
    
    outerSignup.appendChild(signup);
    nav.appendChild(outerSignup);

    // once all the elements are setup, we append it to the
    // already existing root HTML element
    root.appendChild(banner);
}