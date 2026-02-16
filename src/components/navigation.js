// ============================================
// NAVIGATION COMPONENT
// Sticky header, mobile menu, smooth scrolling
// ============================================

class Navigation {
    constructor() {
        this.nav = document.querySelector('.nav');
        this.mobileToggle = document.querySelector('.nav__toggle');
        this.mobileMenu = document.querySelector('.nav__mobile');
        this.navLinks = document.querySelectorAll('.nav__link, .nav__mobile-link');

        this.init();
    }

    init() {
        this.handleScroll();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.highlightActiveSection();

        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('scroll', () => this.highlightActiveSection());
    }

    // Handle sticky navigation on scroll
    handleScroll() {
        if (!this.nav) return;

        if (window.scrollY > 100) {
            this.nav.classList.add('scrolled');
        } else {
            this.nav.classList.remove('scrolled');
        }
    }

    // Setup mobile menu toggle
    setupMobileMenu() {
        if (!this.mobileToggle || !this.mobileMenu) return;

        this.mobileToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.mobileMenu.contains(e.target) && !this.mobileToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Close menu when clicking a link
        const mobileLinks = this.mobileMenu.querySelectorAll('.nav__mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
    }

    toggleMobileMenu() {
        this.mobileToggle.classList.toggle('active');
        this.mobileMenu.classList.toggle('active');
        document.body.style.overflow = this.mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    closeMobileMenu() {
        this.mobileToggle.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Setup smooth scrolling for anchor links
    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // Only handle anchor links (starting with #)
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetSection = document.getElementById(targetId);

                    if (targetSection) {
                        const navHeight = this.nav ? this.nav.offsetHeight : 0;
                        const targetPosition = targetSection.offsetTop - navHeight;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // Highlight active section in navigation
    highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navHeight = this.nav ? this.nav.offsetHeight : 0;
        const scrollPosition = window.scrollY + navHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                this.navLinks.forEach(link => link.classList.remove('active'));

                // Add active class to current section link
                const activeLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.navigation = new Navigation();
    });
} else {
    window.navigation = new Navigation();
}
