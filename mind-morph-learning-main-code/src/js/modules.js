// Modules JavaScript for Mind Morph Learning Platform

// Initialize all modules
function initModules() {
    console.log('Initializing modules...');
    
    // Initialize calculator
    initCalculator();
    
    // Initialize timer
    initTimer();
    
    // Initialize vocabulary game
    initVocabGame();
    
    // Initialize gravity simulator
    initGravitySimulator();
}

// Calculator Module
let calculatorState = {
    display: '0',
    previousValue: null,
    operation: null,
    waitingForOperand: false
};

function initCalculator() {
    console.log('Initializing calculator...');
    
    // Clear calculator state
    calculatorState = {
        display: '0',
        previousValue: null,
        operation: null,
        waitingForOperand: false
    };
    
    // Update display
    updateCalculatorDisplay();
}

function calcInput(value) {
    if (calculatorState.waitingForOperand) {
        calculatorState.display = value;
        calculatorState.waitingForOperand = false;
    } else {
        calculatorState.display = calculatorState.display === '0' ? value : calculatorState.display + value;
    }
    
    updateCalculatorDisplay();
}

function calcClear() {
    calculatorState.display = '0';
    calculatorState.previousValue = null;
    calculatorState.operation = null;
    calculatorState.waitingForOperand = false;
    updateCalculatorDisplay();
}

function calcResult() {
    if (calculatorState.operation && calculatorState.previousValue !== null) {
        const current = parseFloat(calculatorState.display);
        const previous = parseFloat(calculatorState.previousValue);
        let result;
        
        switch (calculatorState.operation) {
            case '+':
                result = previous + current;
                break;
            case '-':
                result = previous - current;
                break;
            case '*':
                result = previous * current;
                break;
            case '/':
                result = previous / current;
                break;
            default:
                return;
        }
        
        calculatorState.display = result.toString();
        calculatorState.operation = null;
        calculatorState.previousValue = null;
        calculatorState.waitingForOperand = true;
        
        updateCalculatorDisplay();
    }
}

function updateCalculatorDisplay() {
    const display = document.getElementById('calc-display');
    if (display) {
        display.value = calculatorState.display;
    }
}

// Timer Module
let timerState = {
    minutes: 25,
    seconds: 0,
    isRunning: false,
    interval: null
};

function initTimer() {
    console.log('Initializing timer...');
    
    // Load saved timer settings
    const savedMinutes = localStorage.getItem('timerMinutes');
    if (savedMinutes) {
        timerState.minutes = parseInt(savedMinutes);
    }
    
    updateTimerDisplay();
    updateTimerInput();
}

function startTimer() {
    if (!timerState.isRunning) {
        timerState.isRunning = true;
        timerState.interval = setInterval(() => {
            if (timerState.seconds > 0) {
                timerState.seconds--;
            } else if (timerState.minutes > 0) {
                timerState.minutes--;
                timerState.seconds = 59;
            } else {
                // Timer finished
                stopTimer();
                showNotification('Timer completed!', 'success');
                playTimerSound();
                return;
            }
            
            updateTimerDisplay();
        }, 1000);
        
        // Add to active timers
        if (window.MindMorph && window.MindMorph.addActiveTimer) {
            window.MindMorph.addActiveTimer({
                pause: pauseTimer,
                resume: startTimer
            });
        }
    }
}

function pauseTimer() {
    if (timerState.isRunning) {
        clearInterval(timerState.interval);
        timerState.isRunning = false;
        
        // Remove from active timers
        if (window.MindMorph && window.MindMorph.removeActiveTimer) {
            window.MindMorph.removeActiveTimer({
                pause: pauseTimer,
                resume: startTimer
            });
        }
    }
}

function resetTimer() {
    pauseTimer();
    
    // Get value from input
    const input = document.getElementById('timer-input');
    if (input) {
        timerState.minutes = parseInt(input.value) || 25;
    }
    
    timerState.seconds = 0;
    updateTimerDisplay();
    
    // Save to localStorage
    localStorage.setItem('timerMinutes', timerState.minutes.toString());
}

function updateTimerDisplay() {
    const minutesElement = document.getElementById('timer-minutes');
    const secondsElement = document.getElementById('timer-seconds');
    
    if (minutesElement) {
        minutesElement.textContent = timerState.minutes.toString().padStart(2, '0');
    }
    
    if (secondsElement) {
        secondsElement.textContent = timerState.seconds.toString().padStart(2, '0');
    }
}

function updateTimerInput() {
    const input = document.getElementById('timer-input');
    if (input) {
        input.value = timerState.minutes;
    }
}

function playTimerSound() {
    // Create audio context for timer sound
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
        console.log('Audio not supported');
    }
}

// Vocabulary Game Module
let vocabGameState = {
    words: [
        { word: 'serendipity', definition: 'The occurrence and development of events by chance in a happy or beneficial way' },
        { word: 'ephemeral', definition: 'Lasting for a very short time' },
        { word: 'ubiquitous', definition: 'Present, appearing, or found everywhere' },
        { word: 'mellifluous', definition: 'Sweet or musical; pleasant to hear' },
        { word: 'serene', definition: 'Calm, peaceful, and untroubled' },
        { word: 'eloquent', definition: 'Fluent or persuasive in speaking or writing' },
        { word: 'resilient', definition: 'Able to withstand or recover quickly from difficult conditions' },
        { word: 'authentic', definition: 'Genuine or real' },
        { word: 'profound', definition: 'Very great or intense; deep' },
        { word: 'harmonious', definition: 'Forming a pleasing or consistent whole' }
    ],
    currentWordIndex: 0,
    score: 0,
    isActive: false
};

