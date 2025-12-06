// Joke Generator - Full Implementation
const jokes = [
    'Why do programmers prefer dark mode? Light attracts bugs!',
    'Why did the developer go broke? He used up all his cache!',
    'How many programmers does it take to change a light bulb? None, thats a hardware problem!',
    'Why do Java developers wear glasses? Because they dont C#!',
    'A SQL query walks into a bar, walks up to two tables and asks: Can I join you?',
    'Why do programmers always mix up Halloween and Christmas? Because Oct 31 == Dec 25!',
    'There are 10 types of people in the world: those who understand binary and those who dont.',
    'A programmer is told to go to the store and get a gallon of milk, and if they have eggs, get a dozen. They return with 12 gallons of milk.',
    'Why did the programmer quit his job? Because he didnt get arrays!',
    'How do you comfort a JavaScript bug? You console it!'
];

let lastJoke = -1;

function getJoke() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * jokes.length);
    } while (randomIndex === lastJoke && jokes.length > 1);
    
    lastJoke = randomIndex;
    const jokeEl = document.getElementById('joke');
    jokeEl.style.opacity = '0';
    
    setTimeout(() => {
        jokeEl.textContent = jokes[randomIndex];
        jokeEl.style.opacity = '1';
    }, 200);
}

console.log('😂 Joke Generator Ready');
