// ============================================
// PROJECT MODAL COMPONENT
// Display project details with image carousel
// ============================================

class ProjectModal {
    constructor() {
        this.modal = null;
        this.currentProject = null;
        this.currentImageIndex = 0;
        this.projects = null;
        this.currentLang = 'en';

        this.init();
    }

    async init() {
        await this.loadProjects();
        this.createModal();
        this.attachEventListeners();

        // Listen for language changes
        document.addEventListener('languageChanged', (e) => {
            this.currentLang = e.detail.lang;
            if (this.currentProject) {
                this.updateModalContent();
            }
        });
    }

    async loadProjects() {
        try {
            const response = await fetch('/src/data/projects.json');
            const data = await response.json();
            this.projects = data.projects;
        } catch (error) {
            console.error('Failed to load projects:', error);
        }
    }

    createModal() {
        const modalHTML = `
      <div class="modal" id="projectModal">
        <div class="modal__backdrop"></div>
        <div class="modal__content">
          <button class="modal__close" aria-label="Close modal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div class="modal__body">
            <!-- Content will be dynamically inserted -->
          </div>
        </div>
      </div>
    `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('projectModal');
    }

    attachEventListeners() {
        // Close button
        const closeBtn = this.modal.querySelector('.modal__close');
        closeBtn.addEventListener('click', () => this.close());

        // Backdrop click
        const backdrop = this.modal.querySelector('.modal__backdrop');
        backdrop.addEventListener('click', () => this.close());

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });

        // Project card clicks
        document.addEventListener('click', (e) => {
            const projectCard = e.target.closest('[data-project-id]');
            if (projectCard) {
                const projectId = projectCard.dataset.projectId;
                this.open(projectId);
            }
        });
    }

    open(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        this.currentProject = project;
        this.currentImageIndex = 0;
        this.updateModalContent();
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.currentProject = null;
    }

    updateModalContent() {
        if (!this.currentProject) return;

        const lang = this.currentLang;
        const project = this.currentProject;

        const modalBody = this.modal.querySelector('.modal__body');

        const servicesHTML = project.services[lang]
            .map(service => `<li>${service}</li>`)
            .join('');

        const imagesHTML = project.images.length > 1
            ? `
        <div class="modal__carousel">
          <div class="modal__carousel-images">
            ${project.images.map((img, index) => `
              <img 
                src="${img}" 
                alt="${project.title[lang]}" 
                class="modal__carousel-image ${index === this.currentImageIndex ? 'active' : ''}"
              />
            `).join('')}
          </div>
          ${project.images.length > 1 ? `
            <button class="modal__carousel-btn modal__carousel-btn--prev" aria-label="Previous image">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button class="modal__carousel-btn modal__carousel-btn--next" aria-label="Next image">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
            <div class="modal__carousel-indicators">
              ${project.images.map((_, index) => `
                <button class="modal__carousel-indicator ${index === this.currentImageIndex ? 'active' : ''}" data-index="${index}"></button>
              `).join('')}
            </div>
          ` : ''}
        </div>
      `
            : `<img src="${project.images[0]}" alt="${project.title[lang]}" class="modal__single-image" />`;

        modalBody.innerHTML = `
      ${imagesHTML}
      <div class="modal__info">
        <div class="modal__meta">
          <span class="modal__type">${project.type[lang]}</span>
          <span class="modal__location">${project.location}</span>
          <span class="modal__year">${project.year}</span>
        </div>
        <h2 class="modal__title">${project.title[lang]}</h2>
        <p class="modal__description">${project.description[lang]}</p>
        <div class="modal__services">
          <h3>${lang === 'en' ? 'Services' : 'Servicios'}</h3>
          <ul>${servicesHTML}</ul>
        </div>
      </div>
    `;

        // Attach carousel event listeners if multiple images
        if (project.images.length > 1) {
            this.attachCarouselListeners();
        }
    }

    attachCarouselListeners() {
        const prevBtn = this.modal.querySelector('.modal__carousel-btn--prev');
        const nextBtn = this.modal.querySelector('.modal__carousel-btn--next');
        const indicators = this.modal.querySelectorAll('.modal__carousel-indicator');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousImage());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextImage());
        }

        indicators.forEach(indicator => {
            indicator.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.goToImage(index);
            });
        });

        // Keyboard navigation
        const keyHandler = (e) => {
            if (!this.modal.classList.contains('active')) return;
            if (e.key === 'ArrowLeft') this.previousImage();
            if (e.key === 'ArrowRight') this.nextImage();
        };

        document.addEventListener('keydown', keyHandler);
    }

    previousImage() {
        if (!this.currentProject) return;
        this.currentImageIndex = (this.currentImageIndex - 1 + this.currentProject.images.length) % this.currentProject.images.length;
        this.updateCarousel();
    }

    nextImage() {
        if (!this.currentProject) return;
        this.currentImageIndex = (this.currentImageIndex + 1) % this.currentProject.images.length;
        this.updateCarousel();
    }

    goToImage(index) {
        this.currentImageIndex = index;
        this.updateCarousel();
    }

    updateCarousel() {
        const images = this.modal.querySelectorAll('.modal__carousel-image');
        const indicators = this.modal.querySelectorAll('.modal__carousel-indicator');

        images.forEach((img, index) => {
            img.classList.toggle('active', index === this.currentImageIndex);
        });

        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentImageIndex);
        });
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.projectModal = new ProjectModal();
    });
} else {
    window.projectModal = new ProjectModal();
}
