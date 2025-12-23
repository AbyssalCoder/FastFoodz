// FastFoodz - UI Service

class UIService {
    constructor() {
        this.toastContainer = null;
        this.currentModal = null;
    }

    // Initialize UI service
    init() {
        this.createToastContainer();
        this.setupEventListeners();
    }

    // Create toast container
    createToastContainer() {
        if (!this.toastContainer) {
            this.toastContainer = document.createElement('div');
            this.toastContainer.className = 'toast-container';
            document.body.appendChild(this.toastContainer);
        }
    }

    // Show toast notification
    showToast(type, title, message, duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icons = {
            success: '✅',
            error: '❌',
            info: 'ℹ️',
            warning: '⚠️'
        };

        toast.innerHTML = `
      <div class="toast-icon">${icons[type] || 'ℹ️'}</div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
    `;

        this.toastContainer.appendChild(toast);

        // Auto remove after duration
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-in-out';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, duration);
    }

    // Show loading spinner
    showLoading(message = 'Loading...') {
        const loading = document.createElement('div');
        loading.id = 'loading-overlay';
        loading.innerHTML = `
      <div style="text-align: center;">
        <div class="spinner"></div>
        <p style="margin-top: 1rem; color: var(--text-secondary);">${message}</p>
      </div>
    `;
        loading.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    `;
        document.body.appendChild(loading);
    }

    // Hide loading spinner
    hideLoading() {
        const loading = document.getElementById('loading-overlay');
        if (loading) {
            loading.remove();
        }
    }

    // Show modal
    showModal(content, options = {}) {
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop open';
        backdrop.id = 'modal-backdrop';

        const modal = document.createElement('div');
        modal.className = 'modal';

        modal.innerHTML = `
      ${options.title ? `
        <div class="modal-header">
          <h2>${options.title}</h2>
        </div>
      ` : ''}
      <div class="modal-body">
        ${content}
      </div>
      ${options.footer ? `
        <div class="modal-footer">
          ${options.footer}
        </div>
      ` : ''}
    `;

        backdrop.appendChild(modal);
        document.body.appendChild(backdrop);

        // Close on backdrop click
        if (options.closeOnBackdrop !== false) {
            backdrop.addEventListener('click', (e) => {
                if (e.target === backdrop) {
                    this.closeModal();
                }
            });
        }

        this.currentModal = backdrop;
        return backdrop;
    }

    // Close modal
    closeModal() {
        if (this.currentModal) {
            this.currentModal.classList.remove('open');
            setTimeout(() => {
                this.currentModal.remove();
                this.currentModal = null;
            }, 300);
        }
    }

    // Show auth modal
    showAuthModal(mode = 'signin') {
        const content = `
      <div id="auth-modal-content">
        <div class="auth-tabs" style="display: flex; gap: 1rem; margin-bottom: 2rem;">
          <button class="btn btn-outline ${mode === 'signin' ? 'active' : ''}" onclick="window.uiService.switchAuthTab('signin')">Sign In</button>
          <button class="btn btn-outline ${mode === 'signup' ? 'active' : ''}" onclick="window.uiService.switchAuthTab('signup')">Sign Up</button>
        </div>
        
        <div id="signin-form" style="display: ${mode === 'signin' ? 'block' : 'none'};">
          <form onsubmit="window.uiService.handleSignIn(event)">
            <div class="input-group">
              <label class="input-label">Email</label>
              <input type="email" class="input" name="email" required placeholder="your@email.com">
            </div>
            <div class="input-group">
              <label class="input-label">Password</label>
              <input type="password" class="input" name="password" required placeholder="••••••••">
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">Sign In</button>
          </form>
          <div style="text-align: center; margin: 1.5rem 0;">
            <span style="color: var(--text-muted);">or</span>
          </div>
          <button class="btn btn-secondary" style="width: 100%;" onclick="window.authService.signInWithGoogle()">
            🔐 Continue with Google
          </button>
        </div>
        
        <div id="signup-form" style="display: ${mode === 'signup' ? 'block' : 'none'};">
          <form onsubmit="window.uiService.handleSignUp(event)">
            <div class="input-group">
              <label class="input-label">Name</label>
              <input type="text" class="input" name="name" required placeholder="Your Name">
            </div>
            <div class="input-group">
              <label class="input-label">Email</label>
              <input type="email" class="input" name="email" required placeholder="your@email.com">
            </div>
            <div class="input-group">
              <label class="input-label">Password</label>
              <input type="password" class="input" name="password" required placeholder="••••••••" minlength="6">
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">Sign Up</button>
          </form>
          <div style="text-align: center; margin: 1.5rem 0;">
            <span style="color: var(--text-muted);">or</span>
          </div>
          <button class="btn btn-secondary" style="width: 100%;" onclick="window.authService.signInWithGoogle()">
            🔐 Continue with Google
          </button>
        </div>
      </div>
    `;

        this.showModal(content, { title: 'Welcome to FastFoodz' });
    }

    // Switch auth tab
    switchAuthTab(tab) {
        document.getElementById('signin-form').style.display = tab === 'signin' ? 'block' : 'none';
        document.getElementById('signup-form').style.display = tab === 'signup' ? 'block' : 'none';
    }

    // Handle sign in
    async handleSignIn(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            await window.authService.signIn(email, password);
            this.closeModal();
        } catch (error) {
            // Error already handled in authService
        }
    }

    // Handle sign up
    async handleSignUp(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            await window.authService.signUp(email, password, name);
            this.closeModal();
        } catch (error) {
            // Error already handled in authService
        }
    }

    // Setup global event listeners
    setupEventListeners() {
        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentModal) {
                this.closeModal();
            }
        });
    }

    // Format currency
    formatCurrency(amount) {
        return `₹${amount.toFixed(2)}`;
    }

    // Format date
    formatDate(date) {
        if (!date) return '';
        const d = date.toDate ? date.toDate() : new Date(date);
        return d.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Debounce function for search
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Create global instance
window.uiService = new UIService();
