const rates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.0,
    AUD: 1.35,
    CAD: 1.25,
    INR: 74.5
};

function convert() {
    const amount = parseFloat(document.getElementById('amount').value);
    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency').value;
    
    if (!amount || amount <= 0) {
        alert('Enter a valid amount!');
        return;
    }
    
    const result = (amount / rates[from]) * rates[to];
    
    document.getElementById('result').textContent = 
        `${amount} ${from} = ${result.toFixed(2)} ${to}`;
    document.getElementById('resultBox').style.display = 'block';
}

function swap() {
    const from = document.getElementById('fromCurrency');
    const to = document.getElementById('toCurrency');
    
    const temp = from.value;
    from.value = to.value;
    to.value = temp;
    
    if (document.getElementById('amount').value) {
        convert();
    }
}

// Auto-convert on input
document.getElementById('amount').addEventListener('input', () => {
    if (document.getElementById('amount').value) {
        convert();
    }
});
