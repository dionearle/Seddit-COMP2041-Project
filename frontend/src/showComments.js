export default function setup(feed, comments, viewCommentsButton) {

    // an event listener controls the view comments button
    viewCommentsButton.addEventListener('click', function() {
        handleViewCommentsButton(comments, feed);
    });

}

// handles the event of viewing all comments for a post
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

// creates a modal for viewing the comments of a post
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
    
    // for all comment's made on this post, we want to display it
    for (let i = 0; i < comments.length; i++) {

        const comment = document.createElement('p');
        comment.textContent = comments[i].comment;
        modalContent.appendChild(comment);
    }

    // finally we add this modal to the feed
    feed.appendChild(commentsModal);

    return closeButton;
}