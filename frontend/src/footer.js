export default function footer() {

    // we first retrieve the existing root HTML element
    const root = document.getElementById('root');

    // we then create the footer element
    const footer = document.createElement('footer');
    footer.id = 'footer';
    const footerText = document.createElement('p');
    footerText.textContent = 'Seddit';
    footer.appendChild(footerText);

    // we then append this footer to the root element
    root.appendChild(footer);
}