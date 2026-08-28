document.addEventListener('DOMContentLoaded', () => {

    /* Mobile menu toggle */
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
            });
        });
    }

    /* Reveal service cards as they scroll into view, staggered */
    const cards = document.querySelectorAll('.service-card');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Array.from(cards).indexOf(entry.target);
                    setTimeout(() => entry.target.classList.add('is-visible'), (index % 3) * 90);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });

        cards.forEach(card => observer.observe(card));
    } else {
        cards.forEach(card => card.classList.add('is-visible'));
    }

});