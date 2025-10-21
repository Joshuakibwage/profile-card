

//navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const hamburger = document.querySelectorAll('.hamburger');
    const navLinksContainer = document.querySelectorAll('.nav-links');
    const timeDisplay = document.querySelector('[data-testid="test-user-time"]');
    const avatarUpload = document.getElementById('avatar-upload');
    const avatar = document.getElementById('avatar');

    function updateTime() {
        timeDisplay.textContent = Date.now();
    }

    updateTime();

    setInterval(updateTime, 1000);

    // Avatar upload functionality
    avatarUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                avatar.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Page navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
                    
            
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
                    
            // Show selected page
            const pageId = this.getAttribute('data-page');
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === pageId) {
                    page.classList.add('active');
                }
            });

            
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        navLinksContainer.classList.toggle('active');
    });

})