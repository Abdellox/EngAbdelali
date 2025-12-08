// YouTube Transcript Generator
const elements = {
    videoUrl: document.getElementById('videoUrl'),
    generateBtn: document.getElementById('generateBtn'),
    errorMessage: document.getElementById('errorMessage'),
    transcriptSection: document.getElementById('transcriptSection'),
    videoThumbnail: document.getElementById('videoThumbnail'),
    videoTitle: document.getElementById('videoTitle'),
    videoChannel: document.getElementById('videoChannel'),
    languageSelect: document.getElementById('languageSelect'),
    translateSelect: document.getElementById('translateSelect'),
    transcriptText: document.getElementById('transcriptText'),
    transcriptStats: document.getElementById('transcriptStats'),
    copyBtn: document.getElementById('copyBtn'),
    downloadBtn: document.getElementById('downloadBtn'),
    selectAllBtn: document.getElementById('selectAllBtn'),
    timestampToggle: document.getElementById('timestampToggle'),
    themeToggle: document.getElementById('themeToggle')
};

// Initialize API
const transcriptAPI = new YouTubeTranscriptAPI();

// Sample languages for translation
const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hi', name: 'Hindi' }
];

let currentTranscript = [];
let currentVideoData = null;

// Initialize
function init() {
    populateLanguageSelects();
    attachEventListeners();
    initTheme();
}

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    elements.themeToggle.querySelector('.theme-icon').textContent = theme === 'dark' ? '🌙' : '☀️';
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

function populateLanguageSelects() {
    languages.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang.code;
        option.textContent = lang.name;
        elements.translateSelect.appendChild(option.cloneNode(true));
    });
}

function attachEventListeners() {
    elements.generateBtn.addEventListener('click', handleGenerate);
    elements.videoUrl.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleGenerate();
    });
    elements.copyBtn.addEventListener('click', copyTranscript);
    elements.downloadBtn.addEventListener('click', downloadTranscript);
    elements.selectAllBtn.addEventListener('click', selectAllTranscript);
    elements.timestampToggle.addEventListener('change', toggleTimestamps);
    elements.languageSelect.addEventListener('change', handleLanguageChange);
    elements.translateSelect.addEventListener('change', handleTranslate);
    elements.themeToggle.addEventListener('click', toggleTheme);
}

function selectAllTranscript() {
    const range = document.createRange();
    range.selectNodeContents(elements.transcriptText);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    
    // Visual feedback
    const originalText = elements.selectAllBtn.textContent;
    elements.selectAllBtn.textContent = '✓ Selected!';
    elements.selectAllBtn.style.background = 'var(--success)';
    setTimeout(() => {
        elements.selectAllBtn.textContent = originalText;
        elements.selectAllBtn.style.background = '';
    }, 2000);
}



function showError(message) {
    elements.errorMessage.textContent = message;
    elements.errorMessage.classList.add('show');
    setTimeout(() => {
        elements.errorMessage.classList.remove('show');
    }, 5000);
}

function setLoading(isLoading) {
    if (isLoading) {
        elements.generateBtn.classList.add('loading');
        elements.generateBtn.disabled = true;
    } else {
        elements.generateBtn.classList.remove('loading');
        elements.generateBtn.disabled = false;
    }
}

