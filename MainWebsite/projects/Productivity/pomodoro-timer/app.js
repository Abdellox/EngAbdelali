// Pomodoro Timer - Full Implementation
let timeLeft = 25 * 60;
let isRunning = false;
let interval = null;
let mode = 'work';
let sessionsCompleted = 0;
let totalFocusTime = 0;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timerDisplay').textContent = String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
    const totalTime = mode === 'work' ? parseInt(document.getElementById('workDuration').value) * 60 : parseInt(document.getElementById('breakDuration').value) * 60;
    const progress = ((totalTime - timeLeft) / totalTime) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('pauseBtn').style.display = 'inline-block';
    interval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            if (mode === 'work') totalFocusTime++;
            updateDisplay();
        } else {
            completeSession();
        }
    }, 1000);
}

function pauseTimer() {
    isRunning = false;
    clearInterval(interval);
    document.getElementById('startBtn').style.display = 'inline-block';
    document.getElementById('pauseBtn').style.display = 'none';
}

function resetTimer() {
    pauseTimer();
    timeLeft = parseInt(document.getElementById('workDuration').value) * 60;
    mode = 'work';
    document.getElementById('modeIndicator').textContent = 'Work Time';
    updateDisplay();
}

function completeSession() {
    pauseTimer();
    if (mode === 'work') {
        sessionsCompleted++;
        document.getElementById('sessionsCount').textContent = sessionsCompleted;
        mode = 'break';
        timeLeft = parseInt(document.getElementById('breakDuration').value) * 60;
        document.getElementById('modeIndicator').textContent = 'Break Time';
        alert('Work session complete! Take a break.');
    } else {
        mode = 'work';
        timeLeft = parseInt(document.getElementById('workDuration').value) * 60;
        document.getElementById('modeIndicator').textContent = 'Work Time';
        alert('Break is over! Back to work.');
    }
    updateDisplay();
}

document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);
updateDisplay();
console.log('?? Pomodoro Timer Ready');
