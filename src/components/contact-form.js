// ============================================
// CONTACT FORM COMPONENT
// Form validation, submission, WhatsApp integration
// ============================================

class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.whatsappBtn = document.querySelector('[data-whatsapp]');
        this.whatsappNumber = '+34600000000'; // PLACEHOLDER - Update with real number

        if (this.form) {
            this.init();
        }

        if (this.whatsappBtn) {
            this.setupWhatsApp();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }

    setupWhatsApp() {
        this.whatsappBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.openWhatsApp();
        });
    }

    openWhatsApp() {
        const lang = window.languageSwitcher ? window.languageSwitcher.getCurrentLanguage() : 'en';

        const messages = {
            en: 'Hello Meryem, I would like to discuss a design project.',
            es: 'Hola Meryem, me gustaría discutir un proyecto de diseño.'
        };

        const message = encodeURIComponent(messages[lang]);
        const whatsappURL = `https://wa.me/${this.whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`;

        window.open(whatsappURL, '_blank');
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Clear previous error
        this.clearError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = field.dataset.errorRequired || 'This field is required';
        }

        // Email validation
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = field.dataset.errorEmail || 'Please enter a valid email address';
            }
        }

        // Phone validation (optional but if provided, should be valid)
        if (fieldName === 'phone' && value) {
            const phoneRegex = /^[\d\s\+\-\(\)]+$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = field.dataset.errorPhone || 'Please enter a valid phone number';
            }
        }

        if (!isValid) {
            this.showError(field, errorMessage);
        }

        return isValid;
    }

    showError(field, message) {
        field.classList.add('error');

        const errorElement = document.createElement('span');
        errorElement.className = 'form-error';
        errorElement.textContent = message;

        field.parentNode.appendChild(errorElement);
    }

    clearError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.form-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Validate all fields
        const inputs = this.form.querySelectorAll('input[required], textarea[required], select[required]');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            return;
        }

        // Get form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());

        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = submitBtn.dataset.sending || 'Sending...';

        try {
            // PLACEHOLDER: Replace with actual form submission endpoint
            // For now, simulate submission
            await this.simulateSubmission(data);

            this.showSuccess();
            this.form.reset();
        } catch (error) {
            this.showFormError();
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }

    async simulateSubmission(data) {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form submitted:', data);
                resolve();
            }, 1500);
        });
    }

    showSuccess() {
        const lang = window.languageSwitcher ? window.languageSwitcher.getCurrentLanguage() : 'en';
        const messages = {
            en: 'Thank you! I\'ll get back to you soon.',
            es: '¡Gracias! Te responderé pronto.'
        };

        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.style.cssText = 'padding: 1rem; background: var(--color-success); color: white; border-radius: var(--radius-sm); margin-top: 1rem; text-align: center;';
        successMessage.textContent = messages[lang];

        this.form.appendChild(successMessage);

        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }

    showFormError() {
        const lang = window.languageSwitcher ? window.languageSwitcher.getCurrentLanguage() : 'en';
        const messages = {
            en: 'Something went wrong. Please try WhatsApp or email directly.',
            es: 'Algo salió mal. Por favor, intenta por WhatsApp o email directamente.'
        };

        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-error';
        errorMessage.style.cssText = 'padding: 1rem; background: var(--color-error); color: white; border-radius: var(--radius-sm); margin-top: 1rem; text-align: center;';
        errorMessage.textContent = messages[lang];

        this.form.appendChild(errorMessage);

        setTimeout(() => {
            errorMessage.remove();
        }, 5000);
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.contactForm = new ContactForm();
    });
} else {
    window.contactForm = new ContactForm();
}
