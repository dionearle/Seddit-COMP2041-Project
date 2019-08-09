export default function setup(json, viewUpvotesButton, feed) {
    
    // we want to add an event listener for the view upvotes button
    viewUpvotesButton.addEventListener('click', function() {
        handleViewUpvotesButton(json.meta.upvotes, feed);
    });

}

function handleViewUpvotesButton(upvotes, feed) {

    const closeUpvotesModal = createUpvotesModal(upvotes, feed);

    const upvotesModal = document.getElementById("myModal");

    closeUpvotesModal.addEventListener('click', function() {
        feed.removeChild(upvotesModal);
    });
}

function createUpvotesModal(upvotes, feed) {

    const upvotesModal = document.createElement('div');
    upvotesModal.id = 'myModal';
    upvotesModal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContent.textContent = 'Users who upvoted this post:'
    upvotesModal.appendChild(modalContent);

    const closeButton = document.createElement('span');
    closeButton.classList.add('close');
    closeButton.textContent = 'Close';
    modalContent.appendChild(closeButton);
    
    for (let i = 0; i < upvotes.length; i++) {

        const upvoteUser = document.createElement('p');
        upvoteUser.textContent = upvotes[i];
        modalContent.appendChild(upvoteUser);
    }

    feed.appendChild(upvotesModal);

    return closeButton;
}