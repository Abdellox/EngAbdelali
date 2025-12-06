let you = 0;
let comp = 0;

function play(choice) {
    const choices = ['rock', 'paper', 'scissors'];
    const c = choices[Math.floor(Math.random() * 3)];
    
    let result = '';
    
    if (choice === c) {
        result = "It's a Draw!";
    } else if (
        (choice === 'rock' && c === 'scissors') ||
        (choice === 'paper' && c === 'rock') ||
        (choice === 'scissors' && c === 'paper')
    ) {
        result = 'You Win! 🎉';
        you++;
    } else {
        result = 'You Lose! 😢';
        comp++;
    }
    
    document.getElementById('result').textContent = `You: ${choice} | Computer: ${c} - ${result}`;
    document.getElementById('you').textContent = you;
    document.getElementById('comp').textContent = comp;
}

function reset() {
    you = 0;
    comp = 0;
    document.getElementById('you').textContent = you;
    document.getElementById('comp').textContent = comp;
    document.getElementById('result').textContent = 'Choose your move!';
}
