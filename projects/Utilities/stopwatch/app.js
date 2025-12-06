/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
// Stopwatch - Full Implementation
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let lapCounter = 1;

function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    display.textContent = formatTime(elapsedTime);
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
}

function pause() {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

function reset() {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    lapCounter = 1;
    display.textContent = '00:00:00.000';
    lapsContainer.innerHTML = '';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

function recordLap() {
    const lapTime = formatTime(elapsedTime);
    const lapElement = document.createElement('div');
    lapElement.className = 'lap-item';
    lapElement.innerHTML = `<span>Lap ${lapCounter}</span><span>${lapTime}</span>`;
    lapsContainer.insertBefore(lapElement, lapsContainer.firstChild);
    lapCounter++;
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

console.log('Stopwatch - Ready!');
