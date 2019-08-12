import API_URL from './backend_url.js';
import removeMainHTML from './removeMain.js';
import displayUserPost from './displayUserPost.js';
import followUser from './followUser.js';

export default function authorProfile(username, button) {

    // if this user clicks the button, their profile should be displayed
    button.addEventListener('click', function() {

        // here we retrieve the token from session storage
        const token = sessionStorage.getItem('token');

        // here we specify the url for the fetch request
        let url = new URL(`${API_URL}/user/`);

        // we also need the username for the author of this post
        let query = {username: username};

        // we then add this search query to the url
        url.search = new URLSearchParams(query);

        // we also setup the options for our fetch request
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            }
        }

        // we use user/ to authenticate this post creation
        fetch(url, options)
        .then((response) => response.json())
        .then((response) => {

            // tear down function which removes the HTML elements of the body
            removeMainHTML();
            
            // setup function to create the HTML elements of a profile page
            setupAuthorProfileHTML(response, token);
        });
    });
}

// simply sets up the HTML for the author profile section of the page
function setupAuthorProfileHTML(author, token) {

    // we first retrieve the existing root HTML element
    const root = document.getElementById('root');

    // setting up the outer main class
    const main = document.createElement('main');
    main.setAttribute('role', 'main');

    // setting up the profile element within main
    const profile = document.createElement('div');
    profile.id = 'profile';
    main.appendChild(profile);

    // adding a profile header to this feed element
    const profileHeader = document.createElement('div');
    profileHeader.classList.add('profile-header');
    profile.appendChild(profileHeader);

    // this profile header contains a title
    const profileTitle = document.createElement('h3');
    profileTitle.classList.add('profile-title', 'alt-text');
    profileTitle.textContent = author.username + '\'s Profile';
    profileHeader.appendChild(profileTitle);

    // here we create the profileBox which contains all profile information
    const profileBox = document.createElement('div');
    profileBox.classList.add('profileBox');     
    profile.appendChild(profileBox);

    // we first make a container for within this box
    const innerProfile = document.createElement('div');
    innerProfile.classList.add('inner-profile'); 
    profileBox.appendChild(innerProfile);

    // the first element to display is a title
    const innerProfileTitle = document.createElement('h3');
    innerProfileTitle.textContent = author.username + '\'s Seddit Profile';
    innerProfile.appendChild(innerProfileTitle);

    // now we show the username of this user
    const profileUsername = document.createElement('p');
    profileUsername.textContent = 'Username: ' + author.username;
    innerProfile.appendChild(profileUsername);

    // we also display the id of this user
    const profileId = document.createElement('p');
    profileId.textContent = 'id: ' + author.id;
    innerProfile.appendChild(profileId);

    // next we show the email
    const profileEmail = document.createElement('p');
    profileEmail.textContent = 'Email: ' + author.email;
    innerProfile.appendChild(profileEmail);

    // the user's given name is also displayed
    const profileName = document.createElement('p');
    profileName.textContent = 'Name: ' + author.name;
    innerProfile.appendChild(profileName);

    // here we show how many users they are following
    const profileFollowing = document.createElement('p');
    profileFollowing.textContent = 'Users Following: ' + author.following.length;
    innerProfile.appendChild(profileFollowing);

    // we also show how many users are following them
    const profileFollowers = document.createElement('p');
    profileFollowers.textContent = 'Followers: ' + author.followed_num;
    innerProfile.appendChild(profileFollowers);

    // next we show how many posts this user has created
    const profileNumPosts = document.createElement('p');
    profileNumPosts.textContent = 'Number of posts made: ' + author.posts.length;
    innerProfile.appendChild(profileNumPosts);

    // finally we display how many upvotes all of their posts
    // have combined
    setupTotalUpvotes(author, innerProfile, token, profile);

    // once all the elements are setup, we add it before
    // the footer element within the HTMLs
    const footer = document.getElementById('footer');
    root.insertBefore(main, footer);
}

// helper function to determine the total upvotes recieved
// across all posts made by the user
function setupTotalUpvotes(author, innerProfile, token, profile) {

    // we create an element to display this information
    const totalUpvotes = document.createElement('p');

    // here we specify the url for the fetch request
    let url = new URL(`${API_URL}/post/`);

    // here we simply setup the options for the fetch request
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        }
    }

    // we setup an array of fetch requests, alongside a variable
    // to store the total number of upvotes
    let posts = [];
    let result = 0;

    // for each post the user has made, we want to fetch it
    for (let i = 0; i < author.posts.length; i++) {

        // since the API requires the post ID, we set this as a query
        const id = author.posts[i];
        let query = {id: id};

        // we then add this search query to the url
        url.search = new URLSearchParams(query);

        // we now fetch this and add it to the array
        posts.push(fetch(url, options)
        .then(response => response.json()));
    }

    // once all fetch requests are complete in the array,
    // we handle the responses
    Promise.all(posts)
    .then((response) => {

        // for each response, we recieved, we want to
        // extract the number of upvotes for the post
        // and add it to the total result
        for (let i = 0; i < response.length; i++) {

            const upvotes = response[i].meta.upvotes.length;
            result += upvotes;

            // we also want to display this post on the
            // users profile
            displayUserPost(response[i], profile, token);
        }

        // finally we set the text content to display this result
        totalUpvotes.textContent = 'Total upvotes across all posts: ' + result;
        innerProfile.appendChild(totalUpvotes);

        // we also want a follow button to be shown on the
        // user's profile
        const followButton = document.createElement('button');
        followButton.classList.add('follow-button', 'button');
        followButton.textContent = 'Follow';
        innerProfile.appendChild(followButton);

        // we handle the functionality of this button 
        // in these helper functions
        setupFollowStatus(author, token, followButton);
        followUser(author.username, followButton, token);
    });
}

// function which ensures the follow button matches
// whether the user is following them or not
function setupFollowStatus(author, token, followButton) {
    
    // here we simply setup the options for the fetch request
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        }
    }

    // we use user/feed to retrieve this user's feed of posts
    fetch(`${API_URL}/user/`, options)
    .then(response => response.json())
    .then(user => {

        // if the user has upvoted the post,
        // we want to change the view of the button to reflect this
        if (user.following.includes(author.id)) {
            followButton.classList.toggle('following');
            followButton.textContent = 'Unfollow';
        }
    });
}