/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
function calculate() {
    const amount = parseFloat(document.getElementById('amount').value);
    const rate = parseFloat(document.getElementById('rate').value) / 100 / 12;
    const years = parseFloat(document.getElementById('years').value);
    const months = years * 12;
    
    if (!amount || !rate || !years) {
        alert('Please fill all fields!');
        return;
    }
    
    const monthlyPayment = (amount * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - amount;
    
    document.getElementById('monthly').textContent = '$' + monthlyPayment.toFixed(2);
    document.getElementById('total').textContent = '$' + totalPayment.toFixed(2);
    document.getElementById('interest').textContent = '$' + totalInterest.toFixed(2);
    
    document.getElementById('results').style.display = 'block';
    
    generateSchedule(amount, monthlyPayment, rate, months);
}

function generateSchedule(principal, payment, rate, months) {
    let balance = principal;
    let schedule = '';
    
    for (let i = 1; i <= Math.min(12, months); i++) {
        const interest = balance * rate;
        const principalPaid = payment - interest;
        balance -= principalPaid;
        
        schedule += `
            <tr>
                <td>${i}</td>
                <td>$${payment.toFixed(2)}</td>
                <td>$${principalPaid.toFixed(2)}</td>
                <td>$${interest.toFixed(2)}</td>
                <td>$${balance.toFixed(2)}</td>
            </tr>
        `;
    }
    
    document.getElementById('scheduleBody').innerHTML = schedule;
}

document.getElementById('amount').addEventListener('input', calculate);
document.getElementById('rate').addEventListener('input', calculate);
document.getElementById('years').addEventListener('input', calculate);

console.log('Loan Calculator - Built by Abdel Ali');
