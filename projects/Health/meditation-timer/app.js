/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

let timeLeft = 5 * 60; // seconds
let totalTime = 5 * 60;
let interval = null;
let isRunning = false;
let selectedSound = 'none';

// DOM Elements
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const durationBtns = document.querySelectorAll('.duration-btn');
const soundBtns = document.querySelectorAll('.sound-btn');
const progressCircle = document.getElementById('progressCircle');

// Circle progress setup
const radius = 110;
const circumference = 2 * Math.PI * radius;
progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
progressCircle.style.strokeDashoffset = 0;

// Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

durationBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        if (!isRunning) {
            durationBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const minutes = parseInt(this.dataset.minutes);
            setDuration(minutes);
        }
    });
});

soundBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        soundBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        selectedSound = this.dataset.sound;
    });
});

// Set duration
function setDuration(minutes) {
    timeLeft = minutes * 60;
    totalTime = minutes * 60;
    updateDisplay();
    updateProgress();
}

// Start timer
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
        
        interval = setInterval(() => {
            timeLeft--;
            updateDisplay();
            updateProgress();
            
            if (timeLeft <= 0) {
                completeTimer();
            }
        }, 1000);
    }
}

// Pause timer
function pauseTimer() {
    isRunning = false;
    clearInterval(interval);
    interval = null;
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
}

// Reset timer
function resetTimer() {
    pauseTimer();
    const activeBtn = document.querySelector('.duration-btn.active');
    const minutes = parseInt(activeBtn.dataset.minutes);
    setDuration(minutes);
}

// Complete timer
function completeTimer() {
    pauseTimer();
    playCompletionSound();
    showCompletionMessage();
    
    // Reset to initial duration
    const activeBtn = document.querySelector('.duration-btn.active');
    const minutes = parseInt(activeBtn.dataset.minutes);
    setDuration(minutes);
}

// Update display
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Update progress circle
function updateProgress() {
    const progress = timeLeft / totalTime;
    const offset = circumference - (progress * circumference);
    progressCircle.style.strokeDashoffset = offset;
}

// Play completion sound
function playCompletionSound() {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 528; // Healing frequency
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
}

// Show completion message
function showCompletionMessage() {
    const message = document.createElement('div');
    message.className = 'completion-message';
    message.innerHTML = '🧘 Meditation Complete!<br><small>Namaste 🙏</small>';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => message.remove(), 300);
    }, 3000);
}

// Initialize
updateDisplay();
updateProgress();

console.log('Meditation Timer - Built by Abdel Ali');
