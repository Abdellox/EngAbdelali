/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

// Word list for the game
const WORDS = [
    'ABOUT', 'ABOVE', 'ABUSE', 'ACTOR', 'ACUTE', 'ADMIT', 'ADOPT', 'ADULT', 'AFTER', 'AGAIN',
    'AGENT', 'AGREE', 'AHEAD', 'ALARM', 'ALBUM', 'ALERT', 'ALIEN', 'ALIGN', 'ALIKE', 'ALIVE',
    'ALLOW', 'ALONE', 'ALONG', 'ALTER', 'AMONG', 'ANGER', 'ANGLE', 'ANGRY', 'APART', 'APPLE',
    'APPLY', 'ARENA', 'ARGUE', 'ARISE', 'ARRAY', 'ASIDE', 'ASSET', 'AUDIO', 'AUDIT', 'AVOID',
    'AWAKE', 'AWARD', 'AWARE', 'BADLY', 'BAKER', 'BASES', 'BASIC', 'BEACH', 'BEGAN', 'BEGIN',
    'BEING', 'BELOW', 'BENCH', 'BILLY', 'BIRTH', 'BLACK', 'BLAME', 'BLANK', 'BLIND', 'BLOCK',
    'BLOOD', 'BOARD', 'BOOST', 'BOOTH', 'BOUND', 'BRAIN', 'BRAND', 'BRASS', 'BRAVE', 'BREAD',
    'BREAK', 'BREED', 'BRIEF', 'BRING', 'BROAD', 'BROKE', 'BROWN', 'BUILD', 'BUILT', 'BUYER',
    'CABLE', 'CALIF', 'CARRY', 'CATCH', 'CAUSE', 'CHAIN', 'CHAIR', 'CHAOS', 'CHARM', 'CHART',
    'CHASE', 'CHEAP', 'CHECK', 'CHEST', 'CHIEF', 'CHILD', 'CHINA', 'CHOSE', 'CIVIL', 'CLAIM',
    'CLASS', 'CLEAN', 'CLEAR', 'CLICK', 'CLIMB', 'CLOCK', 'CLOSE', 'CLOUD', 'COACH', 'COAST',
    'COULD', 'COUNT', 'COURT', 'COVER', 'CRAFT', 'CRASH', 'CRAZY', 'CREAM', 'CRIME', 'CROSS',
    'CROWD', 'CROWN', 'CRUDE', 'CURVE', 'CYCLE', 'DAILY', 'DANCE', 'DATED', 'DEALT', 'DEATH',
    'DEBUT', 'DELAY', 'DEPTH', 'DOING', 'DOUBT', 'DOZEN', 'DRAFT', 'DRAMA', 'DRANK', 'DREAM',
    'DRESS', 'DRILL', 'DRINK', 'DRIVE', 'DROVE', 'DYING', 'EAGER', 'EARLY', 'EARTH', 'EIGHT',
    'ELITE', 'EMPTY', 'ENEMY', 'ENJOY', 'ENTER', 'ENTRY', 'EQUAL', 'ERROR', 'EVENT', 'EVERY',
    'EXACT', 'EXIST', 'EXTRA', 'FAITH', 'FALSE', 'FAULT', 'FIBER', 'FIELD', 'FIFTH', 'FIFTY',
    'FIGHT', 'FINAL', 'FIRST', 'FIXED', 'FLASH', 'FLEET', 'FLOOR', 'FLUID', 'FOCUS', 'FORCE',
    'FORTH', 'FORTY', 'FORUM', 'FOUND', 'FRAME', 'FRANK', 'FRAUD', 'FRESH', 'FRONT', 'FRUIT',
    'FULLY', 'FUNNY', 'GIANT', 'GIVEN', 'GLASS', 'GLOBE', 'GOING', 'GRACE', 'GRADE', 'GRAND',
    'GRANT', 'GRASS', 'GRAVE', 'GREAT', 'GREEN', 'GROSS', 'GROUP', 'GROWN', 'GUARD', 'GUESS',
    'GUEST', 'GUIDE', 'HAPPY', 'HARRY', 'HEART', 'HEAVY', 'HENCE', 'HENRY', 'HORSE', 'HOTEL',
    'HOUSE', 'HUMAN', 'IDEAL', 'IMAGE', 'INDEX', 'INNER', 'INPUT', 'ISSUE', 'JAPAN', 'JIMMY',
    'JOINT', 'JONES', 'JUDGE', 'KNOWN', 'LABEL', 'LARGE', 'LASER', 'LATER', 'LAUGH', 'LAYER',
    'LEARN', 'LEASE', 'LEAST', 'LEAVE', 'LEGAL', 'LEVEL', 'LEWIS', 'LIGHT', 'LIMIT', 'LINKS',
    'LIVES', 'LOCAL', 'LOOSE', 'LOWER', 'LUCKY', 'LUNCH', 'LYING', 'MAGIC', 'MAJOR', 'MAKER',
    'MARCH', 'MARIA', 'MATCH', 'MAYBE', 'MAYOR', 'MEANT', 'MEDIA', 'METAL', 'MIGHT', 'MINOR',
    'MINUS', 'MIXED', 'MODEL', 'MONEY', 'MONTH', 'MORAL', 'MOTOR', 'MOUNT', 'MOUSE', 'MOUTH',
    'MOVED', 'MOVIE', 'MUSIC', 'NEEDS', 'NEVER', 'NEWLY', 'NIGHT', 'NOISE', 'NORTH', 'NOTED',
    'NOVEL', 'NURSE', 'OCCUR', 'OCEAN', 'OFFER', 'OFTEN', 'ORDER', 'OTHER', 'OUGHT', 'PAINT',
    'PANEL', 'PAPER', 'PARTY', 'PEACE', 'PETER', 'PHASE', 'PHONE', 'PHOTO', 'PIANO', 'PIECE',
    'PILOT', 'PITCH', 'PLACE', 'PLAIN', 'PLANE', 'PLANT', 'PLATE', 'POINT', 'POUND', 'POWER',
    'PRESS', 'PRICE', 'PRIDE', 'PRIME', 'PRINT', 'PRIOR', 'PRIZE', 'PROOF', 'PROUD', 'PROVE',
    'QUEEN', 'QUICK', 'QUIET', 'QUITE', 'RADIO', 'RAISE', 'RANGE', 'RAPID', 'RATIO', 'REACH',
    'READY', 'REALM', 'REBEL', 'REFER', 'RELAX', 'REPAY', 'REPLY', 'RIGHT', 'RIGID', 'RIVAL',
    'RIVER', 'ROBIN', 'ROGER', 'ROMAN', 'ROUGH', 'ROUND', 'ROUTE', 'ROYAL', 'RURAL', 'SCALE',
    'SCENE', 'SCOPE', 'SCORE', 'SENSE', 'SERVE', 'SETUP', 'SEVEN', 'SHALL', 'SHAPE', 'SHARE',
    'SHARP', 'SHEET', 'SHELF', 'SHELL', 'SHIFT', 'SHINE', 'SHIRT', 'SHOCK', 'SHOOT', 'SHORT',
    'SHOWN', 'SIGHT', 'SIMON', 'SIXTH', 'SIXTY', 'SIZED', 'SKILL', 'SLEEP', 'SLIDE', 'SMALL',
    'SMART', 'SMILE', 'SMITH', 'SMOKE', 'SOLID', 'SOLVE', 'SORRY', 'SOUND', 'SOUTH', 'SPACE',
    'SPARE', 'SPEAK', 'SPEED', 'SPEND', 'SPENT', 'SPLIT', 'SPOKE', 'SPORT', 'STAFF', 'STAGE',
    'STAKE', 'STAND', 'START', 'STATE', 'STEAM', 'STEEL', 'STEEP', 'STEER', 'STEVE', 'STICK',
    'STILL', 'STOCK', 'STONE', 'STOOD', 'STORE', 'STORM', 'STORY', 'STRIP', 'STUCK', 'STUDY',
    'STUFF', 'STYLE', 'SUGAR', 'SUITE', 'SUPER', 'SWEET', 'TABLE', 'TAKEN', 'TASTE', 'TAXES',
    'TEACH', 'TEAMS', 'TEETH', 'TERRY', 'TEXAS', 'THANK', 'THEFT', 'THEIR', 'THEME', 'THERE',
    'THESE', 'THICK', 'THING', 'THINK', 'THIRD', 'THOSE', 'THREE', 'THREW', 'THROW', 'THUMB',
    'TIGHT', 'TIRED', 'TITLE', 'TODAY', 'TOPIC', 'TOTAL', 'TOUCH', 'TOUGH', 'TOWER', 'TRACK',
    'TRADE', 'TRAIN', 'TREAT', 'TREND', 'TRIAL', 'TRIBE', 'TRICK', 'TRIED', 'TRIES', 'TRUCK',
    'TRULY', 'TRUNK', 'TRUST', 'TRUTH', 'TWICE', 'TWIST', 'TYLER', 'UNDER', 'UNDUE', 'UNION',
    'UNITY', 'UNTIL', 'UPPER', 'UPSET', 'URBAN', 'USAGE', 'USUAL', 'VALID', 'VALUE', 'VIDEO',
    'VIRUS', 'VISIT', 'VITAL', 'VOCAL', 'VOICE', 'WASTE', 'WATCH', 'WATER', 'WHEEL', 'WHERE',
    'WHICH', 'WHILE', 'WHITE', 'WHOLE', 'WHOSE', 'WOMAN', 'WOMEN', 'WORLD', 'WORRY', 'WORSE',
    'WORST', 'WORTH', 'WOULD', 'WRITE', 'WRONG', 'WROTE', 'YOUNG', 'YOUTH'
];