function initVocabGame() {
    console.log('Initializing vocabulary game...');
    
    // Reset game state
    vocabGameState.currentWordIndex = 0;
    vocabGameState.score = 0;
    vocabGameState.isActive = false;
    
    updateVocabDisplay();
}

function startVocabGame() {
    vocabGameState.isActive = true;
    vocabGameState.currentWordIndex = 0;
    vocabGameState.score = 0;
    
    updateVocabDisplay();
    showNotification('Vocabulary game started!', 'info');
}

function checkWord() {
    if (!vocabGameState.isActive) {
        showNotification('Please start the game first!', 'error');
        return;
    }
    
    const input = document.getElementById('word-input');
    const userInput = input.value.trim().toLowerCase();
    const currentWord = vocabGameState.words[vocabGameState.currentWordIndex].word.toLowerCase();
    
    if (userInput === currentWord) {
        vocabGameState.score++;
        showNotification('Correct! Well done!', 'success');
        
        // Move to next word
        vocabGameState.currentWordIndex++;
        
        if (vocabGameState.currentWordIndex >= vocabGameState.words.length) {
            // Game completed
            const finalScore = vocabGameState.score;
            const totalWords = vocabGameState.words.length;
            const percentage = Math.round((finalScore / totalWords) * 100);
            
            showNotification(`Game completed! Score: ${finalScore}/${totalWords} (${percentage}%)`, 'success');
            vocabGameState.isActive = false;
        }
        
        // Clear input
        input.value = '';
        updateVocabDisplay();
    } else {
        showNotification('Try again!', 'error');
        input.value = '';
    }
}

function resetVocabGame() {
    vocabGameState.isActive = false;
    vocabGameState.currentWordIndex = 0;
    vocabGameState.score = 0;
    
    const input = document.getElementById('word-input');
    if (input) {
        input.value = '';
    }
    
    updateVocabDisplay();
    showNotification('Game reset!', 'info');
}

function updateVocabDisplay() {
    const wordDisplay = document.getElementById('current-word');
    
    if (wordDisplay) {
        if (!vocabGameState.isActive) {
            wordDisplay.textContent = 'Click Start to begin';
        } else if (vocabGameState.currentWordIndex < vocabGameState.words.length) {
            const currentWord = vocabGameState.words[vocabGameState.currentWordIndex];
            wordDisplay.textContent = currentWord.definition;
        } else {
            wordDisplay.textContent = 'Game completed!';
        }
    }
}

// Gravity Simulator Module
let gravitySimState = {
    canvas: null,
    ctx: null,
    particles: [],
    isRunning: false,
    animationId: null
};

function initGravitySimulator() {
    console.log('Initializing gravity simulator...');
    
    const canvas = document.getElementById('gravity-canvas');
    if (!canvas) return;
    
    gravitySimState.canvas = canvas;
    gravitySimState.ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 400;
    canvas.height = 300;
    
    // Clear canvas
    clearCanvas();
}

function startGravitySim() {
    if (gravitySimState.isRunning) return;
    
    gravitySimState.isRunning = true;
    
    // Create particles
    createParticles();
    
    // Start animation
    animate();
    
    showNotification('Gravity simulation started!', 'info');
}

function resetGravitySim() {
    stopGravitySim();
    clearCanvas();
    showNotification('Simulation reset!', 'info');
}

function stopGravitySim() {
    gravitySimState.isRunning = false;
    if (gravitySimState.animationId) {
        cancelAnimationFrame(gravitySimState.animationId);
        gravitySimState.animationId = null;
    }
    gravitySimState.particles = [];
}

function createParticles() {
    gravitySimState.particles = [];
    
    // Create 5 particles with random positions
    for (let i = 0; i < 5; i++) {
        gravitySimState.particles.push({
            x: Math.random() * gravitySimState.canvas.width,
            y: Math.random() * (gravitySimState.canvas.height / 2),
            vx: (Math.random() - 0.5) * 2,
            vy: 0,
            radius: Math.random() * 5 + 3,
            color: `hsl(${Math.random() * 360}, 70%, 50%)`
        });
    }
}

function animate() {
    if (!gravitySimState.isRunning) return;
    
    clearCanvas();
    
    // Update and draw particles
    gravitySimState.particles.forEach(particle => {
        // Apply gravity
        particle.vy += 0.2;
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off walls
        if (particle.x <= particle.radius || particle.x >= gravitySimState.canvas.width - particle.radius) {
            particle.vx *= -0.8;
            particle.x = Math.max(particle.radius, Math.min(gravitySimState.canvas.width - particle.radius, particle.x));
        }
        
        // Bounce off bottom
        if (particle.y >= gravitySimState.canvas.height - particle.radius) {
            particle.vy *= -0.8;
            particle.y = gravitySimState.canvas.height - particle.radius;
        }
        
        // Draw particle
        drawParticle(particle);
    });
    
    gravitySimState.animationId = requestAnimationFrame(animate);
}

function drawParticle(particle) {
    const ctx = gravitySimState.ctx;
    
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();
    ctx.closePath();
}

function clearCanvas() {
    const ctx = gravitySimState.ctx;
    if (ctx) {
        ctx.clearRect(0, 0, gravitySimState.canvas.width, gravitySimState.canvas.height);
    }
}

// Utility function for notifications
function showNotification(message, type = 'info') {
    if (window.MindMorph && window.MindMorph.showNotification) {
        window.MindMorph.showNotification(message, type);
    } else {
        console.log(`${type.toUpperCase()}: ${message}`);
    }
}

// Export module functions
window.Modules = {
    initCalculator,
    initTimer,
    initVocabGame,
    initGravitySimulator,
    calcInput,
    calcClear,
    calcResult,
    startTimer,
    pauseTimer,
    resetTimer,
    startVocabGame,
    checkWord,
    resetVocabGame,
    startGravitySim,
    resetGravitySim
};
