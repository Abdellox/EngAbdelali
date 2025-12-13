function setTip(percent) {
    document.getElementById('tipPercent').value = percent;
    document.querySelectorAll('.tip-buttons button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    calculate();
}

function calculate() {
    const bill = parseFloat(document.getElementById('bill').value) || 0;
    const tipPercent = parseFloat(document.getElementById('tipPercent').value) || 0;
    const people = parseInt(document.getElementById('people').value) || 1;
    
    if (bill <= 0) {
        document.getElementById('tipAmount').textContent = '$0.00';
        document.getElementById('total').textContent = '$0.00';
        document.getElementById('perPerson').textContent = '$0.00';
        return;
    }
    
    const tipAmount = bill * (tipPercent / 100);
    const total = bill + tipAmount;
    const perPerson = total / people;
    
    document.getElementById('tipAmount').textContent = '$' + tipAmount.toFixed(2);
    document.getElementById('total').textContent = '$' + total.toFixed(2);
    document.getElementById('perPerson').textContent = '$' + perPerson.toFixed(2);
}

function reset() {
    document.getElementById('bill').value = '';
    document.getElementById('tipPercent').value = '15';
    document.getElementById('people').value = '1';
    document.querySelectorAll('.tip-buttons button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('[onclick="setTip(15)"]').classList.add('active');
    calculate();
}

// Event listeners
document.getElementById('bill').addEventListener('input', calculate);
document.getElementById('tipPercent').addEventListener('input', calculate);
document.getElementById('people').addEventListener('input', calculate);

// Initialize
calculate();