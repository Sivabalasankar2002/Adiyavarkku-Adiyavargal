document.addEventListener('DOMContentLoaded', () => {
    // ---------- Mobile menu toggle ----------
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const open = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            navToggle.innerHTML = open
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });
        // Close the menu after tapping a link (mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }

    // ---------- Language toggle ----------
    const langToggleBtn = document.getElementById('langToggle');
    const enElements = document.querySelectorAll('.lang-en');
    const taElements = document.querySelectorAll('.lang-ta');
    let currentLang = 'en';

    const toggleLanguage = () => {
        if (currentLang === 'en') {
            enElements.forEach(el => el.classList.add('hidden'));
            taElements.forEach(el => el.classList.remove('hidden'));
            currentLang = 'ta';
        } else {
            taElements.forEach(el => el.classList.add('hidden'));
            enElements.forEach(el => el.classList.remove('hidden'));
            currentLang = 'en';
        }
        document.documentElement.lang = currentLang;
    };

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', toggleLanguage);
        toggleLanguage(); // Trigger toggle to make Tamil the default on load
    }

    // ---------- Sticky navbar shadow ----------
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        navbar.style.boxShadow = window.scrollY > 50
            ? '0 4px 20px rgba(0,0,0,0.06)'
            : '0 2px 10px rgba(0,0,0,0.02)';
    });

    // ---------- Counter animation (triggers once when in view) ----------
    const counters = document.querySelectorAll('.counter');
    const runCounter = (counter) => {
        if (counter.dataset.done) return;
        counter.dataset.done = 'true';
        const target = +counter.getAttribute('data-target');
        const duration = 1800;
        const start = performance.now();
        const step = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const val = Math.floor(p * target);
            counter.innerText = val.toLocaleString('en-IN');
            if (p < 1) {
                requestAnimationFrame(step);
            } else {
                counter.innerText = target.toLocaleString('en-IN') + '+';
            }
        };
        requestAnimationFrame(step);
    };

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) runCounter(e.target); });
        }, { threshold: 0.4 });
        counters.forEach(c => io.observe(c));
    } else {
        counters.forEach(runCounter);
    }

    // ---------- Blessing burst on portrait tap ----------
    const divine = document.getElementById('divineAnimation');
    if (divine) {
        divine.style.cursor = 'pointer';
        divine.addEventListener('click', function () {
            const burst = document.createElement('span');
            burst.className = 'blessing-burst';
            this.appendChild(burst);
            setTimeout(() => burst.remove(), 800);
        });
    }
});
