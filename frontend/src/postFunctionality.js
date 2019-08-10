export default function setup(json, feed, viewUpvotesButton, viewCommentsButton) {
    
    // we want to add an event listener for the view upvotes button
    viewUpvotesButton.addEventListener('click', function() {
        handleViewUpvotesButton(json.meta.upvotes, feed);
    });

    // an event listener also controls the view comments button
    viewCommentsButton.addEventListener('click', function() {
        handleViewCommentsButton(json.comments, feed);
    });

}

// handles the event of viewing all upvotes for a post
function handleViewUpvotesButton(upvotes, feed) {

    // we create the modal and return the close button
    const closeUpvotesModalButton = createUpvotesModal(upvotes, feed);

    // we also retrieve the modal element we just created
    const upvotesModal = document.getElementById("upvotes-modal");

    // we have an event listener to handle when the user clicks the close
    // button for this modal
    closeUpvotesModalButton.addEventListener('click', function() {
        feed.removeChild(upvotesModal);
    });
}

// creates a modal for viewing the upvotes of a post
function createUpvotesModal(upvotes, feed) {

    // first we create the modal element itself
    const upvotesModal = document.createElement('div');
    upvotesModal.id = 'upvotes-modal';
    upvotesModal.classList.add('modal');

    // next we create an element for the content within the modal
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContent.textContent = 'Users who upvoted this post:'
    upvotesModal.appendChild(modalContent);

    // a close button is also added to exit the modal
    const closeButton = document.createElement('span');
    closeButton.classList.add('button', 'button-primary', 'modal-close');
    closeButton.textContent = 'Close';
    modalContent.appendChild(closeButton);
    
    // for all user's who upvoted this post, we want to display
    // their id
    for (let i = 0; i < upvotes.length; i++) {

        const upvoteUser = document.createElement('p');
        upvoteUser.textContent = 'id: ' + upvotes[i];
        modalContent.appendChild(upvoteUser);
    }

    // finally we add this modal to the feed
    feed.appendChild(upvotesModal);

    return closeButton;
}

// handles the event of viewing all upvotes for a post
function handleViewCommentsButton(comments, feed) {

    // we create the modal and return the close button
    const closeCommentsModalButton = createCommentsModal(comments, feed);

    // we also retrieve the modal element we just created
    const commentsModal = document.getElementById("comments-modal");

    // we have an event listener to handle when the user clicks the close
    // button for this modal
    closeCommentsModalButton.addEventListener('click', function() {
        feed.removeChild(commentsModal);
    });
}

// creates a modal for viewing the upvotes of a post
function createCommentsModal(comments, feed) {

    // first we create the modal element itself
    const commentsModal = document.createElement('div');
    commentsModal.id = 'comments-modal';
    commentsModal.classList.add('modal');

    // next we create an element for the content within the modal
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContent.textContent = 'Comments for this post:'
    commentsModal.appendChild(modalContent);

    // a close button is also added to exit the modal
    const closeButton = document.createElement('span');
    closeButton.classList.add('button', 'button-primary', 'modal-close');
    closeButton.textContent = 'Close';
    modalContent.appendChild(closeButton);
    
    // for all user's who upvoted this post, we want to display
    // their id
    for (let i = 0; i < comments.length; i++) {

        const comment = document.createElement('p');
        comment.textContent = comments[i].comment;
        modalContent.appendChild(comment);
    }

    // finally we add this modal to the feed
    feed.appendChild(commentsModal);

    return closeButton;
}