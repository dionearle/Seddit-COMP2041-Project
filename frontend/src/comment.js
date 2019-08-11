import handleCommentForm from './commentForm.js';

export default function setup(feed, id, commentButton) {

    // an event listener controls the view comments button
    commentButton.addEventListener('click', function() {
        handleCommentsButton(id, feed);
    });

}

// handles the event of commenting on a post
function handleCommentsButton(id, feed) {

    // we create the modal and return the close button
    const closeCommentsModalButton = createCommentsModal(feed);

    // we also retrieve the modal element we just created
    const commentsModal = document.getElementById("create-comment-modal");

    // we have an event listener to handle when the user clicks the close
    // button for this modal
    closeCommentsModalButton.addEventListener('click', function() {
        feed.removeChild(commentsModal);
    });

    document.forms.comment.addEventListener('submit',(event) => {
        
        // we ensure the default action for a submit button is prevented
        event.preventDefault();

        // we call an imported function to handle the post request
        handleCommentForm(id, feed);
    });
}

// creates a modal for commenting on a post
function createCommentsModal(feed) {

    // first we create the modal element itself
    const commentsModal = document.createElement('div');
    commentsModal.id = 'create-comment-modal';
    commentsModal.classList.add('modal');

    // next we create an element for the content within the modal
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContent.textContent = 'Write a comment:'
    commentsModal.appendChild(modalContent);

    // a close button is also added to exit the modal
    const closeButton = document.createElement('span');
    closeButton.classList.add('button', 'button-primary', 'modal-close');
    closeButton.textContent = 'Close';
    modalContent.appendChild(closeButton);

    // now we make a form that the user will fill out
    const commentForm = document.createElement('form');
    commentForm.classList.add('comment-form'); 
    commentForm.name = 'comment';
    modalContent.appendChild(commentForm);

    // this form allows the user to input a comment for the post
    const commentFormComment = document.createElement('input');
    commentFormComment.placeholder = 'Comment';
    commentFormComment.type = 'text';
    commentFormComment.name = 'comment';
    commentForm.appendChild(commentFormComment);

    // we also have a submit button for the form
    const commentFormSubmit = document.createElement('input');
    commentFormSubmit.type = 'submit';
    commentFormSubmit.value = 'Comment';
    commentForm.appendChild(commentFormSubmit);

    // finally we add this modal to the feed
    feed.appendChild(commentsModal);

    return closeButton;
}