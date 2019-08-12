import handleUpdateProfileForm from './updateProfileForm.js';
import removeMainHTML from './removeMain.js'; 

export default function updateProfile() {

    // tear down function which removes the HTML elements of the body
    removeMainHTML();

    // setup function to create the HTML elements of a update profile page
    setupUpdateProfileHTML();

    // here we setup an event listener for when the update profile form
    // is completed
    document.forms.updateProfile.addEventListener('submit',(event) => {
        
        // we ensure the default action for a submit button is prevented
        event.preventDefault();

        // we call an imported function to handle the update profile request
        handleUpdateProfileForm();
    });
}

// simply sets up the HTML for the update profile section of the page
function setupUpdateProfileHTML() {

    // we first retrieve the existing root HTML element
    const root = document.getElementById('root');

    // setting up the outer main class
    const main = document.createElement('main');
    main.setAttribute('role', 'main');

    // setting up the updateProfile element within main
    const updateProfile = document.createElement('div');
    updateProfile.id = 'updateProfile';
    main.appendChild(updateProfile);

    // adding a updateProfile header to this feed element
    const updateProfileHeader = document.createElement('div');
    updateProfileHeader.classList.add('updateProfile-header');
    updateProfile.appendChild(updateProfileHeader);

    // this updateProfile header contains a title
    const updateProfileTitle = document.createElement('h3');
    updateProfileTitle.classList.add('updateProfile-title', 'alt-text');
    updateProfileTitle.textContent = 'Update Profile';
    updateProfileHeader.appendChild(updateProfileTitle);

    // now we append the updateProfile form

    // here we create the updateProfileBox which contains all updateProfile information
    const updateProfileBox = document.createElement('div');
    updateProfileBox.classList.add('updateProfileBox');     
    updateProfile.appendChild(updateProfileBox);

    // next we make a form that the user will fill out
    const updateProfileForm = document.createElement('form');
    updateProfileForm.classList.add('updateProfile-form'); 
    updateProfileForm.name = 'updateProfile';
    updateProfileBox.appendChild(updateProfileForm);

    // this form contains a title
    const updateProfileFormTitle = document.createElement('h3');
    updateProfileFormTitle.textContent = 'Update your account information';
    updateProfileForm.appendChild(updateProfileFormTitle);

    // the first piece of input is the user's password
    const updateProfileFormPassword = document.createElement('input');
    updateProfileFormPassword.placeholder = 'Password';
    updateProfileFormPassword.type = 'password';
    updateProfileFormPassword.name = 'password';
    updateProfileForm.appendChild(updateProfileFormPassword);

    // they can also update their email
    const updateProfileFormEmail = document.createElement('input');
    updateProfileFormEmail.placeholder = 'Email Address';
    updateProfileFormEmail.type = 'text';
    updateProfileFormEmail.name = 'email';
    updateProfileForm.appendChild(updateProfileFormEmail);

    // the user's name is the last piece of input for the form
    const updateProfileFormName = document.createElement('input');
    updateProfileFormName.placeholder = 'Name';
    updateProfileFormName.type = 'text';
    updateProfileFormName.name = 'name';
    updateProfileForm.appendChild(updateProfileFormName);

    // finally we have a submit button for the form
    const updateProfileFormSubmit = document.createElement('input');
    updateProfileFormSubmit.type = 'submit';
    updateProfileFormSubmit.value = 'Update';
    updateProfileForm.appendChild(updateProfileFormSubmit);

    // once all the elements are setup, we add it before
    // the footer element within the HTMLs
    const footer = document.getElementById('footer');
    root.insertBefore(main, footer);
}