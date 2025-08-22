// Focus Tracker JavaScript for Mind Morph Learning Platform

// Focus tracker state
let focusTrackerState = {
    isActive: false,
    startTime: null,
    currentSession: 0,
    totalFocusTime: 0,
    todayFocusTime: 0,
    interval: null,
    sessions: []
};

// Initialize focus tracker
function initFocusTracker() {
    console.log('Initializing focus tracker...');
    
    // Load saved data
    loadFocusData();
    
    // Update display
    updateFocusDisplay();
    updateTodayFocus();
    
    // Set up event listeners
    setupFocusEventListeners();
}

// Set up focus tracker event listeners
function setupFocusEventListeners() {
    // Handle focus start button
    const startButton = document.getElementById('focus-start');
    if (startButton) {
        startButton.addEventListener('click', startFocus);
    }
    
    // Handle focus stop button
    const stopButton = document.getElementById('focus-stop');
    if (stopButton) {
        stopButton.addEventListener('click', stopFocus);
    }
    
    // Handle close button
    const closeButton = document.querySelector('.close-btn');
    if (closeButton) {
        closeButton.addEventListener('click', toggleFocusTracker);
    }
}

// Show focus tracker
function showFocusTracker() {
    const focusTracker = document.getElementById('focus-tracker');
    if (focusTracker) {
        focusTracker.classList.add('active');
    }
}

// Hide focus tracker
function hideFocusTracker() {
    const focusTracker = document.getElementById('focus-tracker');
    if (focusTracker) {
        focusTracker.classList.remove('active');
    }
}

// Toggle focus tracker visibility
function toggleFocusTracker() {
    const focusTracker = document.getElementById('focus-tracker');
    if (focusTracker) {
        focusTracker.classList.toggle('active');
    }
}

// Start focus session
function startFocus() {
    if (focusTrackerState.isActive) return;
    
    focusTrackerState.isActive = true;
    focusTrackerState.startTime = Date.now();
    focusTrackerState.currentSession = 0;
    
    // Update UI
    updateFocusButtons();
    
    // Start timer
    focusTrackerState.interval = setInterval(() => {
        focusTrackerState.currentSession++;
        updateFocusDisplay();
    }, 1000);
    
    // Add to active timers
    if (window.MindMorph && window.MindMorph.addActiveTimer) {
        window.MindMorph.addActiveTimer({
            pause: pauseFocus,
            resume: resumeFocus
        });
    }
    
    // Show notification
    if (window.MindMorph && window.MindMorph.showNotification) {
        window.MindMorph.showNotification('Focus session started!', 'info');
    }
    
    console.log('Focus session started');
}

// Stop focus session
function stopFocus() {
    if (!focusTrackerState.isActive) return;
    
    // Calculate session time
    const sessionTime = Math.floor((Date.now() - focusTrackerState.startTime) / 1000);
    const sessionMinutes = Math.floor(sessionTime / 60);
    
    // Add to total focus time
    focusTrackerState.totalFocusTime += sessionTime;
    focusTrackerState.todayFocusTime += sessionTime;
    
    // Save session
    saveFocusSession(sessionTime, sessionMinutes);
    
    // Stop timer
    clearInterval(focusTrackerState.interval);
    focusTrackerState.interval = null;
    focusTrackerState.isActive = false;
    focusTrackerState.startTime = null;
    focusTrackerState.currentSession = 0;
    
    // Update UI
    updateFocusButtons();
    updateFocusDisplay();
    updateTodayFocus();
    
    // Save data
    saveFocusData();
    
    // Remove from active timers
    if (window.MindMorph && window.MindMorph.removeActiveTimer) {
        window.MindMorph.removeActiveTimer({
            pause: pauseFocus,
            resume: resumeFocus
        });
    }
    
    // Show completion notification
    if (window.MindMorph && window.MindMorph.showNotification) {
        const message = `Focus session completed! You focused for ${sessionMinutes} minutes.`;
        window.MindMorph.showNotification(message, 'success');
    }
    
    console.log(`Focus session stopped. Duration: ${sessionMinutes} minutes`);
}

// Pause focus session
function pauseFocus() {
    if (!focusTrackerState.isActive) return;
    
    clearInterval(focusTrackerState.interval);
    focusTrackerState.interval = null;
    
    if (window.MindMorph && window.MindMorph.showNotification) {
        window.MindMorph.showNotification('Focus session paused', 'info');
    }
}

// Resume focus session
function resumeFocus() {
    if (!focusTrackerState.isActive) return;
    
    focusTrackerState.interval = setInterval(() => {
        focusTrackerState.currentSession++;
        updateFocusDisplay();
    }, 1000);
    
    if (window.MindMorph && window.MindMorph.showNotification) {
        window.MindMorph.showNotification('Focus session resumed', 'info');
    }
}

