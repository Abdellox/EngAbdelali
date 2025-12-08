// CAPTCHA Manager
class CaptchaManager {
    constructor() {
        this.currentType = 'checkbox';
        this.stats = { attempts: 0, success: 0 };
        this.isVerified = false;
        this.currentChallengeCompleted = false;
        this.verificationExpiry = null;
        this.init();
    }

    init() {
        this.setupTypeSelector();
        this.setupActionButton();
        this.initCheckboxCaptcha();
        this.initImageCaptcha();
        this.initTextCaptcha();
        this.initSliderCaptcha();
        this.initMathCaptcha();
        this.initPatternCaptcha();
        this.initAudioCaptcha();
        this.initRotateCaptcha();
        this.initSequenceCaptcha();
        this.initColorCaptcha();
        this.updateStats();
        this.updateVerificationStatus();
        this.addChallengeStatusIndicator();
    }

    setupActionButton() {
        document.getElementById('action-btn').addEventListener('click', () => {
            if (this.isVerified) {
                this.handleFormSubmit();
            }
        });
    }

    handleFormSubmit() {
        alert('✅ Form submitted successfully! You have been verified as human.');
        this.resetVerification();
    }

    resetVerification() {
        this.isVerified = false;
        this.currentChallengeCompleted = false;
        this.verificationExpiry = null;
        this.updateVerificationStatus();
        this.updateChallengeStatus('pending');
    }

    addChallengeStatusIndicator() {
        const rightColumn = document.querySelector('.right-column');
        const statusDiv = document.createElement('div');
        statusDiv.id = 'challenge-status';
        statusDiv.className = 'challenge-status';
        statusDiv.textContent = '⏳ Pending Verification';
        rightColumn.insertBefore(statusDiv, rightColumn.firstChild);
    }

    updateChallengeStatus(status) {
        const statusDiv = document.getElementById('challenge-status');
        statusDiv.className = 'challenge-status';
        
        switch(status) {
            case 'pending':
                statusDiv.textContent = '⏳ Pending Verification';
                break;
            case 'completed':
                statusDiv.className += ' completed';
                statusDiv.textContent = '✅ Challenge Completed';
                break;
            case 'failed':
                statusDiv.className += ' failed';
                statusDiv.textContent = '❌ Challenge Failed';
                setTimeout(() => {
                    this.updateChallengeStatus('pending');
                }, 2000);
                break;
        }
    }

    updateVerificationStatus() {
        const verificationBar = document.getElementById('verification-bar');
        const verificationIcon = document.getElementById('verification-icon');
        const verificationStatus = document.getElementById('verification-status');
        const verificationMessage = document.getElementById('verification-message');
        const actionBtn = document.getElementById('action-btn');

        verificationBar.className = 'verification-bar';

        if (this.isVerified) {
            verificationBar.classList.add('verified');
            verificationIcon.textContent = '✅';
            verificationStatus.textContent = 'Verified Successfully!';
            verificationMessage.textContent = 'You are confirmed as human. You can now proceed.';
            actionBtn.disabled = false;
            
            this.verificationExpiry = Date.now() + (5 * 60 * 1000);
            this.startExpiryTimer();
        } else {
            verificationIcon.textContent = '🔒';
            verificationStatus.textContent = 'Not Verified';
            verificationMessage.textContent = 'Complete a CAPTCHA challenge to verify';
            actionBtn.disabled = true;
        }
    }

    startExpiryTimer() {
        if (this.expiryInterval) {
            clearInterval(this.expiryInterval);
        }

        this.expiryInterval = setInterval(() => {
            if (this.verificationExpiry && Date.now() >= this.verificationExpiry) {
                this.showMessage('⚠️ Verification expired. Please verify again.', false);
                this.resetVerification();
                clearInterval(this.expiryInterval);
            }
        }, 1000);
    }

