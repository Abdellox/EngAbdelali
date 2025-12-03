/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
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
    
    const tipAmount = bill * (tipPercent / 100);
    const total = bill + tipAmount;
    const perPerson = total / people;
    
    document.getElementById('tipAmount').textContent = '$' + tipAmount.toFixed(2);
    document.getElementById('total').textContent = '$' + total.toFixed(2);
    document.getElementById('perPerson').textContent = '$' + perPerson.toFixed(2);
}

document.getElementById('bill').addEventListener('input', calculate);
document.getElementById('tipPercent').addEventListener('input', calculate);
document.getElementById('people').addEventListener('input', calculate);

console.log('Tip Calculator - Built by Abdel Ali');
