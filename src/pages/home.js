// ============================================
// HOME PAGE SCRIPT
// Load and display projects
// ============================================

class HomePage {
    constructor() {
        this.projects = null;
        this.currentLang = 'en';
        this.init();
    }

    async init() {
        await this.loadProjects();
        this.renderFeaturedProjects();

        // Listen for language changes
        document.addEventListener('languageChanged', (e) => {
            this.currentLang = e.detail.lang;
            this.renderFeaturedProjects();
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

    renderFeaturedProjects() {
        if (!this.projects) return;

        const projectsGrid = document.getElementById('projectsGrid');
        if (!projectsGrid) return;

        // Get featured projects or first 6
        const featuredProjects = this.projects.filter(p => p.featured).slice(0, 6);
        const projectsToShow = featuredProjects.length > 0 ? featuredProjects : this.projects.slice(0, 6);

        projectsGrid.innerHTML = projectsToShow.map(project => this.createProjectCard(project)).join('');
    }

    createProjectCard(project) {
        const lang = this.currentLang;

        // Create gradient placeholder since images aren't available
        const gradientColors = [
            'linear-gradient(135deg, #E8DCC8, #C9A88A)',
            'linear-gradient(135deg, #C9A88A, #8B7E74)',
            'linear-gradient(135deg, #A8B5A0, #E8DCC8)',
            'linear-gradient(135deg, #8B7E74, #A8B5A0)'
        ];
        const randomGradient = gradientColors[Math.floor(Math.random() * gradientColors.length)];

        return `
      <div class="project-card" data-project-id="${project.id}">
        <div class="project-card__image" style="background: ${randomGradient};"></div>
        <div class="project-card__overlay">
          <h3 class="project-card__title">${project.title[lang]}</h3>
          <p class="project-card__meta">
            ${project.type[lang]} • ${project.location} • ${project.year}
          </p>
        </div>
      </div>
    `;
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.homePage = new HomePage();
    });
} else {
    window.homePage = new HomePage();
}
