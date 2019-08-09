import API_URL from './backend_url.js';

export default function feed(feed) {

    // here we retrieve the token from local storage
    const token = localStorage.getItem('token');

    // if the token isn't set, this means the user isn't
    // logged in, so we display the public feed
    if (token === null) {
        setupPublicFeed(feed);
    // if the token is set, we display this user's feed
    } else {
        setupUserFeed(feed, token);
    }
}

// function which sets up the public feed of posts for
// non logged in users
function setupPublicFeed(feed) {

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
            const post = setupPostHTML(posts[i]);

            // finally we append this post to the given feed element
            feed.appendChild(post);
        }

    });
}

function setupUserFeed(feed, token) {

    // here we simply setup the options for the fetch request
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        }
    }

    // we use user/feed to retrieve this user's feed of posts
    fetch(`${API_URL}/user/feed`, options)
    .then(response =>  response.json())
    .then(response => {

        // we retrieve the posts object from the returned json
        const posts = response.posts;

        // we loop through all posts given
        for (let i = 0; i < posts.length; i++) {

            // we then call a helper function to setup the HTML
            // for this post
            const post = setupPostHTML(posts[i]);
           
            // finally we append this post to the given feed element
            feed.appendChild(post);
        }

        // if the user's feed is empty, then we want to handle this
        if (posts.length === 0) {
            // first we alert the user that their feed is empty
            alert('No posts to display! Showing public feed...');
            
            // then we simply display the public feed
            setupPublicFeed(feed);
        }

    });
}

// simply sets up the HTML for the given post object
function setupPostHTML(json) {

    // here we create the post element
    const post = document.createElement('li');
    post.classList.add('post');
    post.setAttribute('data-id-post', "");       

    // each post also contains a vote element
    const vote = document.createElement('div');
    vote.classList.add('vote');
    vote.setAttribute('data-id-upvotes', "");
    vote.textContent = json.meta.upvotes.length;       
    post.appendChild(vote);

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

    return post;
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