let totalSeconds = 0;
let remaining = 0;
let interval = null;
let running = false;

function start() {
    if (running) return;
    
    if (remaining === 0) {
        const h = parseInt(document.getElementById('hours').value) || 0;
        const m = parseInt(document.getElementById('minutes').value) || 0;
        const s = parseInt(document.getElementById('seconds').value) || 0;
        
        totalSeconds = h * 3600 + m * 60 + s;
        remaining = totalSeconds;
        
        if (remaining === 0) {
            alert('Set a time!');
            return;
        }
    }
    
    running = true;
    document.getElementById('startBtn').textContent = 'Pause';
    
    interval = setInterval(() => {
        remaining--;
        update();
        
        if (remaining <= 0) {
            clearInterval(interval);
            running = false;
            remaining = 0;
            alert('Time is up! ⏰');
            document.getElementById('startBtn').textContent = 'Start';
        }
    }, 1000);
}

function pause() {
    if (!running) return;
    clearInterval(interval);
    running = false;
    document.getElementById('startBtn').textContent = 'Resume';
}

function reset() {
    clearInterval(interval);
    running = false;
    remaining = 0;
    totalSeconds = 0;
    document.getElementById('startBtn').textContent = 'Start';
    update();
}

function update() {
    const h = Math.floor(remaining / 3600);
    const m = Math.floor((remaining % 3600) / 60);
    const s = remaining % 60;
    
    document.getElementById('display').textContent = 
        `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// Initialize
update();
