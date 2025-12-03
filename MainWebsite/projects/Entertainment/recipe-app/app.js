// Recipe App - Demo
const recipes = [
    { name: 'Pasta Carbonara', time: '30 min', difficulty: 'Easy' },
    { name: 'Chicken Curry', time: '45 min', difficulty: 'Medium' },
    { name: 'Chocolate Cake', time: '60 min', difficulty: 'Hard' }
];

function renderApp() {
    const container = document.querySelector('.app-box');
    container.innerHTML = `
        <h2>🍳 Recipe App</h2>
        <div class="recipe-list">
            ${recipes.map(r => `
                <div class="recipe-card">
                    <h3>${r.name}</h3>
                    <p>⏱️ ${r.time}</p>
                    <p>📊 ${r.difficulty}</p>
                </div>
            `).join('')}
        </div>
    `;
}

renderApp();
console.log('🍳 Recipe App Ready');
