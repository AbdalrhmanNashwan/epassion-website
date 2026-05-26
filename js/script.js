// EPASSION WEBSITE INTERACTIONS
(function () {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.addEventListener('DOMContentLoaded', function () {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const navItems = document.querySelectorAll('.nav-link');

        if (hamburger && navLinks) {
            hamburger.addEventListener('click', function () {
                const isOpen = document.body.classList.toggle('nav-open');
                hamburger.setAttribute('aria-expanded', String(isOpen));
            });

            navItems.forEach(function (link) {
                link.addEventListener('click', function () {
                    document.body.classList.remove('nav-open');
                    hamburger.setAttribute('aria-expanded', 'false');
                });
            });
        }

        // Smooth scroll for same-page anchor links only.
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                const href = anchor.getAttribute('href');
                if (!href || href === '#') return;

                try {
                    const target = document.querySelector(href);
                    if (!target) return;

                    e.preventDefault();
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({
                        top: elementPosition - headerOffset,
                        behavior: prefersReducedMotion ? 'auto' : 'smooth'
                    });
                } catch (error) {
                    // Ignore invalid selectors instead of breaking the UI.
                }
            });
        });
    });

    // Active link update on the home page.
    window.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-link[href^="#"]');
        if (!sections.length || !navItems.length) return;

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - 110;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                navItems.forEach(function (link) {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + sectionId);
                });
            }
        });
    });

    // Lightweight parallax for hero blobs, disabled for reduced motion users.
    if (!prefersReducedMotion) {
        let ticking = false;
        window.addEventListener('scroll', function () {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(function () {
                const blobs = document.querySelectorAll('.blob');
                const scrollY = window.scrollY;
                blobs.forEach(function (blob, index) {
                    const speed = 0.08 + (index * 0.03);
                    blob.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
                });
                ticking = false;
            });
        });
    }

    console.log('%c✨ Epassion', 'color: #1E88E5; font-size: 16px; font-weight: bold;');
    console.log('%cWebsite loaded successfully!', 'color: #42A5F5; font-size: 12px;');
}());
