// removes the HTML for the banner section of the page
export default function removeBannerHTML() {

    // we first retrieve the existing root HTML element
    const root = document.getElementById('root');

    // then we simply get the banner element and remove it as a child from root
    const banner = document.getElementById('nav');
    
    // if the banner element has been created before,
    // we want to remove it from the HTML
    if (banner != null) {
        root.removeChild(banner);
    }
}