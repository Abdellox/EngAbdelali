// Random Quote Generator - Full Implementation
const quotes = [
    { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
    { text: 'Innovation distinguishes between a leader and a follower.', author: 'Steve Jobs' },
    { text: 'Life is what happens when you\'re busy making other plans.', author: 'John Lennon' },
    { text: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt' },
    { text: 'It is during our darkest moments that we must focus to see the light.', author: 'Aristotle' }
];

function renderApp() {
    const container = document.querySelector('.app-box');
    container.innerHTML = `
        <h2>💭 Random Quote</h2>
        <div id="quote" class="quote">Click for a quote!</div>
        <div id="author" class="author"></div>
        <button onclick="getQuote()" class="btn">New Quote</button>
    `;
}

function getQuote() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quote').textContent = `"${quote.text}"`;
    document.getElementById('author').textContent = `- ${quote.author}`;
}

renderApp();
console.log('💭 Random Quote Ready');