async function handleGenerate() {
    const url = elements.videoUrl.value.trim();
    
    console.log('Starting transcript generation for:', url);
    
    if (!url) {
        showError('Please enter a YouTube URL');
        return;
    }
    
    const videoId = transcriptAPI.extractVideoId(url);
    console.log('Extracted video ID:', videoId);
    
    if (!videoId) {
        showError('Invalid YouTube URL. Please check and try again.');
        return;
    }
    
    setLoading(true);
    elements.transcriptSection.classList.add('hidden');
    elements.errorMessage.classList.remove('show');
    
    try {
        console.log('Fetching transcript data...');
        // Fetch real transcript data
        currentVideoData = await transcriptAPI.fetchFullTranscript(url);
        console.log('Received video data:', currentVideoData);
        
        // Display video metadata
        elements.videoThumbnail.src = currentVideoData.metadata.thumbnail;
        elements.videoTitle.textContent = currentVideoData.metadata.title;
        elements.videoChannel.textContent = currentVideoData.metadata.channel;
        
        // Populate language selector
        populateLanguageSelector(currentVideoData.availableLanguages);
        
        // Set current transcript
        currentTranscript = currentVideoData.transcript;
        console.log('Transcript has', currentTranscript.length, 'items');
        
        // Display transcript with smooth animation
        displayTranscript();
        elements.transcriptSection.classList.remove('hidden');
        
        // Smooth scroll to transcript
        setTimeout(() => {
            elements.transcriptSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        
        console.log('Transcript displayed successfully!');
        
    } catch (error) {
        console.error('Full error:', error);
        showError(error.message || 'Failed to generate transcript. Please try again.');
    } finally {
        setLoading(false);
    }
}

function populateLanguageSelector(languages) {
    elements.languageSelect.innerHTML = '';
    
    languages.forEach((lang, index) => {
        const option = document.createElement('option');
        option.value = lang.languageCode;
        option.textContent = `${lang.name}${lang.isAutoGenerated ? ' (Auto-generated)' : ''}`;
        option.dataset.url = lang.url;
        if (index === 0) option.selected = true;
        elements.languageSelect.appendChild(option);
    });
}

function displayTranscript() {
    const showTimestamps = elements.timestampToggle.checked;
    let html = '';
    let wordCount = 0;
    let charCount = 0;
    
    currentTranscript.forEach((item, index) => {
        const text = item.text.trim();
        
        // Skip empty lines
        if (!text) return;
        
        // Count words and characters
        wordCount += text.split(/\s+/).filter(word => word.length > 0).length;
        charCount += text.length;
        
        if (showTimestamps) {
            html += `<div class="transcript-line">`;
            html += `<span class="timestamp">${item.time}</span>`;
            html += `<span class="transcript-text-content">${text}</span>`;
            html += `</div>`;
        } else {
            html += `<div class="transcript-line">`;
            html += `<span class="transcript-text-content">${text}</span>`;
            html += `</div>`;
        }
    });
    
    elements.transcriptText.innerHTML = html;
    
    // Update stats
    const lines = currentTranscript.filter(item => item.text.trim()).length;
    elements.transcriptStats.textContent = `${lines} lines • ${wordCount} words • ${charCount} characters`;
}

function toggleTimestamps() {
    displayTranscript();
}

async function handleLanguageChange() {
    const selectedLang = elements.languageSelect.value;
    
    if (!selectedLang || !currentVideoData) return;
    
    setLoading(true);
    
    try {
        currentTranscript = await transcriptAPI.getTranscript(currentVideoData.videoId, selectedLang);
        displayTranscript();
    } catch (error) {
        showError('Failed to load transcript in selected language');
        console.error(error);
    } finally {
        setLoading(false);
    }
}

async function handleTranslate() {
    const targetLang = elements.translateSelect.value;
    if (!targetLang) {
        displayTranscript();
        return;
    }
    
    // In production, call translation API
    // For demo, just show a message
    showError(`Translation to ${targetLang} would happen here with a translation API`);
}

function copyTranscript() {
    // Get clean text from transcript
    const lines = elements.transcriptText.querySelectorAll('.transcript-line');
    let text = '';
    
    lines.forEach(line => {
        const timestamp = line.querySelector('.timestamp');
        const content = line.querySelector('.transcript-text-content');
        
        if (timestamp && content) {
            text += `${timestamp.textContent} ${content.textContent}\n`;
        } else if (content) {
            text += `${content.textContent}\n`;
        }
    });
    
    navigator.clipboard.writeText(text.trim()).then(() => {
        const originalText = elements.copyBtn.textContent;
        elements.copyBtn.textContent = '✓ Copied!';
        elements.copyBtn.style.background = 'var(--success)';
        setTimeout(() => {
            elements.copyBtn.textContent = originalText;
            elements.copyBtn.style.background = '';
        }, 2000);
    }).catch(err => {
        showError('Failed to copy transcript');
        console.error(err);
    });
}

function downloadTranscript() {
    // Get clean text from transcript
    const lines = elements.transcriptText.querySelectorAll('.transcript-line');
    let text = '';
    
    const videoTitle = elements.videoTitle.textContent || 'transcript';
    const videoChannel = elements.videoChannel.textContent || '';
    
    // Add header
    text += `${videoTitle}\n`;
    if (videoChannel) {
        text += `${videoChannel}\n`;
    }
    text += `\n${'='.repeat(50)}\n\n`;
    
    // Add transcript content
    lines.forEach(line => {
        const timestamp = line.querySelector('.timestamp');
        const content = line.querySelector('.transcript-text-content');
        
        if (timestamp && content) {
            text += `${timestamp.textContent} ${content.textContent}\n`;
        } else if (content) {
            text += `${content.textContent}\n`;
        }
    });
    
    const filename = `${videoTitle.replace(/[^a-z0-9]/gi, '_')}_transcript.txt`;
    
    const blob = new Blob([text], { type: 'text/plain; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Visual feedback
    const originalText = elements.downloadBtn.textContent;
    elements.downloadBtn.textContent = '✓ Downloaded!';
    elements.downloadBtn.style.background = 'var(--success)';
    setTimeout(() => {
        elements.downloadBtn.textContent = originalText;
        elements.downloadBtn.style.background = '';
    }, 2000);
}

// Initialize app
init();
