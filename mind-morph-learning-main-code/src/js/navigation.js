// Navigation JavaScript for Mind Morph Learning Platform

// Navigation state
let navigationState = {
    currentPage: 'home',
    previousPage: null,
    history: []
};

// Initialize navigation
function initNavigation() {
    console.log('Initializing navigation...');
    
    // Set up navigation event listeners
    setupNavigationListeners();
    
    // Handle initial page load
    handleInitialPageLoad();
    
    // Set up browser back/forward button handling
    setupBrowserNavigation();
}

// Set up navigation event listeners
function setupNavigationListeners() {
    // Handle navigation link clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPage = this.getAttribute('href').substring(1);
            navigateToPage(targetPage);
            
            // Update URL without page reload
            updateURL(targetPage);
        });
    });
    
    // Handle module card clicks
    document.querySelectorAll('.module-card').forEach(card => {
        card.addEventListener('click', function() {
            const moduleId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            navigateToPage(moduleId);
            updateURL(moduleId);
        });
    });
}

// Handle initial page load
function handleInitialPageLoad() {
    // Check if there's a hash in the URL
    const hash = window.location.hash.substring(1);
    
    if (hash && isValidPage(hash)) {
        navigationState.currentPage = hash;
        showPage(hash);
        updateNavigation(hash);
    } else {
        // Default to home page
        navigationState.currentPage = 'home';
        showPage('home');
        updateNavigation('home');
    }
    
    // Add to history
    addToHistory(navigationState.currentPage);
}

// Set up browser navigation (back/forward buttons)
function setupBrowserNavigation() {
    window.addEventListener('popstate', function(event) {
        const page = event.state ? event.state.page : 'home';
        if (isValidPage(page)) {
            navigateToPage(page);
            updateNavigation(page);
        }
    });
}

// Update URL without page reload
function updateURL(page) {
    const url = new URL(window.location);
    url.hash = page;
    window.history.pushState({ page: page }, '', url);
}

// Navigate to a specific page
function navigateToPage(pageId) {
    if (!isValidPage(pageId)) {
        console.error('Invalid page:', pageId);
        return;
    }
    
    // Store previous page
    navigationState.previousPage = navigationState.currentPage;
    navigationState.currentPage = pageId;
    
    // Hide all pages
    hideAllPages();
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Add entrance animation
        targetPage.style.opacity = '0';
        targetPage.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            targetPage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            targetPage.style.opacity = '1';
            targetPage.style.transform = 'translateY(0)';
        }, 50);
        
        // Update navigation state
        updateNavigation(pageId);
        
        // Add to history
        addToHistory(pageId);
        
        // Update URL
        updateURL(pageId);
        
        // Initialize page-specific features
        initializePageFeatures(pageId);
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        console.log(`Navigated to: ${pageId}`);
    } else {
        console.error(`Page element not found: ${pageId}`);
    }
}

// Hide all pages
function hideAllPages() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        page.style.transition = 'none';
        page.style.opacity = '0';
        page.style.transform = 'translateY(20px)';
    });
}

