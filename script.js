function resizeIframe(id) {
    const iframe = document.getElementById(id);
    if (!iframe) return;

    try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        if (iframeDoc && iframeDoc.body) {
            // Delay to ensure all CSS and images load
            setTimeout(() => {
                const body = iframeDoc.body;
                const html = iframeDoc.documentElement;

                const newHeight = Math.max(
                    body.scrollHeight,
                    body.offsetHeight,
                    html.scrollHeight,
                    html.offsetHeight,
                    html.clientHeight
                );

                iframe.style.height = newHeight + 'px';
            }, 100); // increase delay if needed
        }
    } catch (err) {
        console.warn('Cannot access iframe content for', id, err);
    }
}

// Footer loading functionality
window.addEventListener('load', () => {
    // Load footer content
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(err => console.error('Error loading footer:', err));
    
    // Handle navbar iframe resizing
    const navbarIframe = document.querySelector('iframe[src="navbar.html"]');
    if (navbarIframe) {
        navbarIframe.onload = () => resizeIframe('navbar');
        navbarIframe.id = 'navbar';
    }
});
