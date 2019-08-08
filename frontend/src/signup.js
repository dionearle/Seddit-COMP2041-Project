import handleSignupForm from './signupForm.js';
import removeMainHTML from './removeMain.js'; 

export default function signup() {

    // tear down function which removes the HTML elements of the body
    removeMainHTML();

    // setup function to create the HTML elements of a signup page
    setupSignupHTML();

    // here we setup an event listener for when the signup
    // form is completed
    document.forms.signup.addEventListener('submit',(event) => {
        
        // we ensure the default action for a submit button is prevented
        event.preventDefault();

        // we call an imported function to handle the signup request
        handleSignupForm();
    });
}

// simply sets up the HTML for the signup section of the page
function setupSignupHTML() {

    // we first retrieve the existing root HTML element
    const root = document.getElementById('root');

    // setting up the outer main class
    const main = document.createElement('main');
    main.setAttribute('role', 'main');

    // setting up the signup element within main
    const signup = document.createElement('div');
    signup.id = 'signup';
    main.appendChild(signup);

    // adding a signup header to this feed element
    const signupHeader = document.createElement('div');
    signupHeader.classList.add('signup-header');
    signup.appendChild(signupHeader);

    // this signup header contains a title
    const signupTitle = document.createElement('h3');
    signupTitle.classList.add('signup-title', 'alt-text');
    signupTitle.textContent = 'Sign Up';
    signupHeader.appendChild(signupTitle);

    // now we append the signup form

    // here we create the signupBox which contains all signup information
    const signupBox = document.createElement('div');
    signupBox.classList.add('signupBox');     
    signup.appendChild(signupBox);

    // next we make a form that the user will fill out
    const signupForm = document.createElement('form');
    signupForm.classList.add('signup-form'); 
    signupForm.name = 'signup';
    signupBox.appendChild(signupForm);

    // this form contains a title
    const signupFormTitle = document.createElement('h3');
    signupFormTitle.textContent = 'Create an Account';
    signupForm.appendChild(signupFormTitle);

    // the first piece of input for the form is the username
    const signupFormUsername = document.createElement('input');
    signupFormUsername.placeholder = 'Username';
    signupFormUsername.type = 'text';
    signupFormUsername.name = 'username';
    signupForm.appendChild(signupFormUsername);

    // the other piece of input for the signup form is password
    const signupFormPassword1 = document.createElement('input');
    signupFormPassword1.placeholder = 'New Password';
    signupFormPassword1.type = 'password';
    signupFormPassword1.name = 'password1';
    signupForm.appendChild(signupFormPassword1);

    // we also have another input box to ensure the user entered their
    // password correctly
    const signupFormPassword2 = document.createElement('input');
    signupFormPassword2.placeholder = 'Repeat Password';
    signupFormPassword2.type = 'password';
    signupFormPassword2.name = 'password2';
    signupForm.appendChild(signupFormPassword2);

    // next we ask for the user's email
    const signupFormEmail = document.createElement('input');
    signupFormEmail.placeholder = 'Email Address';
    signupFormEmail.type = 'text';
    signupFormEmail.name = 'email';
    signupForm.appendChild(signupFormEmail);

    // the user's name is the last piece of input for the form
    const signupFormName = document.createElement('input');
    signupFormName.placeholder = 'Name';
    signupFormName.type = 'text';
    signupFormName.name = 'name';
    signupForm.appendChild(signupFormName);

    // finally we have a submit button for the form
    const signupFormSubmit = document.createElement('input');
    signupFormSubmit.type = 'submit';
    signupFormSubmit.value = 'Create';
    signupForm.appendChild(signupFormSubmit);

    // once all the elements are setup, we add it before
    // the footer element within the HTMLs
    const footer = document.getElementById('footer');
    root.insertBefore(main, footer);
}