// Game state
let targetWord = '';
let currentRow = 0;
let currentCol = 0;
let gameOver = false;
let gameWon = false;

// Game elements
let gameBoard;
let keyboard;

// Initialize game
function initGame() {
    gameBoard = document.getElementById('gameBoard');
    keyboard = document.getElementById('keyboard');
    
    createGameBoard();
    createKeyboard();
    newGame();
}

// Create the game board
function createGameBoard() {
    gameBoard.innerHTML = '';
    
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        row.id = `row-${i}`;
        
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `cell-${i}-${j}`;
            row.appendChild(cell);
        }
        
        gameBoard.appendChild(row);
    }
}

// Create the keyboard
function createKeyboard() {
    const keyboardLayout = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
    ];
    
    keyboard.innerHTML = '';
    
    keyboardLayout.forEach(row => {
        const keyboardRow = document.createElement('div');
        keyboardRow.className = 'keyboard-row';
        
        row.forEach(key => {
            const keyElement = document.createElement('button');
            keyElement.className = 'key';
            keyElement.textContent = key === 'BACKSPACE' ? '⌫' : key;
            keyElement.id = `key-${key}`;
            
            if (key === 'ENTER' || key === 'BACKSPACE') {
                keyElement.classList.add('wide');
            }
            
            keyElement.addEventListener('click', () => handleKeyPress(key));
            keyboardRow.appendChild(keyElement);
        });
        
        keyboard.appendChild(keyboardRow);
    });
}

