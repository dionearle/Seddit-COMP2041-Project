export default function body() {

    // setup function which creates the HTML elements of the body
    setupBodyHTML();
}

// simply sets up the HTML for the body section of the page
function setupBodyHTML() {

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

    // now we append all the posts to this feed
    for (let i = 0; i < 7; i++) {

        // here we create the post element
        const post = document.createElement('li');
        post.classList.add('post');
        post.setAttribute('data-id-post', "");       
        feed.appendChild(post);

        // each post also contains a vote element
        const vote = document.createElement('div');
        vote.classList.add('vote');
        vote.setAttribute('data-id-upvotes', "");       
        post.appendChild(vote);

        // a post also contains a container for the content
        const content = document.createElement('div');
        content.classList.add('content');     
        post.appendChild(content);

        // the content element contains a title element
        const postTitle = document.createElement('h4');
        postTitle.setAttribute('data-id-title', "");       
        postTitle.classList.add('post-title', 'alt-text');   
        postTitle.textContent = 'Avenger\'s Endgame Officially Passes Avatar To Become The Highest Grossing Movie Of All Time';  
        content.appendChild(postTitle);

        // the content element also contains the post author
        const postAuthor = document.createElement('p');
        postAuthor.setAttribute('data-id-author', "");       
        postAuthor.classList.add('post-author');   
        postAuthor.textContent = 'Posted by @some_dude69';  
        content.appendChild(postAuthor);
    }

    // finally we add the footer element
    const footer = document.createElement('footer');
    const footerText = document.createElement('p');
    footerText.textContent = 'Seddit';
    footer.appendChild(footerText);

    // once all the elements are setup, we append it to the
    // already existing root HTML element
    root.appendChild(main);
    root.appendChild(footer);
}