document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('[data-nav-link]');
    const pages = document.querySelectorAll('[data-page]');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Remove active class from all nav links
            navLinks.forEach(nav => nav.classList.remove('active'));

            // Add active class to the clicked nav link
            link.classList.add('active');

            // Hide all pages
            pages.forEach(page => page.classList.remove('active'));

            // Show the page related to the clicked nav link
            const pageId = link.textContent.trim().toLowerCase();
            const activePage = document.querySelector(`.${pageId}`);
            if (activePage) {
                activePage.classList.add('active');
            }
        });
    });
});