// Update focus display
function updateFocusDisplay() {
    const focusTimeElement = document.getElementById('focus-time');
    if (focusTimeElement) {
        const totalSeconds = focusTrackerState.currentSession;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        focusTimeElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Update today's focus time
function updateTodayFocus() {
    const todayFocusElement = document.getElementById('today-focus');
    if (todayFocusElement) {
        const todayMinutes = Math.floor(focusTrackerState.todayFocusTime / 60);
        todayFocusElement.textContent = todayMinutes;
    }
}

// Update focus buttons
function updateFocusButtons() {
    const startButton = document.getElementById('focus-start');
    const stopButton = document.getElementById('focus-stop');
    
    if (startButton && stopButton) {
        if (focusTrackerState.isActive) {
            startButton.disabled = true;
            stopButton.disabled = false;
            startButton.textContent = 'Focusing...';
        } else {
            startButton.disabled = false;
            stopButton.disabled = true;
            startButton.textContent = 'Start Focus';
        }
    }
}

// Save focus session
function saveFocusSession(sessionTime, sessionMinutes) {
    const session = {
        date: new Date().toISOString(),
        duration: sessionTime,
        minutes: sessionMinutes,
        timestamp: Date.now()
    };
    
    focusTrackerState.sessions.push(session);
    
    // Keep only last 100 sessions
    if (focusTrackerState.sessions.length > 100) {
        focusTrackerState.sessions.shift();
    }
}

// Save focus data to localStorage
function saveFocusData() {
    const data = {
        totalFocusTime: focusTrackerState.totalFocusTime,
        todayFocusTime: focusTrackerState.todayFocusTime,
        sessions: focusTrackerState.sessions,
        lastSave: new Date().toISOString()
    };
    
    localStorage.setItem('focusTrackerData', JSON.stringify(data));
}

// Load focus data from localStorage
function loadFocusData() {
    const savedData = localStorage.getItem('focusTrackerData');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            
            // Check if it's a new day
            const lastSaveDate = new Date(data.lastSave).toDateString();
            const today = new Date().toDateString();
            
            if (lastSaveDate === today) {
                // Same day, load all data
                focusTrackerState.totalFocusTime = data.totalFocusTime || 0;
                focusTrackerState.todayFocusTime = data.todayFocusTime || 0;
                focusTrackerState.sessions = data.sessions || [];
            } else {
                // New day, reset today's focus time
                focusTrackerState.totalFocusTime = data.totalFocusTime || 0;
                focusTrackerState.todayFocusTime = 0;
                focusTrackerState.sessions = data.sessions || [];
            }
        } catch (error) {
            console.error('Error loading focus data:', error);
        }
    }
}

// Get focus statistics
function getFocusStats() {
    const today = new Date().toDateString();
    const todaySessions = focusTrackerState.sessions.filter(session => {
        return new Date(session.date).toDateString() === today;
    });
    
    const totalSessions = todaySessions.length;
    const totalMinutes = Math.floor(focusTrackerState.todayFocusTime / 60);
    const averageSession = totalSessions > 0 ? Math.floor(totalMinutes / totalSessions) : 0;
    
    return {
        todaySessions: totalSessions,
        todayMinutes: totalMinutes,
        averageSession: averageSession,
        totalFocusTime: Math.floor(focusTrackerState.totalFocusTime / 60),
        allTimeSessions: focusTrackerState.sessions.length
    };
}

// Get weekly focus data
function getWeeklyFocusData() {
    const weekData = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateString = date.toDateString();
        
        const daySessions = focusTrackerState.sessions.filter(session => {
            return new Date(session.date).toDateString() === dateString;
        });
        
        const dayMinutes = daySessions.reduce((total, session) => total + session.minutes, 0);
        
        weekData.push({
            date: dateString,
            minutes: dayMinutes,
            sessions: daySessions.length
        });
    }
    
    return weekData;
}

// Export focus time for other modules
function getFocusTime() {
    return focusTrackerState.totalFocusTime;
}

// Set focus time (for external updates)
function setFocusTime(time) {
    focusTrackerState.totalFocusTime = time;
    saveFocusData();
}

// Focus tracker analytics
function trackFocusEvent(event, data = {}) {
    const analyticsData = {
        event: event,
        timestamp: Date.now(),
        currentPage: window.Navigation ? window.Navigation.getCurrentPage() : 'unknown',
        ...data
    };
    
    // Store in localStorage for basic analytics
    const analytics = JSON.parse(localStorage.getItem('focusAnalytics') || '[]');
    analytics.push(analyticsData);
    
    // Keep only last 1000 events
    if (analytics.length > 1000) {
        analytics.splice(0, analytics.length - 1000);
    }
    
    localStorage.setItem('focusAnalytics', JSON.stringify(analytics));
}

// Auto-save focus data periodically
function setupAutoSave() {
    setInterval(() => {
        if (focusTrackerState.isActive) {
            saveFocusData();
        }
    }, 30000); // Save every 30 seconds if active
}

// Initialize auto-save
setupAutoSave();

// Export focus tracker functions
window.FocusTracker = {
    startFocus,
    stopFocus,
    pauseFocus,
    resumeFocus,
    toggleFocusTracker,
    showFocusTracker,
    hideFocusTracker,
    getFocusStats,
    getWeeklyFocusData,
    getFocusTime,
    setFocusTime,
    trackFocusEvent
};
