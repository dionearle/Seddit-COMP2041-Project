import API_URL from './backend_url.js';

export default function setup(id, upvotePostButton, token) {

    // we want to add an event listener for the upvote button
    upvotePostButton.addEventListener('click', function() {
        
        // if the post is already upvoted, we want to retract the users upvote
        if (upvotePostButton.classList.contains('upvoted')) {
            handleDeleteUpvote(id, token);     
        // if the post isn't already upvoted, then we want to upvote it
        } else {
            handleUpvotePost(id, token);
        }
        
        // finally we want to update the upvote button to indicate to the user
        // the upvote status of this post
        upvotePostButton.classList.toggle('upvoted');       
    });
}

// allows the user to upvote a post with the given post id
function handleUpvotePost(id, token) {

    // here we specify the url for the fetch request
    let url = new URL(`${API_URL}/post/vote`);

    // since the API requires to post ID, we set this as a query
    let query = {id: id};

    // we then add this search query to the url
    url.search = new URLSearchParams(query);

    // here we simply setup the options for the fetch request
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        }
    }
    
    // then we simply fetch this request to upvote the post
    fetch(url, options);

}

// retracts an upvote by the user for the given post
function handleDeleteUpvote(id, token) {

    // here we specify the url for the fetch request
    let url = new URL(`${API_URL}/post/vote`);

    // since the API requires to post ID, we set this as a query
    let query = {id: id};

    // we then add this search query to the url
    url.search = new URLSearchParams(query);

    // here we simply setup the options for the fetch request
    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        }
    }
    
    // then we simply fetch this request to upvote the post
    fetch(url, options);
}