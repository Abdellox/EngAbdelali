/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

function speak() {
    const text = document.getElementById('textInput').value;
    
    if (!text.trim()) {
        alert('Please enter text to speak');
        return;
    }
    
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = parseFloat(document.getElementById('rate').value);
        utterance.pitch = parseFloat(document.getElementById('pitch').value);
        utterance.volume = parseFloat(document.getElementById('volume').value);
        
        speechSynthesis.speak(utterance);
    } else {
        alert('Text-to-speech not supported in this browser');
    }
}

function stopSpeaking() {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
    }
}

console.log('Text to Speech - Built by Abdel Ali');