// Start a new game
function newGame() {
    targetWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    currentRow = 0;
    currentCol = 0;
    gameOver = false;
    gameWon = false;
    
    // Clear the board
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            cell.textContent = '';
            cell.className = 'cell';
        }
    }
    
    // Reset keyboard
    document.querySelectorAll('.key').forEach(key => {
        key.className = 'key';
        if (key.id === 'key-ENTER' || key.id === 'key-BACKSPACE') {
            key.classList.add('wide');
        }
    });
    
    // Update attempts display
    updateAttemptsDisplay();
    
    // Hide game message
    document.getElementById('gameMessage').style.display = 'none';
    
    console.log('New game started. Target word:', targetWord); // For debugging
}

// Handle key press
function handleKeyPress(key) {
    if (gameOver) return;
    
    if (key === 'ENTER') {
        if (currentCol === 5) {
            submitGuess();
        }
    } else if (key === 'BACKSPACE') {
        if (currentCol > 0) {
            currentCol--;
            const cell = document.getElementById(`cell-${currentRow}-${currentCol}`);
            cell.textContent = '';
            cell.classList.remove('filled');
        }
    } else if (currentCol < 5 && /^[A-Z]$/.test(key)) {
        const cell = document.getElementById(`cell-${currentRow}-${currentCol}`);
        cell.textContent = key;
        cell.classList.add('filled');
        currentCol++;
    }
}

