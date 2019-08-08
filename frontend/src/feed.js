export default function feed(feed) {

 /*  fetch('../data/feed.json')
    .then((response) => response.json())
    .then(response => {       
        // comment
        const posts = response.posts;
        // NOTE: posts should be in reverse chronological order
        for (let i = 0; i < posts.length; i++) {
            console.log(posts);
            //const post = setupPostHTML(response[i]);
            // feed.appendChild(post);
        }
    }); */

    //fetch('test').then(r=>r.text()).then(r => console.log(r));
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

    // the content element also contains the post author
    const postAuthor = document.createElement('p');
    postAuthor.setAttribute('data-id-author', "");       
    postAuthor.classList.add('post-author');   
    postAuthor.textContent = json.meta.author; 
    content.appendChild(postAuthor);

    // the content element shows the time of the post
    const postTime = document.createElement('p');         
    postTime.textContent = Date.now() - json.meta.published; 
    content.appendChild(postTime);

    // the number of comments should be displayed
    const postComments = document.createElement('p');         
    postComments.textContent = json.comments.length;
    content.appendChild(postComments);

    // we also want to display the subseddit this post
    // belongs to
    const postSubSeddit = document.createElement('p');         
    postSubSeddit.textContent = json.metadata.subseddit;
    content.appendChild(postSubSeddit);

    // if there is an image, we want to display this as well
    if (json.image !== null) {
        const postImage = document.createElement('data::image/jpeg;base64, img');  
        postImage.src = json.image;
        content.appendChild(postImage);
    }

    return post;
}