document.addEventListener("DOMContentLoaded", function () {

    const counters = document.querySelectorAll(".stat-num");

    counters.forEach(counter => {

        const target = Number(counter.dataset.target);
        const suffix = counter.dataset.suffix || "";

        let count = 0;

        const speed = target / 100;

        function updateCounter(){

            count += speed;

            if(count < target){

                counter.innerHTML =
                    Math.floor(count).toLocaleString() + suffix;

                requestAnimationFrame(updateCounter);

            }else{

                counter.innerHTML =
                    target.toLocaleString() + suffix;

            }

        }

        updateCounter();

    });

});
document.addEventListener("DOMContentLoaded", function () {

    const counters = document.querySelectorAll(".stat-num");

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                const counter = entry.target;

                const target = Number(counter.dataset.target);
                const suffix = counter.dataset.suffix || "";

                let count = 0;

                const speed = target / 100;

                function updateCounter(){

                    count += speed;

                    if(count < target){

                        counter.innerHTML =
                        Math.floor(count).toLocaleString() + suffix;

                        requestAnimationFrame(updateCounter);

                    }else{

                        counter.innerHTML =
                        target.toLocaleString() + suffix;

                    }

                }

                updateCounter();

                observer.unobserve(counter);

            }

        });

    },{threshold:0.5});

    counters.forEach(counter=>{
        observer.observe(counter);
    });

});
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

    /* Animated stat counters, triggered once when the strip scrolls into view */
    const statNums = document.querySelectorAll('.stat-card__num');

    const animateCount = (el) => {
        const target = parseInt(el.dataset.count, 10);
        const duration = 1400;
        const start = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target);
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    if ('IntersectionObserver' in window && statNums.length) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.6 });

        statNums.forEach(num => statsObserver.observe(num));
    } else {
        statNums.forEach(num => { num.textContent = num.dataset.count; });
    }

    /* Gentle reveal for why-cards and featured-cards */
    const revealTargets = document.querySelectorAll('.why-card, .why-feature, .featured-card, .process-step');

    if ('IntersectionObserver' in window) {
        revealTargets.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(18px)';
            el.style.transition = 'opacity .6s ease, transform .6s ease';
        });

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, i * 60);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealTargets.forEach(el => revealObserver.observe(el));
    }

});
/* =============================================================
   EcoFert Agri Solutions — "Life on the Farm" Gallery Section
   gallery.js
   Plain JavaScript only — no frameworks or libraries.
   ============================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------------------------------------------------------
       1. LAZY LOAD IMAGES
       Each <img> stores its real source in data-src. We only
       set img.src once the card scrolls near the viewport, and
       fade it in once it finishes loading (the CSS shimmer
       skeleton shows underneath until then).
       --------------------------------------------------------- */
    const lazyImages = document.querySelectorAll('.gallery-img[data-src]');

    const lazyLoad = (img) => {
        img.src = img.dataset.src;
        img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
    };

    if ('IntersectionObserver' in window) {
        const lazyObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    lazyLoad(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '200px 0px' }); // start loading a little before it's on screen

        lazyImages.forEach(img => lazyObserver.observe(img));
    } else {
        // fallback for very old browsers: just load everything immediately
        lazyImages.forEach(lazyLoad);
    }

    /* ---------------------------------------------------------
       2. SCROLL-REVEAL ANIMATION
       Each .gallery-item fades in and moves up as it enters the
       viewport. A small stagger (based on its position in the
       grid) makes them appear one after another instead of all
       at once.
       --------------------------------------------------------- */
    const galleryItems = document.querySelectorAll('.gallery-item');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(galleryItems).indexOf(entry.target);
                const delay = (index % 4) * 120; // stagger by column position
                entry.target.style.transitionDelay = `${delay}ms`;
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    galleryItems.forEach(item => revealObserver.observe(item));

    /* ---------------------------------------------------------
       3. LIGHTBOX
       --------------------------------------------------------- */
    const lightbox        = document.getElementById('lightbox');
    const lightboxImg     = document.getElementById('lightboxImg');
    const lightboxTitle   = document.getElementById('lightboxTitle');
    const lightboxDesc    = document.getElementById('lightboxDesc');
    const lightboxClose   = document.getElementById('lightboxClose');
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxPrev    = document.getElementById('lightboxPrev');
    const lightboxNext    = document.getElementById('lightboxNext');

    // Build a simple array of { src, title, desc } from every gallery card
    // so Prev/Next can move through them in order.
    const items = Array.from(galleryItems).map(item => ({
        src: item.querySelector('.gallery-img').dataset.src,
        title: item.dataset.title,
        desc: item.dataset.desc
    }));

    let currentIndex = 0;

    const openLightbox = (index) => {
        currentIndex = index;
        updateLightboxContent();
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // lock background scroll
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    const updateLightboxContent = () => {
        const data = items[currentIndex];
        lightboxImg.src = data.src;
        lightboxImg.alt = data.title;
        lightboxTitle.textContent = data.title;
        lightboxDesc.textContent = data.desc;
    };

    const showNext = () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateLightboxContent();
    };

    const showPrev = () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateLightboxContent();
    };

    // Open lightbox when a gallery card is clicked
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    // Close button
    lightboxClose.addEventListener('click', closeLightbox);

    // Click outside the image (on the dark overlay) closes it
    lightboxOverlay.addEventListener('click', closeLightbox);

    // Prev / Next buttons
    lightboxNext.addEventListener('click', showNext);
    lightboxPrev.addEventListener('click', showPrev);

    // Keyboard support: ESC to close, arrow keys to navigate
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });

    /* ---------------------------------------------------------
       4. "VIEW COMPLETE GALLERY" BUTTON
       Opens the lightbox starting from the first image — swap
       this out for a link to a full gallery page if you build one.
       --------------------------------------------------------- */
    const viewGalleryBtn = document.getElementById('viewGalleryBtn');
    if (viewGalleryBtn) {
        viewGalleryBtn.addEventListener('click', () => openLightbox(0));
    }

});