// Submit the current guess
function submitGuess() {
    const guess = getCurrentGuess();
    
    if (guess.length !== 5) return;
    
    // Check each letter
    const letterCount = {};
    for (let char of targetWord) {
        letterCount[char] = (letterCount[char] || 0) + 1;
    }
    
    const result = new Array(5).fill('absent');
    
    // First pass: mark correct letters
    for (let i = 0; i < 5; i++) {
        if (guess[i] === targetWord[i]) {
            result[i] = 'correct';
            letterCount[guess[i]]--;
        }
    }
    
    // Second pass: mark present letters
    for (let i = 0; i < 5; i++) {
        if (result[i] === 'absent' && letterCount[guess[i]] > 0) {
            result[i] = 'present';
            letterCount[guess[i]]--;
        }
    }
    
    // Apply colors to cells and keyboard
    for (let i = 0; i < 5; i++) {
        const cell = document.getElementById(`cell-${currentRow}-${i}`);
        const keyElement = document.getElementById(`key-${guess[i]}`);
        
        cell.classList.add(result[i]);
        
        // Update keyboard key color (only if it's not already correct)
        if (!keyElement.classList.contains('correct')) {
            if (result[i] === 'correct') {
                keyElement.className = 'key correct';
            } else if (result[i] === 'present' && !keyElement.classList.contains('present')) {
                keyElement.className = 'key present';
            } else if (result[i] === 'absent') {
                keyElement.className = 'key absent';
            }
        }
    }
    
    // Check win condition
    if (guess === targetWord) {
        gameWon = true;
        gameOver = true;
        setTimeout(() => showGameMessage('Congratulations!', `You found the word "${targetWord}" in ${currentRow + 1} attempts!`), 500);
    } else if (currentRow === 5) {
        gameOver = true;
        setTimeout(() => showGameMessage('Game Over!', `The word was "${targetWord}". Better luck next time!`), 500);
    } else {
        currentRow++;
        currentCol = 0;
        updateAttemptsDisplay();
    }
}

// Get current guess
function getCurrentGuess() {
    let guess = '';
    for (let i = 0; i < 5; i++) {
        const cell = document.getElementById(`cell-${currentRow}-${i}`);
        guess += cell.textContent;
    }
    return guess;
}

// Update attempts display
function updateAttemptsDisplay() {
    document.getElementById('attempts').textContent = `${currentRow}/6`;
}

// Show game message
function showGameMessage(title, text) {
    document.getElementById('messageTitle').textContent = title;
    document.getElementById('messageText').textContent = text;
    document.getElementById('gameMessage').style.display = 'flex';
}

// Keyboard event listener
document.addEventListener('keydown', (e) => {
    const key = e.key.toUpperCase();
    
    if (key === 'ENTER') {
        handleKeyPress('ENTER');
    } else if (key === 'BACKSPACE') {
        handleKeyPress('BACKSPACE');
    } else if (/^[A-Z]$/.test(key)) {
        handleKeyPress(key);
    }
});

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', initGame);

console.log('Wordle Clone - Built by Abdel Ali');