// SP Kabaddi Group - Main JavaScript File

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle for mobile
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Close the mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    });

    // Animation on scroll
    const animateElements = document.querySelectorAll('.animate');

    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;

        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('show');
            } else {
                element.classList.remove('show');
            }
        });
    }

    // Check for animations on initial load
    checkScroll();

    // Check for animations on scroll
    window.addEventListener('scroll', checkScroll);

    // Registration form validation
    const registrationForm = document.querySelector('#registration-form');

    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form fields
            const nameInput = document.querySelector('#name');
            const emailInput = document.querySelector('#email');
            const phoneInput = document.querySelector('#phone');
            const roleInput = document.querySelector('#role');

            // Reset error messages
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(msg => {
                msg.style.display = 'none';
            });

            // Validate name
            if (!nameInput.value.trim()) {
                document.querySelector('#name-error').style.display = 'block';
                nameInput.focus();
                return false;
            }

            // Validate email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value)) {
                document.querySelector('#email-error').style.display = 'block';
                emailInput.focus();
                return false;
            }

            // Validate phone (optional validation)
            if (phoneInput.value.trim()) {
                const phonePattern = /^\d{10}$/; // Simple 10-digit validation
                if (!phonePattern.test(phoneInput.value.replace(/\D/g, ''))) {
                    document.querySelector('#phone-error').style.display = 'block';
                    phoneInput.focus();
                    return false;
                }
            }

            // Validate role selection
            if (roleInput.value === '') {
                document.querySelector('#role-error').style.display = 'block';
                roleInput.focus();
                return false;
            }

            // If all validations pass, show success message
            const formContainer = document.querySelector('.form-container');
            formContainer.innerHTML = `
                <div class="success-message">
                    <h2>Registration Successful!</h2>
                    <p>Thank you for registering with SP Kabaddi Group. We'll contact you shortly.</p>
                    <button class="btn btn-primary" onclick="window.location.href='/'">Back to Home</button>
                </div>
            `;

            return false;
        });
    }

    // Dynamic video loading for videos page
    function loadVideos() {
        const videosContainer = document.querySelector('.videos-grid');
        if (!videosContainer) return;

        // Sample video data - in a real project, this might come from an API or database
        const videos = [
            {
                id: 'uR8Mrt1IpXg',
                title: 'Pro Kabaddi Highlights',
                description: 'Watch the highlights from the latest Pro Kabaddi League match.'
            },
            {
                id: 'LYLtDYfX2-4',
                title: 'Kabaddi Skills and Techniques',
                description: 'Learn the essential skills and techniques required for Kabaddi.'
            },
            {
                id: '0alSSdJJ7hY',
                title: 'Kabaddi Training Session',
                description: 'A training session demonstrating key exercises for Kabaddi players.'
            },
            {
                id: 'd0gjSKLX8Ng',
                title: 'Kabaddi Championship Final',
                description: 'The thrilling final match of the recent Kabaddi championship.'
            },
            {
                id: 'g7B4RRJ7_2E',
                title: 'Kabaddi Rules Explained',
                description: 'A comprehensive guide to understanding the rules of Kabaddi.'
            },
            {
                id: 'M_h2jC8wfI0',
                title: 'Kabaddi Defensive Strategies',
                description: 'Learn effective defensive strategies for Kabaddi matches.'
            }
        ];

        // Create video cards and add to the container
        videos.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.className = 'video-card animate';

            videoCard.innerHTML = `
                <div class="video-container">
                    <iframe src="https://www.youtube.com/embed/${video.id}" title="${video.title}"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
                </div>
                <div class="video-info">
                    <h3>${video.title}</h3>
                    <p>${video.description}</p>
                </div>
            `;

            videosContainer.appendChild(videoCard);
        });
    }

    // Load videos if on the videos page
    loadVideos();

    // Gallery image modal functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modalContainer = document.querySelector('.modal-container');

    if (galleryItems.length > 0 && modalContainer) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                const imgTitle = this.querySelector('h3').textContent;

                const modalContent = `
                    <div class="modal-content">
                        <span class="close-modal">&times;</span>
                        <img src="${imgSrc}" alt="${imgTitle}">
                        <h3>${imgTitle}</h3>
                    </div>
                `;

                modalContainer.innerHTML = modalContent;
                modalContainer.style.display = 'flex';

                // Close modal functionality
                const closeModal = document.querySelector('.close-modal');
                closeModal.addEventListener('click', function() {
                    modalContainer.style.display = 'none';
                });

                // Close modal when clicking outside the image
                modalContainer.addEventListener('click', function(e) {
                    if (e.target === modalContainer) {
                        modalContainer.style.display = 'none';
                    }
                });
            });
        });
    }
});
