/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [
    { question: 'What is JavaScript?', answer: 'A programming language for web development' },
    { question: 'What is HTML?', answer: 'HyperText Markup Language' },
    { question: 'What is CSS?', answer: 'Cascading Style Sheets' }
];

let currentCard = 0;
let isFlipped = false;

function renderCards() {
    const list = document.getElementById('cardList');
    list.innerHTML = flashcards.map((card, index) => `
        <div class="card-item" onclick="selectCard(${index})">
            <div class="card-question">${card.question}</div>
        </div>
    `).join('');
}

function selectCard(index) {
    currentCard = index;
    isFlipped = false;
    showCard();
}

function showCard() {
    if (flashcards.length === 0) {
        document.getElementById('cardDisplay').innerHTML = '<p>No flashcards yet!</p>';
        return;
    }
    
    const card = flashcards[currentCard];
    const display = document.getElementById('cardDisplay');
    
    display.innerHTML = `
        <div class="flashcard ${isFlipped ? 'flipped' : ''}" onclick="flipCard()">
            <div class="card-front">
                <h3>Question</h3>
                <p>${card.question}</p>
            </div>
            <div class="card-back">
                <h3>Answer</h3>
                <p>${card.answer}</p>
            </div>
        </div>
    `;
    
    document.getElementById('cardNumber').textContent = `${currentCard + 1} / ${flashcards.length}`;
}

function flipCard() {
    isFlipped = !isFlipped;
    showCard();
}

function nextCard() {
    currentCard = (currentCard + 1) % flashcards.length;
    isFlipped = false;
    showCard();
}

function prevCard() {
    currentCard = (currentCard - 1 + flashcards.length) % flashcards.length;
    isFlipped = false;
    showCard();
}

function addCard() {
    const question = document.getElementById('question').value;
    const answer = document.getElementById('answer').value;
    
    if (!question || !answer) {
        alert('Please fill both fields!');
        return;
    }
    
    flashcards.push({ question, answer });
    saveCards();
    renderCards();
    
    document.getElementById('question').value = '';
    document.getElementById('answer').value = '';
    
    currentCard = flashcards.length - 1;
    showCard();
}

function deleteCard() {
    if (confirm('Delete this card?')) {
        flashcards.splice(currentCard, 1);
        currentCard = Math.min(currentCard, flashcards.length - 1);
        saveCards();
        renderCards();
        showCard();
    }
}

function saveCards() {
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
}

renderCards();
showCard();
console.log('Flashcard App - Built by Abdel Ali');