    setupTypeSelector() {
        const buttons = document.querySelectorAll('.selector-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.dataset.type;
                this.switchCaptcha(type);
                
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    switchCaptcha(type) {
        document.querySelectorAll('.captcha-box').forEach(box => {
            box.classList.remove('active');
        });
        document.getElementById(`${type}-captcha`).classList.add('active');
        this.currentType = type;
        this.currentChallengeCompleted = false;
        this.hideMessage();
        
        if (this.isVerified) {
            this.showMessage('⚠️ Switching challenge. Please complete the new challenge.', false);
            this.resetVerification();
        } else {
            this.updateChallengeStatus('pending');
        }
    }

    showMessage(message, isSuccess) {
        const resultDiv = document.getElementById('result-message');
        resultDiv.textContent = message;
        resultDiv.className = 'result-message show ' + (isSuccess ? 'success' : 'error');
        
        this.stats.attempts++;
        if (isSuccess) {
            this.stats.success++;
            this.currentChallengeCompleted = true;
            this.isVerified = true;
            this.updateVerificationStatus();
            this.updateChallengeStatus('completed');
        } else {
            this.updateChallengeStatus('failed');
        }
        this.updateStats();
        
        setTimeout(() => {
            resultDiv.classList.remove('show');
        }, 3000);
    }

    updateStats() {
        document.getElementById('stat-attempts').textContent = this.stats.attempts;
        document.getElementById('stat-success').textContent = this.stats.success;
        const rate = this.stats.attempts > 0 
            ? Math.round((this.stats.success / this.stats.attempts) * 100) 
            : 0;
        document.getElementById('stat-rate').textContent = rate + '%';
    }

    hideMessage() {
        const resultDiv = document.getElementById('result-message');
        resultDiv.classList.remove('show');
    }

    initCheckboxCaptcha() {
        const checkbox = document.getElementById('robot-check');
        const statusDiv = document.querySelector('.verification-status');
        
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                statusDiv.textContent = '⏳';
                
                setTimeout(() => {
                    const isHuman = Math.random() > 0.1;
                    
                    if (isHuman) {
                        statusDiv.textContent = '✅';
                        this.showMessage('✅ Checkbox verification passed! You are verified.', true);
                    } else {
                        statusDiv.textContent = '❌';
                        checkbox.checked = false;
                        this.showMessage('❌ Bot detected! Please try again.', false);
                    }
                }, 1500);
            } else {
                statusDiv.textContent = '';
                if (this.currentChallengeCompleted) {
                    this.resetVerification();
                }
            }
        });
    }

    initImageCaptcha() {
        this.imageTargets = ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒'];
        this.imageDistractors = ['🏠', '🌳', '🌸', '⛰️', '🌊', '☀️', '🌙', '⭐', '🎈', '🎨', '📚', '⚽'];
        
        this.generateImageGrid();
        
        document.getElementById('verify-images').addEventListener('click', () => {
            this.verifyImageSelection();
        });
    }

    generateImageGrid() {
        const grid = document.getElementById('image-grid');
        grid.innerHTML = '';
        
        this.correctImages = new Set();
        const targetCount = 3 + Math.floor(Math.random() * 3);
        
        const items = [];
        for (let i = 0; i < targetCount; i++) {
            const emoji = this.imageTargets[Math.floor(Math.random() * this.imageTargets.length)];
            items.push({ emoji, isTarget: true });
        }
        
        while (items.length < 9) {
            const emoji = this.imageDistractors[Math.floor(Math.random() * this.imageDistractors.length)];
            items.push({ emoji, isTarget: false });
        }
        
        items.sort(() => Math.random() - 0.5);
        
        items.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'image-item';
            div.textContent = item.emoji;
            div.dataset.index = index;
            
            if (item.isTarget) {
                this.correctImages.add(index);
            }
            
            div.addEventListener('click', () => {
                div.classList.toggle('selected');
            });
            
            grid.appendChild(div);
        });
    }

    verifyImageSelection() {
        const selected = new Set();
        document.querySelectorAll('.image-item.selected').forEach(item => {
            selected.add(parseInt(item.dataset.index));
        });
        
        if (selected.size === 0) {
            this.showMessage('❌ Please select at least one image.', false);
            return;
        }
        
        const isCorrect = selected.size === this.correctImages.size &&
                         [...selected].every(i => this.correctImages.has(i));
        
        if (isCorrect) {
            this.showMessage('✅ Image verification passed! All vehicles identified correctly.', true);
            setTimeout(() => this.generateImageGrid(), 2000);
        } else {
            this.showMessage('❌ Incorrect selection. Please try again.', false);
            setTimeout(() => this.generateImageGrid(), 1500);
        }
    }

    initTextCaptcha() {
        this.generateTextCaptcha();
        
        document.getElementById('refresh-text').addEventListener('click', () => {
            this.generateTextCaptcha();
            document.getElementById('captcha-input').value = '';
        });
        
        document.getElementById('verify-text').addEventListener('click', () => {
            this.verifyTextCaptcha();
        });
        
        document.getElementById('captcha-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.verifyTextCaptcha();
            }
        });
    }

    generateTextCaptcha() {
        const canvas = document.getElementById('captcha-canvas');
        const ctx = canvas.getContext('2d');
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        this.captchaCode = '';
        for (let i = 0; i < 6; i++) {
            this.captchaCode += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < 5; i++) {
            ctx.strokeStyle = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},0.3)`;
            ctx.beginPath();
            ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.stroke();
        }
        
        for (let i = 0; i < this.captchaCode.length; i++) {
            ctx.save();
            ctx.font = 'bold 40px Arial';
            ctx.fillStyle = `rgb(${Math.random()*100},${Math.random()*100},${Math.random()*100})`;
            
            const x = 30 + i * 40;
            const y = 60 + (Math.random() - 0.5) * 20;
            const angle = (Math.random() - 0.5) * 0.4;
            
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.fillText(this.captchaCode[i], 0, 0);
            ctx.restore();
        }
        
        for (let i = 0; i < 50; i++) {
            ctx.fillStyle = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},0.5)`;
            ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
        }
    }

    verifyTextCaptcha() {
        const input = document.getElementById('captcha-input').value.toUpperCase().trim();
        
        if (!input) {
            this.showMessage('❌ Please enter the code.', false);
            return;
        }
        
        if (input === this.captchaCode) {
            this.showMessage('✅ Text code verification passed! You are verified.', true);
            setTimeout(() => {
                this.generateTextCaptcha();
                document.getElementById('captcha-input').value = '';
            }, 2000);
        } else {
            this.showMessage('❌ Incorrect code. Please try again.', false);
            this.generateTextCaptcha();
            document.getElementById('captcha-input').value = '';
        }
    }

    initSliderCaptcha() {
        this.generateSliderPuzzle();
        
        const sliderBtn = document.getElementById('slider-btn');
        const track = document.querySelector('.slider-track');
        let isDragging = false;
        let startX = 0;
        let currentX = 0;
        
        const onMouseDown = (e) => {
            isDragging = true;
            startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            sliderBtn.style.transition = 'none';
        };
        
        const onMouseMove = (e) => {
            if (!isDragging) return;
            
            const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            const deltaX = clientX - startX;
            const maxX = track.offsetWidth - sliderBtn.offsetWidth;
            
            currentX = Math.max(0, Math.min(deltaX, maxX));
            sliderBtn.style.left = currentX + 'px';
            
            const pieceCanvas = document.getElementById('puzzle-piece');
            pieceCanvas.style.left = (currentX * 400 / maxX) + 'px';
        };
        
        const onMouseUp = () => {
            if (!isDragging) return;
            isDragging = false;
            
            sliderBtn.style.transition = 'left 0.3s ease';
            
            const tolerance = 10;
            const pieceCanvas = document.getElementById('puzzle-piece');
            const pieceX = parseFloat(pieceCanvas.style.left);
            
            if (Math.abs(pieceX - this.puzzleX) < tolerance) {
                this.showMessage('✅ Slider puzzle verification passed! You are verified.', true);
                setTimeout(() => {
                    this.generateSliderPuzzle();
                    sliderBtn.style.left = '0px';
                }, 2000);
            } else {
                this.showMessage('❌ Puzzle not aligned correctly. Try again.', false);
                sliderBtn.style.left = '0px';
                pieceCanvas.style.left = '0px';
            }
        };
        
        sliderBtn.addEventListener('mousedown', onMouseDown);
        sliderBtn.addEventListener('touchstart', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('touchmove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('touchend', onMouseUp);
    }

    generateSliderPuzzle() {
        const canvas = document.getElementById('puzzle-canvas');
        const ctx = canvas.getContext('2d');
        const pieceCanvas = document.getElementById('puzzle-piece');
        const pieceCtx = pieceCanvas.getContext('2d');
        
        ctx.fillStyle = '#667eea';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < 20; i++) {
            ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.3})`;
            ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 
                        Math.random() * 100, Math.random() * 100);
        }
        
        this.puzzleX = 100 + Math.random() * 200;
        const pieceWidth = 60;
        const pieceHeight = 60;
        const pieceY = (canvas.height - pieceHeight) / 2;
        
        const imageData = ctx.getImageData(this.puzzleX, pieceY, pieceWidth, pieceHeight);
        
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(this.puzzleX, pieceY, pieceWidth, pieceHeight);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.puzzleX, pieceY, pieceWidth, pieceHeight);
        
        pieceCtx.clearRect(0, 0, pieceCanvas.width, pieceCanvas.height);
        pieceCtx.putImageData(imageData, 0, pieceY);
        pieceCtx.strokeStyle = 'white';
        pieceCtx.lineWidth = 2;
        pieceCtx.strokeRect(0, pieceY, pieceWidth, pieceHeight);
        
        pieceCanvas.style.left = '0px';
    }

    initMathCaptcha() {
        this.generateMathProblem();
        
        document.getElementById('verify-math').addEventListener('click', () => {
            this.verifyMathAnswer();
        });
        
        document.getElementById('refresh-math').addEventListener('click', () => {
            this.generateMathProblem();
            document.getElementById('math-input').value = '';
        });
        
        document.getElementById('math-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.verifyMathAnswer();
            }
        });
    }

    generateMathProblem() {
        const operations = ['+', '-', '×'];
        const operation = operations[Math.floor(Math.random() * operations.length)];
        
        let num1, num2;
        
        switch(operation) {
            case '+':
                num1 = Math.floor(Math.random() * 50) + 1;
                num2 = Math.floor(Math.random() * 50) + 1;
                this.mathAnswer = num1 + num2;
                break;
            case '-':
                num1 = Math.floor(Math.random() * 50) + 20;
                num2 = Math.floor(Math.random() * num1);
                this.mathAnswer = num1 - num2;
                break;
            case '×':
                num1 = Math.floor(Math.random() * 12) + 1;
                num2 = Math.floor(Math.random() * 12) + 1;
                this.mathAnswer = num1 * num2;
                break;
        }
        
        document.getElementById('math-problem').textContent = `${num1} ${operation} ${num2} = ?`;
    }

    verifyMathAnswer() {
        const inputValue = document.getElementById('math-input').value.trim();
        
        if (!inputValue) {
            this.showMessage('❌ Please enter an answer.', false);
            return;
        }
        
        const input = parseInt(inputValue);
        
        if (isNaN(input)) {
            this.showMessage('❌ Please enter a valid number.', false);
            return;
        }
        
        if (input === this.mathAnswer) {
            this.showMessage('✅ Math verification passed! Correct answer.', true);
            setTimeout(() => {
                this.generateMathProblem();
                document.getElementById('math-input').value = '';
            }, 2000);
        } else {
            this.showMessage('❌ Wrong answer. Please try again.', false);
        }
    }

    initPatternCaptcha() {
        this.generatePatternChallenge();
    }

    generatePatternChallenge() {
        const patterns = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠', '⭐', '❤️', '💎', '🌟', '🎯', '🎨'];
        const targetPattern = patterns[Math.floor(Math.random() * patterns.length)];
        
        document.getElementById('pattern-target').textContent = targetPattern;
        
        const optionsDiv = document.getElementById('pattern-options');
        optionsDiv.innerHTML = '';
        
        const options = [targetPattern];
        while (options.length < 6) {
            const pattern = patterns[Math.floor(Math.random() * patterns.length)];
            if (!options.includes(pattern)) {
                options.push(pattern);
            }
        }
        
        options.sort(() => Math.random() - 0.5);
        
        options.forEach(pattern => {
            const div = document.createElement('div');
            div.className = 'pattern-option';
            div.textContent = pattern;
            
            div.addEventListener('click', () => {
                if (pattern === targetPattern) {
                    this.showMessage('✅ Pattern verification passed! Perfect match.', true);
                    setTimeout(() => this.generatePatternChallenge(), 2000);
                } else {
                    this.showMessage('❌ Wrong pattern. Please try again.', false);
                }
            });
            
            optionsDiv.appendChild(div);
        });
    }

    initAudioCaptcha() {
        this.generateAudioCode();
        
        document.getElementById('play-audio').addEventListener('click', () => {
            this.playAudioCode();
        });
        
        document.getElementById('replay-audio').addEventListener('click', () => {
            this.playAudioCode();
        });
        
        document.getElementById('verify-audio').addEventListener('click', () => {
            this.verifyAudioCode();
        });
        
        document.getElementById('audio-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.verifyAudioCode();
            }
        });
        
        this.createVisualizer();
    }

    createVisualizer() {
        const visualizer = document.getElementById('audio-visualizer');
        for (let i = 0; i < 20; i++) {
            const bar = document.createElement('div');
            bar.className = 'audio-bar';
            bar.style.height = '20px';
            visualizer.appendChild(bar);
        }
    }

    generateAudioCode() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        this.audioCode = '';
        for (let i = 0; i < 6; i++) {
            this.audioCode += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    }

    playAudioCode() {
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = this.audioCode.split('').join(' ');
        utterance.rate = 0.8;
        utterance.pitch = 1;
        
        this.animateVisualizer();
        
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
    }

    animateVisualizer() {
        const bars = document.querySelectorAll('.audio-bar');
        let count = 0;
        
        const interval = setInterval(() => {
            bars.forEach(bar => {
                const height = Math.random() * 60 + 20;
                bar.style.height = height + 'px';
            });
            
            count++;
            if (count > 30) {
                clearInterval(interval);
                bars.forEach(bar => {
                    bar.style.height = '20px';
                });
            }
        }, 100);
    }

    verifyAudioCode() {
        const input = document.getElementById('audio-input').value.toUpperCase().trim();
        
        if (!input) {
            this.showMessage('❌ Please enter the audio code.', false);
            return;
        }
        
        if (input === this.audioCode) {
            this.showMessage('✅ Audio verification passed! Code is correct.', true);
            setTimeout(() => {
                this.generateAudioCode();
                document.getElementById('audio-input').value = '';
            }, 2000);
        } else {
            this.showMessage('❌ Incorrect code. Please listen again.', false);
            document.getElementById('audio-input').value = '';
        }
    }

    initRotateCaptcha() {
        this.currentRotation = 0;
        this.generateRotateImage();
        
        document.getElementById('rotate-left').addEventListener('click', () => {
            this.rotateImage(-15);
        });
        
        document.getElementById('rotate-right').addEventListener('click', () => {
            this.rotateImage(15);
        });
        
        document.getElementById('verify-rotation').addEventListener('click', () => {
            this.verifyRotation();
        });
    }

    generateRotateImage() {
        const canvas = document.getElementById('rotate-canvas');
        const ctx = canvas.getContext('2d');
        
        this.targetRotation = (Math.floor(Math.random() * 24) * 15) % 360;
        this.currentRotation = this.targetRotation;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((this.currentRotation * Math.PI) / 180);
        
        ctx.fillStyle = '#667eea';
        ctx.font = 'bold 80px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🏠', 0, 0);
        
        ctx.restore();
        
        document.getElementById('rotation-angle').textContent = this.currentRotation + '°';
    }

    rotateImage(degrees) {
        this.currentRotation = (this.currentRotation + degrees + 360) % 360;
        
        const canvas = document.getElementById('rotate-canvas');
        const ctx = canvas.getContext('2d');
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((this.currentRotation * Math.PI) / 180);
        
        ctx.fillStyle = '#667eea';
        ctx.font = 'bold 80px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🏠', 0, 0);
        
        ctx.restore();
        
        document.getElementById('rotation-angle').textContent = this.currentRotation + '°';
    }

    verifyRotation() {
        if (this.currentRotation === 0 || this.currentRotation === 360) {
            this.showMessage('✅ Rotation verification passed! Image is upright.', true);
            setTimeout(() => this.generateRotateImage(), 2000);
        } else {
            this.showMessage('❌ Image not aligned correctly. Keep rotating.', false);
        }
    }

    initSequenceCaptcha() {
        this.generateSequenceChallenge();
        
        document.getElementById('reset-sequence').addEventListener('click', () => {
            this.generateSequenceChallenge();
        });
    }

    generateSequenceChallenge() {
        const types = [
            { name: 'numbers', items: ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣'], instruction: 'Click numbers from 1 to 8' },
            { name: 'letters', items: ['🅰️', '🅱️', '©️', '🅳', '🅴', '🅵', '🅶', '🅷'], instruction: 'Click letters from A to H' },
            { name: 'colors', items: ['🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '🟤', '⚫'], instruction: 'Click colors in rainbow order' }
        ];
        
        const challenge = types[Math.floor(Math.random() * types.length)];
        document.getElementById('sequence-instruction').textContent = challenge.instruction;
        
        const shuffled = [...challenge.items].sort(() => Math.random() - 0.5);
        
        const grid = document.getElementById('sequence-grid');
        grid.innerHTML = '';
        
        this.sequenceClicks = [];
        this.sequenceCorrect = challenge.items;
        
        shuffled.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'sequence-item';
            div.textContent = item;
            div.dataset.item = item;
            
            div.addEventListener('click', () => {
                if (div.classList.contains('clicked')) return;
                
                this.sequenceClicks.push(item);
                div.classList.add('clicked');
                
                const order = document.createElement('div');
                order.className = 'click-order';
                order.textContent = this.sequenceClicks.length;
                div.appendChild(order);
                
                if (this.sequenceClicks.length === this.sequenceCorrect.length) {
                    this.verifySequence();
                }
            });
            
            grid.appendChild(div);
        });
    }

    verifySequence() {
        const isCorrect = this.sequenceClicks.every((item, index) => 
            item === this.sequenceCorrect[index]
        );
        
        if (isCorrect) {
            this.showMessage('✅ Sequence verification passed! Perfect order.', true);
            setTimeout(() => this.generateSequenceChallenge(), 2000);
        } else {
            this.showMessage('❌ Wrong sequence. Please try again.', false);
            setTimeout(() => this.generateSequenceChallenge(), 1500);
        }
    }

    initColorCaptcha() {
        this.generateColorChallenge();
        
        document.getElementById('verify-color').addEventListener('click', () => {
            this.verifyColorSelection();
        });
        
        document.getElementById('refresh-color').addEventListener('click', () => {
            this.generateColorChallenge();
        });
    }

    generateColorChallenge() {
        const colors = [
            { name: 'Red', hex: '#FF0000', rgb: 'rgb(255, 0, 0)' },
            { name: 'Blue', hex: '#0000FF', rgb: 'rgb(0, 0, 255)' },
            { name: 'Green', hex: '#00FF00', rgb: 'rgb(0, 255, 0)' },
            { name: 'Yellow', hex: '#FFFF00', rgb: 'rgb(255, 255, 0)' },
            { name: 'Purple', hex: '#800080', rgb: 'rgb(128, 0, 128)' },
            { name: 'Orange', hex: '#FFA500', rgb: 'rgb(255, 165, 0)' }
        ];
        
        this.targetColor = colors[Math.floor(Math.random() * colors.length)];
        
        document.getElementById('color-name').textContent = this.targetColor.name;
        
        const optionsDiv = document.getElementById('color-options');
        optionsDiv.innerHTML = '';
        
        const shuffled = [...colors].sort(() => Math.random() - 0.5);
        
        shuffled.forEach(color => {
            const div = document.createElement('div');
            div.className = 'color-option';
            div.style.backgroundColor = color.hex;
            div.dataset.name = color.name;
            
            div.addEventListener('click', () => {
                document.querySelectorAll('.color-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                div.classList.add('selected');
            });
            
            optionsDiv.appendChild(div);
        });
    }

    verifyColorSelection() {
        const selected = document.querySelector('.color-option.selected');
        
        if (!selected) {
            this.showMessage('❌ Please select a color first.', false);
            return;
        }
        
        if (selected.dataset.name === this.targetColor.name) {
            this.showMessage('✅ Color verification passed! Correct selection.', true);
            setTimeout(() => this.generateColorChallenge(), 2000);
        } else {
            this.showMessage('❌ Wrong color. Please try again.', false);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CaptchaManager();
});
