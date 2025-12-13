/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

// Mock exchange rates (in real app, use live API like exchangerate-api.com)
const rates = {
    USD: { rate: 1, symbol: '$', name: 'US Dollar' },
    EUR: { rate: 0.85, symbol: '€', name: 'Euro' },
    GBP: { rate: 0.73, symbol: '£', name: 'British Pound' },
    JPY: { rate: 110.0, symbol: '¥', name: 'Japanese Yen' },
    AUD: { rate: 1.35, symbol: 'A$', name: 'Australian Dollar' },
    CAD: { rate: 1.25, symbol: 'C$', name: 'Canadian Dollar' },
    INR: { rate: 74.5, symbol: '₹', name: 'Indian Rupee' },
    CNY: { rate: 6.45, symbol: '¥', name: 'Chinese Yuan' },
    CHF: { rate: 0.92, symbol: 'Fr', name: 'Swiss Franc' },
    SEK: { rate: 8.65, symbol: 'kr', name: 'Swedish Krona' }
};

let conversionHistory = [];

function convert() {
    const amount = parseFloat(document.getElementById('amount').value);
    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency').value;
    
    if (!amount || amount <= 0) {
        showError('Please enter a valid amount!');
        return;
    }
    
    if (from === to) {
        showError('Please select different currencies!');
        return;
    }
    
    // Calculate conversion
    const result = (amount / rates[from].rate) * rates[to].rate;
    const exchangeRate = rates[to].rate / rates[from].rate;
    
    // Display result
    document.getElementById('result').innerHTML = `
        <div class="conversion-result">
            <div class="amount-display">
                ${rates[from].symbol}${amount.toLocaleString()} ${from}
            </div>
            <div class="equals">=</div>
            <div class="result-display">
                ${rates[to].symbol}${result.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${to}
            </div>
        </div>
        <div class="exchange-rate">
            1 ${from} = ${exchangeRate.toFixed(4)} ${to}
        </div>
    `;
    
    document.getElementById('resultBox').style.display = 'block';
    
    // Add to history
    addToHistory(amount, from, result, to, exchangeRate);
    
    // Clear any previous errors
    clearError();
}

function addToHistory(amount, from, result, to, rate) {
    const conversion = {
        amount,
        from,
        result,
        to,
        rate,
        timestamp: new Date().toLocaleTimeString()
    };
    
    conversionHistory.unshift(conversion);
    if (conversionHistory.length > 5) {
        conversionHistory.pop();
    }
    
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyElement = document.getElementById('history');
    if (!historyElement) return;
    
    historyElement.innerHTML = conversionHistory.map(item => `
        <div class="history-item">
            <span>${rates[item.from].symbol}${item.amount} ${item.from} → ${rates[item.to].symbol}${item.result.toFixed(2)} ${item.to}</span>
            <small>${item.timestamp}</small>
        </div>
    `).join('');
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

function showError(message) {
    const errorElement = document.getElementById('error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    } else {
        alert(message);
    }
}

function clearError() {
    const errorElement = document.getElementById('error');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

function clearHistory() {
    conversionHistory = [];
    updateHistoryDisplay();
}

// Auto-convert on input with debouncing
let convertTimeout;
document.getElementById('amount').addEventListener('input', () => {
    clearTimeout(convertTimeout);
    convertTimeout = setTimeout(() => {
        if (document.getElementById('amount').value) {
            convert();
        }
    }, 500);
});

// Enter key support
document.getElementById('amount').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        convert();
    }
});

console.log('Currency Converter - Built by Abdel Ali');