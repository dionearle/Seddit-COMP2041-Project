import API_URL from './backend_url.js';

export default function setup(username, followButton, token) {

    // we want to add an event listener for the follow button
    followButton.addEventListener('click', function() {
        
        // if the user is already following them, we want to unfollow
        if (followButton.classList.contains('following')) {
            handleUnfollow(username, token); 
            followButton.textContent = 'Follow';    
        // if they aren't yet following, we want to follow
        } else {
            handleFollow(username, token);
            followButton.textContent = 'Unfollow';
        }
        
        // finally we want to update the follow button to indicate to the user
        // the follow status of this user
        followButton.classList.toggle('following');       
    }); 
}

// allows the user to follow a user
function handleFollow(username, token) {

    // here we specify the url for the fetch request
    let url = new URL(`${API_URL}/user/follow`);

    // since the API requires the username, we set this as a query
    let query = {username: username};

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
    
    // then we simply fetch this request to follow the user
    fetch(url, options);

}

// retracts a follow for a given user
function handleUnfollow(username, token) {
    
    // here we specify the url for the fetch request
    let url = new URL(`${API_URL}/user/unfollow`);

    // since the API requires the username, we set this as a query
    let query = {username: username};

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
    
    // then we simply fetch this request to unfollow the user
    fetch(url, options);
}