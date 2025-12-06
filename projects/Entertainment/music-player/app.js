/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
const songs = [
    { title: 'Song 1', artist: 'Artist 1', duration: '3:45' },
    { title: 'Song 2', artist: 'Artist 2', duration: '4:20' },
    { title: 'Song 3', artist: 'Artist 3', duration: '3:15' },
    { title: 'Song 4', artist: 'Artist 4', duration: '5:00' }
];

let currentSong = 0;
let isPlaying = false;
let currentTime = 0;
let interval;

function loadSong(index) {
    currentSong = index;
    const song = songs[currentSong];
    
    document.getElementById('songTitle').textContent = song.title;
    document.getElementById('artist').textContent = song.artist;
    document.getElementById('duration').textContent = song.duration;
    
    renderPlaylist();
}

function renderPlaylist() {
    const playlist = document.getElementById('playlist');
    playlist.innerHTML = songs.map((song, index) => `
        <div class="song-item ${index === currentSong ? 'active' : ''}" onclick="loadSong(${index})">
            <div>
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
            </div>
            <div class="song-duration">${song.duration}</div>
        </div>
    `).join('');
}

function togglePlay() {
    isPlaying = !isPlaying;
    const btn = document.getElementById('playBtn');
    
    if (isPlaying) {
        btn.textContent = '⏸';
        interval = setInterval(() => {
            currentTime += 0.1;
            updateProgress();
        }, 100);
    } else {
        btn.textContent = '▶';
        clearInterval(interval);
    }
}

function updateProgress() {
    const progress = (currentTime / 180) * 100; // Assuming 3 min max
    document.getElementById('progress').style.width = progress + '%';
    
    const mins = Math.floor(currentTime / 60);
    const secs = Math.floor(currentTime % 60);
    document.getElementById('currentTime').textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
}

function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    currentTime = 0;
    loadSong(currentSong);
}

function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    currentTime = 0;
    loadSong(currentSong);
}

loadSong(0);
console.log('Music Player - Built by Abdel Ali');