// Update navigation UI
function updateNavigation(activePage) {
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current page link
    const activeLink = document.querySelector(`[href="#${activePage}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Update page title
    updatePageTitle(activePage);
}

// Update page title
function updatePageTitle(pageId) {
    const titles = {
        'home': 'Mind Morph Learning - Home',
        'math': 'Mind Morph Learning - Mathematics',
        'science': 'Mind Morph Learning - Science',
        'english': 'Mind Morph Learning - English',
        'life-skills': 'Mind Morph Learning - Life Skills'
    };
    
    const title = titles[pageId] || 'Mind Morph Learning';
    document.title = title;
}

// Initialize page-specific features
function initializePageFeatures(pageId) {
    switch (pageId) {
        case 'home':
            initializeHomePage();
            break;
        case 'math':
            initializeMathPage();
            break;
        case 'science':
            initializeSciencePage();
            break;
        case 'english':
            initializeEnglishPage();
            break;
        case 'life-skills':
            initializeLifeSkillsPage();
            break;
        default:
            break;
    }
}

// Page-specific initialization functions
function initializeHomePage() {
    // Add scroll animations to home page elements
    const elements = document.querySelectorAll('#home .module-card, #home .hero-section');
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        el.classList.add('scroll-reveal');
    });
}

function initializeMathPage() {
    // Initialize calculator
    if (typeof initCalculator === 'function') {
        initCalculator();
    }
}

function initializeSciencePage() {
    // Initialize gravity simulator
    if (typeof initGravitySimulator === 'function') {
        initGravitySimulator();
    }
}

function initializeEnglishPage() {
    // Initialize vocabulary game
    if (typeof initVocabGame === 'function') {
        initVocabGame();
    }
}

function initializeLifeSkillsPage() {
    // Initialize timer
    if (typeof initTimer === 'function') {
        initTimer();
    }
}

// Navigation history management
function addToHistory(pageId) {
    navigationState.history.push(pageId);
    
    // Keep only last 10 entries
    if (navigationState.history.length > 10) {
        navigationState.history.shift();
    }
}

function getPreviousPage() {
    return navigationState.previousPage;
}

function goBack() {
    if (navigationState.previousPage) {
        navigateToPage(navigationState.previousPage);
    }
}

// Navigation utility functions
function isValidPage(pageId) {
    const validPages = ['home', 'math', 'science', 'english', 'life-skills'];
    return validPages.includes(pageId);
}

function getCurrentPage() {
    return navigationState.currentPage;
}

function getNavigationHistory() {
    return [...navigationState.history];
}

// Breadcrumb navigation
function updateBreadcrumbs(pageId) {
    const breadcrumbs = {
        'home': ['Home'],
        'math': ['Home', 'Mathematics'],
        'science': ['Home', 'Science'],
        'english': ['Home', 'English'],
        'life-skills': ['Home', 'Life Skills']
    };
    
    const breadcrumbData = breadcrumbs[pageId] || ['Home'];
    
    // Create breadcrumb element if it doesn't exist
    let breadcrumbElement = document.querySelector('.breadcrumb');
    if (!breadcrumbElement) {
        breadcrumbElement = document.createElement('nav');
        breadcrumbElement.className = 'breadcrumb';
        breadcrumbElement.setAttribute('aria-label', 'Breadcrumb');
        
        // Insert after navbar
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.parentNode.insertBefore(breadcrumbElement, navbar.nextSibling);
        }
    }
    
    // Update breadcrumb content
    breadcrumbElement.innerHTML = breadcrumbData.map((item, index) => {
        if (index === breadcrumbData.length - 1) {
            return `<span class="breadcrumb-item active" aria-current="page">${item}</span>`;
        } else {
            return `<a href="#" class="breadcrumb-item" onclick="navigateToPage('${index === 0 ? 'home' : breadcrumbData[index].toLowerCase()}')">${item}</a>`;
        }
    }).join(' / ');
}

// Deep linking support
function handleDeepLink() {
    const hash = window.location.hash.substring(1);
    if (hash && isValidPage(hash)) {
        navigateToPage(hash);
    }
}

// Navigation analytics
function trackNavigation(fromPage, toPage) {
    // Track navigation for analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: toPage,
            page_location: window.location.href
        });
    }
    
    // Store in localStorage for basic analytics
    const navigationData = JSON.parse(localStorage.getItem('navigationAnalytics') || '{}');
    const today = new Date().toDateString();
    
    if (!navigationData[today]) {
        navigationData[today] = {};
    }
    
    if (!navigationData[today][toPage]) {
        navigationData[today][toPage] = 0;
    }
    
    navigationData[today][toPage]++;
    localStorage.setItem('navigationAnalytics', JSON.stringify(navigationData));
}

// Export navigation functions
window.Navigation = {
    navigateToPage,
    getCurrentPage,
    getPreviousPage,
    goBack,
    getNavigationHistory,
    updateBreadcrumbs,
    handleDeepLink,
    trackNavigation
};
