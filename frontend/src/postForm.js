import setupFeed from './body.js';
import API_URL from './backend_url.js';

export default function handlePostForm() {

    // first we retrieve the token from local storage
    const token = localStorage.getItem('token');

    // here we grab the post form
    const postForm = document.forms.post;

    // within this form, we extract the required information
    const title = postForm.elements.title.value;
    const text = postForm.elements.text.value;
    const subseddit = postForm.elements.subseddit.value;
    const image = postForm.elements.image.value;
    const base64 = postForm.elements.base64.value;

    // if any fields (other than image) are empty, alert the user
    if (title === '' || text === '' || subseddit === '') {
        alert('Please fill all required fields');
    // if no image was provided, we want to upload a regular post
    } else if (image === '') {
        uploadRegularPost(title, text, subseddit, token);
    // if an image was provided, then our post should include this
    } else {

        // we use regex to test the given image is in png format
        const png = /\.png$/;

        // if the image isn't png, we alert the user
        if (!png.test(image)) {
            alert('Sorry, only png images are supported');
        // otherwise we can create a post using this iamge
        } else {
            uploadImagePost(title, text, subseddit, base64, token);
        }
    }    
}

// allows the user to upload a regular post
function uploadRegularPost(title, text, subseddit, token) {

    // we construct a payload from the given username and password
    const payload = {
        "title": `${title}`,
        "text": `${text}`,
        "subseddit": `${subseddit}`
    }

    // we also setup the options for our fetch request
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    }

    // we use post/ to authenticate this post creation
    fetch(`${API_URL}/post/`, options)
    .then(() =>  {

        // we alert the user that they successfully created their post
        alert('Post Successfully Created');

        // we now want to return to the user's feed
        setupFeed();
    });
}

// allows the user to upload a post with an image
function uploadImagePost(title, text, subseddit, image, token) {

    // we construct a payload from the given username and password
    const payload = {
        "title": `${title}`,
        "text": `${text}`,
        "subseddit": `${subseddit}`,
        "image": `${image}`
    }

    // we also setup the options for our fetch request
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    }

    // we use post/ to authenticate this post creation
    fetch(`${API_URL}/post/`, options)
    .then(() =>  {

        // we alert the user that they successfully created their post
        alert('Post Successfully Created');

        // we now want to return to the user's feed
        setupFeed();
    });
}