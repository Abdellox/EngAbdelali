// Random User Generator - Full Implementation
const users = [
    { name: 'John Doe', email: 'john@example.com', avatar: '👨' },
    { name: 'Jane Smith', email: 'jane@example.com', avatar: '👩' },
    { name: 'Bob Johnson', email: 'bob@example.com', avatar: '👨‍💼' },
    { name: 'Alice Williams', email: 'alice@example.com', avatar: '👩‍💼' }
];

function renderApp() {
    const container = document.querySelector('.app-box');
    container.innerHTML = `
        <h2>👥 Random User</h2>
        <div id="userCard" class="user-card">Click Generate!</div>
        <button onclick="generateUser()" class="btn">Generate User</button>
    `;
}

function generateUser() {
    const user = users[Math.floor(Math.random() * users.length)];
    document.getElementById('userCard').innerHTML = `
        <div class="avatar">${user.avatar}</div>
        <h3>${user.name}</h3>
        <p>${user.email}</p>
    `;
}

renderApp();
console.log('👥 Random User Ready');
