/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

const questions = [
    { q: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], answer: 2 },
    { q: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: 1 },
    { q: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 },
    { q: "Who painted the Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Monet"], answer: 2 },
    { q: "What is the largest ocean?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: 3 },
    { q: "How many continents are there?", options: ["5", "6", "7", "8"], answer: 2 },
    { q: "What is the smallest prime number?", options: ["0", "1", "2", "3"], answer: 2 },
    { q: "Which language is used for web development?", options: ["Python", "JavaScript", "C++", "Java"], answer: 1 },
    { q: "What year did World War II end?", options: ["1943", "1944", "1945", "1946"], answer: 2 },
    { q: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"], answer: 0 }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('question').textContent = q.q;
    document.getElementById('questionNum').textContent = currentQuestion + 1;
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';
    
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    
    q.options.forEach((opt, i) => {
        const div = document.createElement('div');
        div.className = 'option';
        div.textContent = opt;
        div.onclick = () => checkAnswer(i);
        optionsDiv.appendChild(div);
    });
}

function checkAnswer(selected) {
    const q = questions[currentQuestion];
    const options = document.querySelectorAll('.option');
    const feedback = document.getElementById('feedback');
    
    options.forEach(opt => opt.onclick = null);
    
    if (selected === q.answer) {
        score++;
        options[selected].classList.add('correct');
        feedback.textContent = '✓ Correct!';
        feedback.className = 'feedback correct';
        document.getElementById('score').textContent = score;
    } else {
        options[selected].classList.add('incorrect');
        options[q.answer].classList.add('correct');
        feedback.textContent = '✗ Wrong! The correct answer was: ' + q.options[q.answer];
        feedback.className = 'feedback incorrect';
    }
    
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        setTimeout(loadQuestion, 2000);
    } else {
        setTimeout(() => {
            alert(`Quiz Complete! Your score: ${score}/${questions.length}`);
            currentQuestion = 0;
            score = 0;
            document.getElementById('score').textContent = score;
            loadQuestion();
        }, 2000);
    }
}

loadQuestion();
console.log('Trivia Game - Built by Abdel Ali');
