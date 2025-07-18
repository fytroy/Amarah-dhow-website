document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            navToggle.classList.toggle('open'); // For hamburger animation
            document.body.classList.toggle('no-scroll'); // Optional: prevent scrolling when nav is open
        });

        // Close nav when a link is clicked
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) { // Only close on mobile
                    mainNav.classList.remove('active');
                    navToggle.classList.remove('open');
                    document.body.classList.remove('no-scroll');
                }
            });
        });
    }

    // --- FAQ Accordion ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.closest('.faq-item');
            const currentContent = currentItem.querySelector('.accordion-content');

            // Close all other open items
            accordionHeaders.forEach(otherHeader => {
                const otherItem = otherHeader.closest('.faq-item');
                if (otherItem !== currentItem && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.maxHeight = 0;
                    otherItem.querySelector('.accordion-content').style.paddingBottom = '0px';
                }
            });

            // Toggle current item
            header.classList.toggle('active');
            if (header.classList.contains('active')) {
                currentContent.style.maxHeight = currentContent.scrollHeight + 'px';
                currentContent.style.paddingBottom = '20px';
            } else {
                currentContent.style.maxHeight = 0;
                currentContent.style.paddingBottom = '0px';
            }
        });
    });

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight; // Get header height
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // -20 for a little extra space

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Basic Form Validation (Contact Page) ---
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Simple validation example
            const nameInput = this.querySelector('#name');
            const emailInput = this.querySelector('#email');
            const messageInput = this.querySelector('#message');

            if (nameInput.value.trim() === '') {
                alert('Please enter your name.');
                nameInput.focus();
                event.preventDefault();
                return;
            }

            if (emailInput.value.trim() === '' || !emailInput.value.includes('@')) {
                alert('Please enter a valid email address.');
                emailInput.focus();
                event.preventDefault();
                return;
            }

            if (messageInput.value.trim() === '') {
                alert('Please enter your message.');
                messageInput.focus();
                event.preventDefault();
                return;
            }

            // If validation passes, form would typically be submitted via AJAX or to a backend script
            alert('Thank you for your message! We will get back to you soon.');
            // event.preventDefault(); // Uncomment this line if you want to prevent actual submission for testing
            // this.reset(); // Uncomment to clear form after "submission"
        });
    }

    // --- Optional: Implement a basic image carousel for hero section (example using simple array and interval) ---
    // This is a very basic example. For a robust carousel, consider a library.
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const heroImages = [
            'images/hero-sunset.jpg', // Make sure these paths are correct
            'images/hero-boat-ocean.jpg', // Add more images here if you have them
            'images/hero-coastline.jpg'
        ];
        let currentImageIndex = 0;

        // Preload images (optional but good practice)
        heroImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });

        const updateHeroImage = () => {
            currentImageIndex = (currentImageIndex + 1) % heroImages.length;
            const imgElement = heroSection.querySelector('.hero-image img');
            if (imgElement) {
                imgElement.style.opacity = 0; // Fade out
                setTimeout(() => {
                    imgElement.src = heroImages[currentImageIndex];
                    imgElement.style.opacity = 0.6; // Fade in
                }, 500); // Wait for fade out before changing src and fading in
            }
        };

        // Uncomment the line below to activate the image carousel
        // setInterval(updateHeroImage, 7000); // Change image every 7 seconds
    }
});