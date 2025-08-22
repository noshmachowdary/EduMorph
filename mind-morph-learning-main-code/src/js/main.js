// Main JavaScript file for Mind Morph Learning Platform

// Global variables
let currentPage = 'home';
let isFocusMode = false;
let notifications = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mind Morph Learning Platform initialized');
    
    // Initialize all modules
    initNavigation();
    initFocusTracker();
    initModules();
    initScrollAnimations();
    initMobileMenu();
    
    // Show home page by default
    showPage('home');
    
    // Add global event listeners
    addGlobalEventListeners();
    
    // Initialize focus tracker
    showFocusTracker();
});

// Global event listeners
function addGlobalEventListeners() {
    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    // Handle keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Handle page visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Handle beforeunload for saving data
    window.addEventListener('beforeunload', saveUserData);
}

// Handle window resize
function handleResize() {
    // Adjust focus tracker position on mobile
    const focusTracker = document.getElementById('focus-tracker');
    if (window.innerWidth <= 768) {
        focusTracker.style.width = 'calc(100vw - 2rem)';
        focusTracker.style.right = '1rem';
        focusTracker.style.bottom = '1rem';
    } else {
        focusTracker.style.width = '300px';
        focusTracker.style.right = '2rem';
        focusTracker.style.bottom = '2rem';
    }
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(event) {
    // Ctrl/Cmd + K to toggle focus tracker
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        toggleFocusTracker();
    }
    
    // Escape to close focus tracker
    if (event.key === 'Escape') {
        hideFocusTracker();
    }
    
    // Number keys for quick navigation
    if (event.key >= '1' && event.key <= '4') {
        const pages = ['home', 'math', 'science', 'english'];
        const pageIndex = parseInt(event.key) - 1;
        if (pages[pageIndex]) {
            navigateToPage(pages[pageIndex]);
        }
    }
}

// Handle page visibility change
function handleVisibilityChange() {
    if (document.hidden) {
        // Page is hidden, pause any active timers
        pauseAllTimers();
    } else {
        // Page is visible again, resume if needed
        resumeTimers();
    }
}

// Save user data before page unload
function saveUserData() {
    const userData = {
        currentPage: currentPage,
        focusTime: getFocusTime(),
        lastVisit: new Date().toISOString()
    };
    
    localStorage.setItem('mindMorphUserData', JSON.stringify(userData));
}

// Load user data
function loadUserData() {
    const savedData = localStorage.getItem('mindMorphUserData');
    if (savedData) {
        try {
            const userData = JSON.parse(savedData);
            currentPage = userData.currentPage || 'home';
            return userData;
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    }
    return null;
}

// Utility functions
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after duration
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, duration);
    
    notifications.push(notification);
}

function showSuccess(message) {
    showNotification(message, 'success');
}

function showError(message) {
    showNotification(message, 'error');
}

function showInfo(message) {
    showNotification(message, 'info');
}

// Page navigation functions
function navigateToPage(pageId) {
    if (pageId === currentPage) return;
    
    // Hide current page
    const currentPageElement = document.querySelector(`#${currentPage}`);
    if (currentPageElement) {
        currentPageElement.classList.remove('active');
    }
    
    // Show new page
    const newPageElement = document.querySelector(`#${pageId}`);
    if (newPageElement) {
        newPageElement.classList.add('active');
        currentPage = pageId;
        
        // Update navigation
        updateNavigation(pageId);
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Trigger page-specific initialization
        initializePage(pageId);
    }
}

function showPage(pageId) {
    navigateToPage(pageId);
}

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
}

function initializePage(pageId) {
    switch (pageId) {
        case 'math':
            initCalculator();
            break;
        case 'science':
            initGravitySimulator();
            break;
        case 'english':
            initVocabGame();
            break;
        case 'life-skills':
            initTimer();
            break;
        default:
            break;
    }
}

// Module navigation
function navigateToModule(moduleId) {
    navigateToPage(moduleId);
}

// Hero section functions
function startLearning() {
    showInfo('Starting your learning journey!');
    navigateToPage('math');
}

function viewModules() {
    // Scroll to modules grid
    const modulesGrid = document.querySelector('.modules-grid');
    if (modulesGrid) {
        modulesGrid.scrollIntoView({ behavior: 'smooth' });
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // Observe all elements with scroll-reveal class
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

// Mobile menu functions
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Timer management
let activeTimers = [];

function pauseAllTimers() {
    activeTimers.forEach(timer => {
        if (timer.pause) {
            timer.pause();
        }
    });
}

function resumeTimers() {
    activeTimers.forEach(timer => {
        if (timer.resume) {
            timer.resume();
        }
    });
}

function addActiveTimer(timer) {
    activeTimers.push(timer);
}

function removeActiveTimer(timer) {
    const index = activeTimers.indexOf(timer);
    if (index > -1) {
        activeTimers.splice(index, 1);
    }
}

// Focus time management
function getFocusTime() {
    return localStorage.getItem('focusTime') || 0;
}

function setFocusTime(time) {
    localStorage.setItem('focusTime', time);
}

// Export functions for use in other modules
window.MindMorph = {
    navigateToPage,
    showNotification,
    showSuccess,
    showError,
    showInfo,
    addActiveTimer,
    removeActiveTimer,
    getFocusTime,
    setFocusTime
};
