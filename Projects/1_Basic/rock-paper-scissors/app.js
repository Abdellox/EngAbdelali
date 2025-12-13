/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

let playerScore = 0;
let computerScore = 0;
let isPlaying = false;

const choices = {
    rock: { emoji: '🪨', beats: 'scissors' },
    paper: { emoji: '📄', beats: 'rock' },
    scissors: { emoji: '✂️', beats: 'paper' }
};

function play(playerChoice) {
    if (isPlaying) return;
    
    isPlaying = true;
    const computerChoice = getComputerChoice();
    
    // Show countdown animation
    showCountdown(() => {
        showChoices(playerChoice, computerChoice);
        const result = determineWinner(playerChoice, computerChoice);
        updateScore(result);
        showResult(result, playerChoice, computerChoice);
        isPlaying = false;
    });
}

function getComputerChoice() {
    const choiceKeys = Object.keys(choices);
    return choiceKeys[Math.floor(Math.random() * choiceKeys.length)];
}

function showCountdown(callback) {
    const resultDiv = document.getElementById('result');
    const playerDisplay = document.getElementById('playerChoice');
    const computerDisplay = document.getElementById('computerChoice');
    
    let count = 3;
    const countdown = setInterval(() => {
        resultDiv.textContent = count > 0 ? count : 'GO!';
        playerDisplay.textContent = '✊';
        computerDisplay.textContent = '✊';
        
        if (count === 0) {
            clearInterval(countdown);
            setTimeout(callback, 300);
        }
        count--;
    }, 500);
}

function showChoices(playerChoice, computerChoice) {
    document.getElementById('playerChoice').textContent = choices[playerChoice].emoji;
    document.getElementById('computerChoice').textContent = choices[computerChoice].emoji;
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'draw';
    } else if (choices[playerChoice].beats === computerChoice) {
        return 'player';
    } else {
        return 'computer';
    }
}

function updateScore(result) {
    if (result === 'player') {
        playerScore++;
        document.getElementById('playerScore').textContent = playerScore;
    } else if (result === 'computer') {
        computerScore++;
        document.getElementById('computerScore').textContent = computerScore;
    }
}

function showResult(result, playerChoice, computerChoice) {
    const resultDiv = document.getElementById('result');
    const messages = {
        player: `🎉 You Win! ${choices[playerChoice].emoji} beats ${choices[computerChoice].emoji}`,
        computer: `😢 You Lose! ${choices[computerChoice].emoji} beats ${choices[playerChoice].emoji}`,
        draw: `🤝 It's a Draw! Both chose ${choices[playerChoice].emoji}`
    };
    
    resultDiv.textContent = messages[result];
    resultDiv.className = `result ${result}`;
    
    // Add animation class
    resultDiv.classList.add('animate');
    setTimeout(() => resultDiv.classList.remove('animate'), 600);
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    document.getElementById('playerScore').textContent = playerScore;
    document.getElementById('computerScore').textContent = computerScore;
    document.getElementById('result').textContent = 'Choose your move!';
    document.getElementById('result').className = 'result';
    document.getElementById('playerChoice').textContent = '❓';
    document.getElementById('computerChoice').textContent = '❓';
}

// Add keyboard support
document.addEventListener('keydown', (e) => {
    if (isPlaying) return;
    
    switch(e.key.toLowerCase()) {
        case 'r':
            play('rock');
            break;
        case 'p':
            play('paper');
            break;
        case 's':
            play('scissors');
            break;
    }
});

// Initialize display
resetGame();

console.log('Rock Paper Scissors - Built by Abdel Ali');