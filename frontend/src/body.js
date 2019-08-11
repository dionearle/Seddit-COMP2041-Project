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

    // here we retrieve the token from session storage
    const token = sessionStorage.getItem('token');

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

    // logged in users also have added functionality
    if (token !== null) {
        
        // we first allow a logged in user to create a post
        // by using the post button
        postButton.addEventListener('click', function() {
            postContent();
        });

        // we also allow a logged in user to navigate between
        // pages of posts in their feed
        setupPagination(main);
    }

    // here we create all the post elements to show
    // within this feed
    createFeed(feed);

    // once all the elements are setup, we add it before
    // the footer element within the HTMLs
    const footer = document.getElementById('footer');
    root.insertBefore(main, footer);
}

// helper function to setup the pagination section of the page
function setupPagination(main) {

    // first we extract the page number from session storage
    const pageNum = sessionStorage.getItem('current-page');

    // we create an outer div element to store the pagination
    const pagination = document.createElement('div');
    pagination.classList.add('pagination');
    main.appendChild(pagination);

    // the first element in this div is a button to navigate
    // to the previous page of posts
    const prevPage = document.createElement('button');
    prevPage.classList.add('button', 'button-secondary');
    prevPage.textContent = 'Prev';
    pagination.appendChild(prevPage);

    // the next element is a text element displaying the current page
    const paginationText = document.createElement('p');
    paginationText.classList.add('feed-title', 'alt-text');
    paginationText.textContent = 'Page ' + pageNum;
    paginationText.id = 'pagination';
    pagination.appendChild(paginationText);

    // we also have a button to reach the next page of posts
    const nextPage = document.createElement('button');
    nextPage.classList.add('button', 'button-secondary');
    nextPage.textContent = 'Next';
    pagination.appendChild(nextPage);

    // if the user clicks on the previous button, we want to
    // display the previous set of posts
    prevPage.addEventListener('click', function () {
        // if we are on the first page, then there are no previous
        // posts so we don't do anything
        if (pageNum > 0) {
            sessionStorage.setItem('current-page', Number(pageNum) - 1);
            body();
        }
    });

    // if the user clicks on the next button, we want to
    // display the next set of posts
    nextPage.addEventListener('click', function () {
        sessionStorage.setItem('current-page', Number(pageNum) + 1);
        body();
    });
}