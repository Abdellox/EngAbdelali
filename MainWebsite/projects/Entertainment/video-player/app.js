/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
const video = document.getElementById('video');
let isPlaying = false;

function togglePlay() {
    if (video.paused) {
        video.play();
        document.getElementById('playBtn').textContent = '⏸';
    } else {
        video.pause();
        document.getElementById('playBtn').textContent = '▶';
    }
}

function stop() {
    video.pause();
    video.currentTime = 0;
    document.getElementById('playBtn').textContent = '▶';
}

function changeVolume(value) {
    video.volume = value / 100;
    document.getElementById('volumeValue').textContent = value + '%';
}

function changeSpeed(value) {
    video.playbackRate = value;
    document.getElementById('speedValue').textContent = value + 'x';
}

function toggleFullscreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    }
}

function skip(seconds) {
    video.currentTime += seconds;
}

video.addEventListener('timeupdate', () => {
    const progress = (video.currentTime / video.duration) * 100;
    document.getElementById('progress').style.width = progress + '%';
    
    const current = formatTime(video.currentTime);
    const duration = formatTime(video.duration);
    document.getElementById('time').textContent = `${current} / ${duration}`;
});

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

console.log('Video Player - Built by Abdel Ali');
