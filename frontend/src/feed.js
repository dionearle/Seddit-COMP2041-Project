import API_URL from './backend_url.js';
import viewPostUpvotes from './showUpvotes.js';
import viewPostComments from './showComments.js';
import upvotePost from './upvotePost.js';
import setupBody from './body.js';

export default function feed() {

    // here we retrieve the token from session storage
    const token = sessionStorage.getItem('token');

    // if the token isn't set, this means the user isn't
    // logged in, so we display the public feed
    if (token === null) {
        setupPublicFeed(token);
    // if the token is set, we display this user's feed
    } else {
        setupUserFeed(token);
    }
}

// function which sets up the public feed of posts for
// non logged in users
function setupPublicFeed(token) {

    // here we simply setup the options for the fetch request
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }

    // we use post/public to retrieve the public feed
    fetch(`${API_URL}/post/public`, options)
    .then(response =>  response.json())
    .then(response => {

        // we retrieve the posts object from the returned json
        const posts = response.posts;

        // we loop through all posts given
        for (let i = 0; i < posts.length; i++) {

            // we then call a helper function to setup the HTML
            // for this post
            setupPostHTML(posts[i], token);
        }
    });
}

function setupUserFeed(token) {

    // here we extract the page number we want to fetch
    const pageNum = sessionStorage.getItem('current-page');

    // here we specify the url for the fetch request
    let url = new URL(`${API_URL}/user/feed`);

    // here we specify which page we are fetching
    const p = pageNum * 10;
    let query = {p: p};

    // we then add this search query to the url
    url.search = new URLSearchParams(query);

    // here we simply setup the options for the fetch request
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        }
    }

    // we use user/feed to retrieve this user's feed of posts
    fetch(url, options)
    .then(response =>  response.json())
    .then(response => {

        // we retrieve the posts object from the returned json
        const posts = response.posts;

        // if the user's feed is empty, then we want to handle this
        if (posts.length === 0) {

            if (pageNum > 0) {
                // if this isn't the first page, then we display the
                // previous page in which there were posts
                alert('No more posts in your feed!');
                sessionStorage.setItem('current-page', pageNum - 1);
                setupBody();
            } else {
                // we simply alert the user that their feed is empty
                alert('No posts to display in your feed!');
            }

        } else {
            // we loop through all posts given
            for (let i = 0; i < posts.length; i++) {

                // we then call a helper function to setup the HTML
                // for this post
                setupPostHTML(posts[i], token);
            }
        }
    });
}

// simply sets up the HTML for the given post object
function setupPostHTML(json, token) {

    const feed = document.getElementById('feed');

    // here we create the post element
    const post = document.createElement('li');
    post.classList.add('post');
    post.setAttribute('data-id-post', "");       

    // each post also contains a vote element
    const vote = document.createElement('div');
    vote.classList.add('vote');
    //vote.setAttribute('data-id-upvotes', "");       
    post.appendChild(vote);

    // this vote element should show the number of upvotes for this post
    const numUpvotes = document.createElement('p');
    numUpvotes.setAttribute('data-id-upvotes', "");        
    numUpvotes.textContent = json.meta.upvotes.length; 
    console.log(json.meta.upvotes);
    vote.appendChild(numUpvotes);

    // within the vote element a button to upvote the post should exist
    const upvoteButton = document.createElement('h1');
    upvoteButton.classList.add('upvote-button', 'flex-center');
    upvoteButton.textContent = '^';
    vote.appendChild(upvoteButton);

    // a post also contains a container for the content
    const content = document.createElement('div');
    content.classList.add('content');     
    post.appendChild(content);

    // the content element contains a title element
    const postTitle = document.createElement('h4');
    postTitle.setAttribute('data-id-title', "");       
    postTitle.classList.add('post-title', 'alt-text');   
    postTitle.textContent = json.title;  
    content.appendChild(postTitle); 

    // the description text should also be shown
    const postDescription = document.createElement('p');         
    postDescription.textContent = json.text; 
    content.appendChild(postDescription);

    // if there is an image, we want to display this as well
    if (json.image !== null) {
        const postImage = document.createElement('img'); 
        postImage.classList.add('post-image'); 
        postImage.src = 'data:image/png;base64, ' + json.image;
        content.appendChild(postImage);
    }

    // the content element also contains the post author
    const postAuthor = document.createElement('p');
    postAuthor.setAttribute('data-id-author', "");       
    postAuthor.classList.add('post-author');   
    postAuthor.textContent = 'Posted by @' + json.meta.author; 
    content.appendChild(postAuthor);

    // the content element shows the time of the post
    const postTime = document.createElement('p');         
    postTime.textContent = setPostTime(json.meta.published);
    content.appendChild(postTime);

    // the number of comments should be displayed
    const postComments = document.createElement('p');         
    postComments.textContent = 'Comments: ' + json.comments.length;
    content.appendChild(postComments);

    // we also want to display the subseddit this post
    // belongs to
    const postSubSeddit = document.createElement('p');         
    postSubSeddit.textContent = '/s/' + json.meta.subseddit;
    content.appendChild(postSubSeddit);

    // finally we append this post to the given feed element
    feed.appendChild(post);

    // if the user is logged in,  we also want to handle
    // any functionality involved with the post
    if (token !== null) {
        
        viewPostUpvotes(feed, json.meta.upvotes, numUpvotes);
        viewPostComments(feed, json.comments, postComments);
        upvotePost(json.id, upvoteButton, token);
        setupUpvoteStatus(json, token, upvoteButton);  
    }
}

// a helper function to correctly format the upload time
// of a post
function setPostTime(postTime) {

    // we convert the UNIX timestamp into a date object
    const postDate = new Date(postTime * 1000);

    // we then extract the relevant information
    const month = postDate.getMonth();
    const date = postDate.getDate();
    const year = postDate.getFullYear();
    let hours = postDate.getHours();
    const minutes = postDate.getMinutes();
    const seconds = postDate.getSeconds();

    // we also want to convert from 24hr time to 12hr time
    const suffix = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    
    // finally we return a formatted string to display
    return 'Posted on ' + date + '/' + month + '/' + year 
    + ' at ' + hours + ':' + ("0"+minutes).slice(-2) + ':' 
    + ("0"+seconds).slice(-2) + suffix;
}

// function which ensures the upvote button matches
// whether the user has upvoted the post or not
function setupUpvoteStatus(json, token, upvoteButton) {
    
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
        if (json.meta.upvotes.includes(user.id)) {
            upvoteButton.classList.toggle('upvoted');
        }
    });
}