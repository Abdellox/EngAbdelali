/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

let score = 0;
let questionNum = 1;
let currentAnswer = 0;

function generateQuestion() {
    const operations = ['+', '-', '*'];
    const op = operations[Math.floor(Math.random() * operations.length)];
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    
    let question = '';
    switch(op) {
        case '+':
            question = `${num1} + ${num2}`;
            currentAnswer = num1 + num2;
            break;
        case '-':
            question = `${num1} - ${num2}`;
            currentAnswer = num1 - num2;
            break;
        case '*':
            question = `${num1} × ${num2}`;
            currentAnswer = num1 * num2;
            break;
    }
    
    document.getElementById('question').textContent = question + ' = ?';
    document.getElementById('answer').value = '';
    document.getElementById('feedback').textContent = '';
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    const feedback = document.getElementById('feedback');
    
    if (isNaN(userAnswer)) {
        feedback.textContent = 'Please enter a number';
        feedback.className = 'feedback incorrect';
        return;
    }
    
    if (userAnswer === currentAnswer) {
        score++;
        feedback.textContent = '✓ Correct!';
        feedback.className = 'feedback correct';
    } else {
        feedback.textContent = `✗ Wrong! The answer was ${currentAnswer}`;
        feedback.className = 'feedback incorrect';
    }
    
    document.getElementById('score').textContent = score;
    
    if (questionNum < 10) {
        questionNum++;
        document.getElementById('questionNum').textContent = questionNum;
        setTimeout(generateQuestion, 1500);
    } else {
        setTimeout(() => {
            alert(`Quiz Complete! Your score: ${score}/10`);
            score = 0;
            questionNum = 1;
            document.getElementById('score').textContent = score;
            document.getElementById('questionNum').textContent = questionNum;
            generateQuestion();
        }, 1500);
    }
}

generateQuestion();
console.log('Math Quiz - Built by Abdel Ali');
