document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for CTA button
    document.querySelector('.cta-button').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Intersection Observer for scroll-reveal animations
    const revealElements = document.querySelectorAll('.reveal-item');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // 20% of item visible to trigger
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });

    // Falling hearts/petals effect
    const fallingElementsContainer = document.querySelector('.falling-elements');
    const numElements = 25; // Number of falling hearts/petals

    function createFallingElement() {
        const element = document.createElement('div');
        element.classList.add('falling-element');

        // Randomly choose between heart or petal shape
        if (Math.random() > 0.5) {
            element.classList.add('heart');
            element.style.width = element.style.height = `${Math.random() * 15 + 10}px`; // 10-25px
        } else {
            // Simple circle for a petal-like effect
            element.style.width = element.style.height = `${Math.random() * 12 + 8}px`; // 8-20px
            element.style.borderRadius = '50% 20% 50% 20%'; // Slightly irregular for petal
            element.style.backgroundColor = `hsl(${Math.random() * 10 + 340}, 80%, 85%)`; // Pinkish-red hues
        }


        element.style.left = `${Math.random() * 100}vw`; // Random horizontal position
        element.style.animationDuration = `${Math.random() * 5 + 5}s`; // 5-10s fall time
        element.style.animationDelay = `${Math.random() * numElements * 0.1}s`; // Staggered start
        element.style.opacity = 0.7 + Math.random() * 0.3; // Slight opacity variation

        // Random rotation for natural fall
        element.style.setProperty('--rotation-start', `${Math.random() * 360}deg`);
        element.style.setProperty('--rotation-end', `${Math.random() * 720 + 360}deg`); // More rotation over time

        fallingElementsContainer.appendChild(element);

        // Remove element after it falls off screen to prevent memory issues
        element.addEventListener('animationend', () => {
            element.remove();
            // Recreate to keep the effect continuous
            createFallingElement();
        });
    }

    for (let i = 0; i < numElements; i++) {
        createFallingElement();
    }
});
