let display = '0';
let operator = '';
let prevValue = '';
let newNumber = true;

function updateDisplay() {
    document.getElementById('display').textContent = display;
}

function appendNumber(num) {
    if (newNumber) {
        display = num;
        newNumber = false;
    } else {
        display = display === '0' ? num : display + num;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (!newNumber) {
        calculate();
    }
    prevValue = display;
    operator = op;
    newNumber = true;
}

function calculate() {
    if (operator && prevValue) {
        const prev = parseFloat(prevValue);
        const curr = parseFloat(display);
        let result;
        
        switch (operator) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '/':
                result = curr !== 0 ? prev / curr : 'Error';
                break;
            case '%':
                result = prev % curr;
                break;
        }
        
        display = result.toString();
        operator = '';
        prevValue = '';
        newNumber = true;
        updateDisplay();
    }
}

function clearDisplay() {
    display = '0';
    operator = '';
    prevValue = '';
    newNumber = true;
    updateDisplay();
}

function deleteLast() {
    display = display.length > 1 ? display.slice(0, -1) : '0';
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', e => {
    if (/[0-9.]/.test(e.key)) {
        appendNumber(e.key);
    } else if (['+', '-', '*', '/', '%'].includes(e.key)) {
        appendOperator(e.key);
    } else if (e.key === 'Enter') {
        calculate();
    } else if (e.key === 'Escape') {
        clearDisplay();
    } else if (e.key === 'Backspace') {
        deleteLast();
    }
});
