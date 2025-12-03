let count = 0;
let step = 1;

function update() {
    document.getElementById('count').textContent = count;
    const el = document.getElementById('count');
    el.style.color = count > 0 ? '#27ae60' : count < 0 ? '#e74c3c' : '#333';
}

function increase() {
    count += step;
    update();
}

function decrease() {
    count -= step;
    update();
}

function reset() {
    count = 0;
    update();
}

function setStep() {
    step = parseInt(document.getElementById('stepInput').value) || 1;
}

// Keyboard shortcuts
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp') increase();
    if (e.key === 'ArrowDown') decrease();
    if (e.key === 'r' || e.key === 'R') reset();
});

// Initialize
update();
