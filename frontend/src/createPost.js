import removeMainHTML from './removeMain.js';
import handlePostForm from './postForm.js'; 

export default function post() {

    // tear down function which removes the HTML elements of the body
    removeMainHTML();

    // setup function to create the HTML elements of a post page
    setupPostHTML();

    // here we setup an event listener for when the create 
    // post form is complete
    document.forms.post.addEventListener('submit',(event) => {
        
        // we ensure the default action for a submit button is prevented
        event.preventDefault();

        // we call an imported function to handle the post request
        handlePostForm();
    });
}

// simply sets up the HTML for the post section of the page
function setupPostHTML() {

    // we first retrieve the existing root HTML element
    const root = document.getElementById('root');

    // setting up the outer main class
    const main = document.createElement('main');
    main.setAttribute('role', 'main');

    // setting up the create post element within main
    const createPost = document.createElement('div');
    createPost.id = 'create-post';
    main.appendChild(createPost);

    // adding a post header to this feed element
    const createPostHeader = document.createElement('div');
    createPostHeader.classList.add('create-post-header');
    createPost.appendChild(createPostHeader);

    // this post header contains a title
    const createPostTitle = document.createElement('h3');
    createPostTitle.classList.add('create-post-title', 'alt-text');
    createPostTitle.textContent = 'Post new content';
    createPostHeader.appendChild(createPostTitle);

    // now we append the post form

    // here we create the postBox which contains all post information
    const postBox = document.createElement('div');
    postBox.classList.add('postBox');     
    createPost.appendChild(postBox);

    // next we make a form that the user will fill out
    const postForm = document.createElement('form');
    postForm.classList.add('post-form'); 
    postForm.name = 'post';
    postBox.appendChild(postForm);

    // this form contains a title
    const formTitle = document.createElement('h3');
    formTitle.textContent = 'Create a new post';
    postForm.appendChild(formTitle);

    // the first piece of input for the form is the title of the post
    const postFormTitle= document.createElement('input');
    postFormTitle.placeholder = 'Title';
    postFormTitle.type = 'text';
    postFormTitle.name = 'title';
    postForm.appendChild(postFormTitle);

    // the next input asks for the text of the post
    const postFormText = document.createElement('input');
    postFormText.placeholder = 'Text';
    postFormText.type = 'text';
    postFormText.name = 'text';
    postForm.appendChild(postFormText);

    // we also want the subseddit for the post
    const postFormSubseddit = document.createElement('input');
    postFormSubseddit.placeholder = 'Subseddit';
    postFormSubseddit.type = 'text';
    postFormSubseddit.name = 'subseddit';
    postForm.appendChild(postFormSubseddit);

    // finally the user can upload an image if required
    const postFormImage = document.createElement('input');
    postFormImage.type = 'file';
    postFormImage.name = 'image';
    postFormImage.id = 'post-form-image';
    postForm.appendChild(postFormImage);

    // if a user uploads an image, then we want to convert
    // this to a base64 string
    postFormImage.addEventListener('change', function(){
        convertToBase64(postForm);
    });

    // finally we have a submit button for the form
    const postFormSubmit = document.createElement('input');
    postFormSubmit.type = 'submit';
    postFormSubmit.value = 'post';
    postForm.appendChild(postFormSubmit);

    // once all the elements are setup, we add it before
    // the footer element within the HTMLs
    const footer = document.getElementById('footer');
    root.insertBefore(main, footer);
}

// helper function which converts uploaded images to base 64 format
function convertToBase64(postForm) {

    // here we retrieve the files uploaded
    var numFiles = document.getElementById('post-form-image').files;
    
    // if a file was uploaded, then we want to conver it
    if (numFiles.length > 0) {

      // we grab the first file in the image form element
      var image = numFiles[0];

      // we then create a new file reader and read in the image
      var fileReader = new FileReader();
      fileReader.readAsDataURL(image);

      // this function handles what happens when the file
      // is read in
      fileReader.onload = function(fileLoadedEvent) {

        // we first extract the base64 string returned
        var string = fileLoadedEvent.target.result;
        
        // we use this regex to remove the uneeded metadata
        const regex = /^data:image\/[a-z]+;base64,/;       
        string = string.replace(regex, '');

        // finally we create a new hidden element to add to the form
        var base64 = document.createElement('input');
        base64.name = 'base64';
        base64.value = string;
        base64.style.display = 'none';
        postForm.appendChild(base64);
      }
    }
}