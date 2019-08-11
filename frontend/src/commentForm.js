import API_URL from './backend_url.js';

export default function handlePostForm(id, feed) {

    // here we grab the comment form
    const commentForm = document.forms.comment;

    // within this form, we extract the comment field
    const comment = commentForm.elements.comment.value;

    // if the comment was empty, we alert the user
    if (comment === '') {
        alert('Please enter a comment before submitting');
    // otherwise, we submit the comment request
    } else {
        submitComment(id, feed, comment);
    } 
    
}

// allows the user to comment on a post
function submitComment(id, feed, comment) {

    // first we retrieve the token from session storage
    const token = sessionStorage.getItem('token');

    // here we specify the url for the fetch request
    let url = new URL(`${API_URL}/post/comment`);

    // since the API requires the post ID, we set this as a query
    let query = {id: id};

    // we then add this search query to the url
    url.search = new URLSearchParams(query);

    // we construct a payload which contains the comment given
    const payload = {
        "comment": `${comment}`
    }

    // we also setup the options for our fetch request
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    }

    // then we simply fetch this request to upvote the post
    fetch(url, options)
    .then(() =>  {

        // we alert the user that they successfully created their post
        alert('Comment created successfully');

        // then we simply close the modal
        const commentsModal = document.getElementById("create-comment-modal");
        feed.removeChild(commentsModal);
    });
}