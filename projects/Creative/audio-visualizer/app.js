/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const audio = document.getElementById('audio');
const audioInput = document.getElementById('audioInput');
const playBtn = document.getElementById('playBtn');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const timeDisplay = document.getElementById('timeDisplay');
const visualizationType = document.getElementById('visualizationType');
const colorPicker = document.getElementById('colorPicker');
const infoDisplay = document.getElementById('infoDisplay');

let audioContext, analyser, dataArray, bufferLength;
let isPlaying = false;
let visualType = 'bars';
let color = '#667eea';

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

audioInput.addEventListener('change', handleFileSelect);
colorPicker.addEventListener('input', (e) => color = e.target.value);

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        audio.src = url;
        infoDisplay.innerHTML = `<p>Loaded: ${file.name}</p>`;
        setupAudio();
    }
}

function setupAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        analyser.fftSize = 256;
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
    }
}

function togglePlay() {
    if (!audio.src) {
        alert('Please upload an audio file first!');
        return;
    }
    
    if (isPlaying) {
        audio.pause();
        playBtn.textContent = '▶️';
    } else {
        audio.play();
        playBtn.textContent = '⏸️';
        visualize();
    }
    isPlaying = !isPlaying;
}

function changeVisualization() {
    visualType = visualizationType.value;
}

function visualize() {
    if (!isPlaying) return;
    
    requestAnimationFrame(visualize);
    analyser.getByteFrequencyData(dataArray);
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    switch (visualType) {
        case 'bars':
            drawBars();
            break;
        case 'wave':
            drawWave();
            break;
        case 'circle':
            drawCircle();
            break;
        case 'particles':
            drawParticles();
            break;
    }
}

function drawBars() {
    const barWidth = (canvas.width / bufferLength) * 2.5;
    let x = 0;
    
    for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;
        ctx.fillStyle = color;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
    }
}

function drawWave() {
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    const sliceWidth = canvas.width / bufferLength;
    let x = 0;
    
    for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 255;
        const y = v * canvas.height;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        x += sliceWidth;
    }
    
    ctx.stroke();
}

function drawCircle() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;
    
    for (let i = 0; i < bufferLength; i++) {
        const angle = (i / bufferLength) * Math.PI * 2;
        const amp = dataArray[i] / 255;
        const x = centerX + Math.cos(angle) * (radius + amp * 100);
        const y = centerY + Math.sin(angle) * (radius + amp * 100);
        
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawParticles() {
    for (let i = 0; i < bufferLength; i += 2) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = (dataArray[i] / 255) * 10;
        
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
}

audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = progress + '%';
    
    const currentMin = Math.floor(audio.currentTime / 60);
    const currentSec = Math.floor(audio.currentTime % 60);
    const durationMin = Math.floor(audio.duration / 60);
    const durationSec = Math.floor(audio.duration % 60);
    
    timeDisplay.textContent = `${currentMin}:${currentSec.toString().padStart(2, '0')} / ${durationMin}:${durationSec.toString().padStart(2, '0')}`;
});

progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
});

window.addEventListener('resize', () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});

console.log('Audio Visualizer - Built by Abdel Ali');
