/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function addExpense() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    
    if (!description || !amount) {
        alert('Please fill all fields!');
        return;
    }
    
    expenses.push({
        id: Date.now(),
        description,
        amount,
        category,
        date: new Date().toLocaleDateString()
    });
    
    saveExpenses();
    renderExpenses();
    updateSummary();
    
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
}

function renderExpenses() {
    const list = document.getElementById('expenseList');
    list.innerHTML = expenses.map(exp => `
        <div class="expense-item">
            <div>
                <div class="expense-desc">${exp.description}</div>
                <div class="expense-date">${exp.date} • ${exp.category}</div>
            </div>
            <div>
                <span class="expense-amount">$${exp.amount.toFixed(2)}</span>
                <button onclick="deleteExpense(${exp.id})" class="delete-btn">×</button>
            </div>
        </div>
    `).join('');
}

function deleteExpense(id) {
    expenses = expenses.filter(exp => exp.id !== id);
    saveExpenses();
    renderExpenses();
    updateSummary();
}

function updateSummary() {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    document.getElementById('totalExpenses').textContent = '$' + total.toFixed(2);
    document.getElementById('expenseCount').textContent = expenses.length;
    
    const categories = {};
    expenses.forEach(exp => {
        categories[exp.category] = (categories[exp.category] || 0) + exp.amount;
    });
    
    const topCategory = Object.keys(categories).length > 0 
        ? Object.keys(categories).reduce((a, b) => categories[a] > categories[b] ? a : b)
        : 'None';
    document.getElementById('topCategory').textContent = topCategory;
}

function filterByCategory(category) {
    const filtered = category === 'all' ? expenses : expenses.filter(exp => exp.category === category);
    const list = document.getElementById('expenseList');
    list.innerHTML = filtered.map(exp => `
        <div class="expense-item">
            <div>
                <div class="expense-desc">${exp.description}</div>
                <div class="expense-date">${exp.date} • ${exp.category}</div>
            </div>
            <div>
                <span class="expense-amount">$${exp.amount.toFixed(2)}</span>
                <button onclick="deleteExpense(${exp.id})" class="delete-btn">×</button>
            </div>
        </div>
    `).join('');
}

function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Initialize
renderExpenses();
updateSummary();
