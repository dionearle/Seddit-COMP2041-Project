import API_URL from './backend_url.js';
import setupFeed from './body.js';

export default function handleUpdateProfileForm() {

    // here we grab the updateProfile form
    const updateProfileForm = document.forms.updateProfile;

    // within this form, we extract all the fields of this form
    const password = updateProfileForm.elements.password.value;
    const email = updateProfileForm.elements.email.value;
    const name = updateProfileForm.elements.name.value;

    // here we validate the information entered for the input
    validateInput(password, email, name);
}


// here we validate the profile update
function validateInput(password, email, name) {

    // we create an empty payload, and if any field are filled
    // we will update the payload to include them
    let payload = {};

    // we will use this regular expression to test for valid email addresses
    const emailFormat = /\S+@\S+\.\S+/;

    // for any fields that aren't empty, we want to add them to the payload
    if (password !== '') {
        payload.password = `${password}`;
    }

    if (email !== '') {

        // if the email isn't a valid form, we want to alert the user
        if (!emailFormat.test(email)) {
            alert('Not a valid email address');
            return;
        } else {
            payload.email = `${email}`;
        }
    }

    if (name !== '') {
        payload.name = `${name}`;
    }
    
    // finally we ensure at least one field is filled.
    // if true, then we can create a fetch request
    if (password === '' && email === '' && name === '') {
        alert('Please enter at least one field');
    } else {
        validateUpdateProfile(payload);
    }
}

// updates the users info
function validateUpdateProfile(payload) {

    // here we retrieve the token from session storage
    const token = sessionStorage.getItem('token');

    // we setup the options for the fetch request
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }

    // we use user/ to authenticate the profile update
    fetch(`${API_URL}/user/`, options)
    .then(() =>  {
        
        // we alert the user that they successfully updated their profile
        alert('Profile updated successfully');

        // we now want to setup the feed for the page
        setupFeed();        
    });
}