import removeMainHTML from './removeMain.js';
import createFeed from './feed.js';
import postContent from './createPost.js';

export default function body() {

    // tear down function which removes the HTML elements of the body
    removeMainHTML();

    // setup function which creates the HTML elements of the body
    setupBodyHTML();
}

// simply sets up the HTML for the body section of the page
function setupBodyHTML() {

    // here we retrieve the token from local storage
    const token = localStorage.getItem('token');

    // we first retrieve the existing root HTML element
    const root = document.getElementById('root');

    // setting up the outer main class
    const main = document.createElement('main');
    main.setAttribute('role', 'main');

    // setting up the feed element within main
    const feed = document.createElement('ul');
    feed.id = 'feed';
    feed.setAttribute('data-id-feed', "");
    main.appendChild(feed);

    // adding a feed header to this feed element
    const feedHeader = document.createElement('div');
    feedHeader.classList.add('feed-header');
    feed.appendChild(feedHeader);

    // for this feed header, the first item is a title
    const feedTitle = document.createElement('h3');
    feedTitle.classList.add('feed-title', 'alt-text');
    feedTitle.textContent = 'Popular posts';
    feedHeader.appendChild(feedTitle);

    // the feed header also contains a post button
    const postButton = document.createElement('button');
    postButton.classList.add('button', 'button-secondary');
    postButton.textContent = 'Post';
    feedHeader.appendChild(postButton);

    // we want a logged in user to be able to create a post
    if (token !== null) {
        
        // we do so by adding an event listener to the
        // post button we created
        postButton.addEventListener('click', function() {
            postContent();
        });
    }

    // here we create all the post elements to show
    // within this feed
    createFeed(feed);

    // once all the elements are setup, we add it before
    // the footer element within the HTMLs
    const footer = document.getElementById('footer');
    root.insertBefore(main, footer);
}