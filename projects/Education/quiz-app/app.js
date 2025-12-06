// Quiz App - Full Implementation
const questions = [
    { q: 'What is 2 + 2?', options: ['3', '4', '5', '6'], answer: 1 },
    { q: 'What is the capital of France?', options: ['London', 'Berlin', 'Paris', 'Madrid'], answer: 2 },
    { q: 'What is 10 / 2?', options: ['3', '4', '5', '6'], answer: 2 }
];

let currentQ = 0;
let score = 0;

function renderApp() {
    const container = document.querySelector('.app-box');
    
    if (currentQ >= questions.length) {
        container.innerHTML = `
            <h2>❓ Quiz Complete!</h2>
            <p>Your Score: ${score}/${questions.length}</p>
            <button onclick="restart()" class="btn">Restart</button>
        `;
        return;
    }
    
    const q = questions[currentQ];
    container.innerHTML = `
        <h2>❓ Quiz App</h2>
        <p>Question ${currentQ + 1}/${questions.length}</p>
        <h3>${q.q}</h3>
        <div class="options">
            ${q.options.map((opt, i) => 
                `<button onclick="answer(${i})" class="btn">${opt}</button>`
            ).join('')}
        </div>
    `;
}

function answer(selected) {
    if (selected === questions[currentQ].answer) score++;
    currentQ++;
    renderApp();
}

function restart() {
    currentQ = 0;
    score = 0;
    renderApp();
}

renderApp();
console.log('❓ Quiz App Ready');
