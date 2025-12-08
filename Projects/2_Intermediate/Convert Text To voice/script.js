document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const textInput = document.getElementById('text-input');
    const charCount = document.getElementById('char-count');
    const voiceOptions = document.querySelectorAll('.voice-option');
    const generateBtn = document.getElementById('generate-btn');
    const audioPlayer = document.getElementById('audio-player');
    const audioPlayerContainer = document.querySelector('.audio-player');
    const downloadBtn = document.getElementById('download-btn');
    const previewBtns = document.querySelectorAll('.preview-btn');
    
    // Variables
    let selectedVoice = 'ahmed';
    let audioBlob = null;
    let currentAudioUrl = null;
    
    // Initialize - select the first voice by default
    if (voiceOptions.length > 0) {
        const firstVoice = voiceOptions[0];
        firstVoice.classList.add('selected');
        selectedVoice = firstVoice.getAttribute('data-voice');
    }
    
    // Character counter
    textInput.addEventListener('input', function() {
        const count = this.value.length;
        charCount.textContent = count;
        
        // Optional: Add warning if exceeding limit
        if (count > 500) {
            charCount.style.color = 'red';
        } else {
            charCount.style.color = '#777';
        }
    });
    
    // Voice selection
    voiceOptions.forEach(option => {
        option.addEventListener('click', function() {
            voiceOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedVoice = this.getAttribute('data-voice');
        });
    });
    
    // Preview voice functionality
    previewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const voiceId = this.closest('.voice-option').getAttribute('data-voice');
            const previewText = 'مرحباً، هذا مثال على الصوت';
            generateSpeech(previewText, voiceId, true);
        });
    });
    
    // Generate speech
    generateBtn.addEventListener('click', function() {
        const text = textInput.value.trim();
        
        if (!text) {
            showNotification('الرجاء إدخال النص', 'warning');
            return;
        }
        
        if (!selectedVoice) {
            showNotification('الرجاء اختيار صوت', 'warning');
            return;
        }
        
        generateSpeech(text, selectedVoice, false);
    });
    
    // Main function to generate speech
    function generateSpeech(text, voiceId, isPreview) {
        const btn = isPreview ? event.target : generateBtn;
        const originalHTML = btn.innerHTML;
        
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التوليد...';
        
        // Try backend first
        fetch('/api/tts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: text,
                voice: voiceId
            })
        })
        .then(response => {
            if (!response.ok) throw new Error('Backend failed');
            return response.blob();
        })
        .then(blob => {
            handleAudioSuccess(blob, isPreview);
            btn.disabled = false;
            btn.innerHTML = originalHTML;
        })
        .catch(error => {
            console.log('Backend unavailable, using browser TTS');
            useBrowserTTS(text, voiceId, isPreview);
            btn.disabled = false;
            btn.innerHTML = originalHTML;
        });
    }
    
    // Handle successful audio generation
    function handleAudioSuccess(blob, isPreview) {
        if (currentAudioUrl) {
            URL.revokeObjectURL(currentAudioUrl);
        }
        
        audioBlob = blob;
        currentAudioUrl = URL.createObjectURL(blob);
        audioPlayer.src = currentAudioUrl;
        
        if (!isPreview) {
            audioPlayerContainer.style.display = 'block';
            audioPlayer.play();
            showNotification('تم توليد الصوت بنجاح!', 'success');
        } else {
            audioPlayer.play();
        }
    }
    
    // Fallback to browser's Web Speech API
    function useBrowserTTS(text, voiceId, isPreview) {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ar-SA';
            utterance.rate = 0.9;
            utterance.pitch = voiceId.includes('fatima') || voiceId.includes('aisha') || 
                             voiceId.includes('layla') || voiceId.includes('nour') ? 1.2 : 0.9;
            
            const voices = window.speechSynthesis.getVoices();
            const arabicVoice = voices.find(v => v.lang.startsWith('ar'));
            if (arabicVoice) utterance.voice = arabicVoice;
            
            window.speechSynthesis.speak(utterance);
            
            if (!isPreview) {
                showNotification('يتم استخدام صوت المتصفح', 'info');
            }
        } else {
            showNotification('المتصفح لا يدعم تحويل النص إلى صوت', 'error');
        }
    }
    
    // Download audio
    downloadBtn.addEventListener('click', function() {
        if (!audioBlob) {
            showNotification('الرجاء توليد الصوت أولاً', 'warning');
            return;
        }
        
        const url = URL.createObjectURL(audioBlob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `arabic-speech-${Date.now()}.mp3`;
        document.body.appendChild(a);
        a.click();
        
        setTimeout(() => {
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }, 100);
        
        showNotification('تم تحميل الملف الصوتي', 'success');
    });
    
    // Notification system
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Load voices on page load
    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = () => {
            const voices = window.speechSynthesis.getVoices();
            console.log('Available voices:', voices.filter(v => v.lang.startsWith('ar')));
        };
    }
});