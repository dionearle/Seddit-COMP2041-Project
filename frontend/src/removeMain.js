// removes the HTML for the main section of the page
export default function removeMainHTML() {

    // we first retrieve the existing root HTML element
    const root = document.getElementById('root');

    // then we simply get the main element and remove it as a child from root
    const main = document.querySelector('main');
    
    // if the main element has been created before,
    // we want to remove it from the HTML
    if (main != null) {
        root.removeChild(main);
    }
}