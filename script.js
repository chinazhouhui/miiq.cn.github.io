document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initContactForm();
    initScrollAnimations();
    initStatsCounter();
});

function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section[id]');

    const closeMenu = () => {
        if (!navMenu || !menuToggle) return;
        navMenu.classList.remove('menu-open');
        menuToggle.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', '打开菜单');
        document.body.classList.remove('menu-open');
    };

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || !href.startsWith('#')) return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = navbar ? navbar.offsetHeight : 0;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
            closeMenu();
        });
    });

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('menu-open');
            menuToggle.classList.toggle('menu-open', isOpen);
            document.body.classList.toggle('menu-open', isOpen);
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            menuToggle.setAttribute('aria-label', isOpen ? '关闭菜单' : '打开菜单');
        });
    }

    const updateNavbar = () => {
        if (navbar) {
            navbar.classList.toggle('navbar-scrolled', window.scrollY > 50);
        }

        const scrollPos = window.scrollY + (navbar ? navbar.offsetHeight + 80 : 100);
        let currentId = 'hero';

        sections.forEach(section => {
            if (section.offsetTop <= scrollPos) {
                currentId = section.id;
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === `#${currentId}`);
        });
    };

    window.addEventListener('scroll', debounce(updateNavbar, 10), { passive: true });
    updateNavbar();
}

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!this.checkValidity()) {
            this.reportValidity();
            return;
        }

        showNotification('感谢您的消息！我们将尽快联系您。', 'success');
        this.reset();
    });
}

function initScrollAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    document.querySelectorAll('.product-card, .feature-item, .contact-item, .stat-card').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;

    const animateValue = (el) => {
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const duration = 1500;
        const start = performance.now();

        const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = target * eased;

            if (decimals > 0) {
                el.textContent = value.toFixed(decimals) + suffix;
            } else if (target >= 1000) {
                el.textContent = Math.floor(value).toLocaleString('zh-CN') + suffix;
            } else {
                el.textContent = Math.floor(value) + suffix;
            }

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => observer.observe(el));
}

function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'alert');
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('notification-leaving');
        notification.addEventListener('animationend', () => notification.remove(), { once: true });
    }, 3000);
}

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
