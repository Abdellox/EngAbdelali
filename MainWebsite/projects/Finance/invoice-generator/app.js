/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

let items = [];

// DOM Elements
const companyName = document.getElementById('companyName');
const companyEmail = document.getElementById('companyEmail');
const companyAddress = document.getElementById('companyAddress');
const clientName = document.getElementById('clientName');
const clientEmail = document.getElementById('clientEmail');
const clientAddress = document.getElementById('clientAddress');
const invoiceNumber = document.getElementById('invoiceNumber');
const invoiceDate = document.getElementById('invoiceDate');
const dueDate = document.getElementById('dueDate');
const itemsContainer = document.getElementById('itemsContainer');
const addItemBtn = document.getElementById('addItemBtn');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const invoicePreview = document.getElementById('invoicePreview');

// Set default dates
const today = new Date().toISOString().split('T')[0];
const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
invoiceDate.value = today;
dueDate.value = nextMonth;

// Event Listeners
addItemBtn.addEventListener('click', addItem);
generateBtn.addEventListener('click', generateInvoice);
downloadBtn.addEventListener('click', downloadPDF);

// Add input listeners for auto-update
[companyName, companyEmail, companyAddress, clientName, clientEmail, clientAddress, 
 invoiceNumber, invoiceDate, dueDate].forEach(input => {
    input.addEventListener('input', generateInvoice);
});

// Add initial item
addItem();

function addItem() {
    const item = {
        id: Date.now(),
        description: '',
        quantity: 1,
        price: 0
    };
    
    items.push(item);
    renderItems();
}

function removeItem(id) {
    items = items.filter(item => item.id !== id);
    renderItems();
    generateInvoice();
}

function updateItem(id, field, value) {
    const item = items.find(i => i.id === id);
    if (item) {
        if (field === 'quantity') {
            item[field] = parseInt(value) || 0;
        } else if (field === 'price') {
            item[field] = parseFloat(value) || 0;
        } else {
            item[field] = value;
        }
        generateInvoice();
    }
}

function renderItems() {
    itemsContainer.innerHTML = items.map(item => `
        <div class="item-row">
            <input type="text" 
                   placeholder="Item description" 
                   value="${item.description}"
                   onchange="updateItem(${item.id}, 'description', this.value)">
            <input type="number" 
                   placeholder="Qty" 
                   value="${item.quantity}"
                   min="1"
                   onchange="updateItem(${item.id}, 'quantity', this.value)">
            <input type="number" 
                   placeholder="Price" 
                   value="${item.price}"
                   min="0"
                   step="0.01"
                   onchange="updateItem(${item.id}, 'price', this.value)">
            <button class="remove-item-btn" onclick="removeItem(${item.id})">✕</button>
        </div>
    `).join('');
}

function calculateTotal() {
    return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
}

function formatCurrency(amount) {
    return '$' + amount.toFixed(2);
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function generateInvoice() {
    const subtotal = calculateTotal();
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    invoicePreview.innerHTML = `
        <div class="invoice-document">
            <div class="invoice-header">
                <div class="invoice-title">
                    <h1>INVOICE</h1>
                    <p class="invoice-num">#${invoiceNumber.value || 'INV-001'}</p>
                </div>
                <div class="company-info">
                    <h3>${companyName.value || 'Your Company'}</h3>
                    <p>${companyEmail.value || 'email@company.com'}</p>
                    <p>${companyAddress.value || 'Your Address'}</p>
                </div>
            </div>

            <div class="invoice-details">
                <div class="bill-to">
                    <h4>Bill To:</h4>
                    <p><strong>${clientName.value || 'Client Name'}</strong></p>
                    <p>${clientEmail.value || 'client@email.com'}</p>
                    <p>${clientAddress.value || 'Client Address'}</p>
                </div>
                <div class="invoice-dates">
                    <p><strong>Invoice Date:</strong> ${formatDate(invoiceDate.value)}</p>
                    <p><strong>Due Date:</strong> ${formatDate(dueDate.value)}</p>
                </div>
            </div>

            <table class="invoice-table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    ${items.map(item => `
                        <tr>
                            <td>${item.description || 'Item'}</td>
                            <td>${item.quantity}</td>
                            <td>${formatCurrency(item.price)}</td>
                            <td>${formatCurrency(item.quantity * item.price)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <div class="invoice-summary">
                <div class="summary-row">
                    <span>Subtotal:</span>
                    <span>${formatCurrency(subtotal)}</span>
                </div>
                <div class="summary-row">
                    <span>Tax (10%):</span>
                    <span>${formatCurrency(tax)}</span>
                </div>
                <div class="summary-row total-row">
                    <span>Total:</span>
                    <span>${formatCurrency(total)}</span>
                </div>
            </div>

            <div class="invoice-footer">
                <p>Thank you for your business!</p>
                <p class="payment-terms">Payment is due within 30 days. Please include invoice number with payment.</p>
            </div>
        </div>
    `;
}

function downloadPDF() {
    // Create a printable version
    const printWindow = window.open('', '', 'width=800,height=600');
    const invoiceContent = invoicePreview.innerHTML;
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Invoice ${invoiceNumber.value || 'INV-001'}</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: Arial, sans-serif; padding: 40px; }
                .invoice-document { max-width: 800px; margin: 0 auto; }
                .invoice-header { display: flex; justify-content: space-between; margin-bottom: 40px; border-bottom: 3px solid #667eea; padding-bottom: 20px; }
                .invoice-title h1 { color: #667eea; font-size: 2.5em; }
                .invoice-num { color: #999; margin-top: 5px; }
                .company-info { text-align: right; }
                .company-info h3 { margin-bottom: 10px; }
                .company-info p { color: #666; line-height: 1.6; }
                .invoice-details { display: flex; justify-content: space-between; margin-bottom: 40px; }
                .bill-to h4 { margin-bottom: 10px; color: #667eea; }
                .bill-to p { line-height: 1.6; }
                .invoice-dates p { line-height: 1.8; }
                .invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                .invoice-table th { background: #f8f9fa; padding: 12px; text-align: left; border-bottom: 2px solid #e0e0e0; }
                .invoice-table td { padding: 12px; border-bottom: 1px solid #e0e0e0; }
                .invoice-summary { max-width: 300px; margin-left: auto; }
                .summary-row { display: flex; justify-content: space-between; padding: 10px 0; }
                .total-row { border-top: 2px solid #667eea; margin-top: 10px; padding-top: 15px; font-size: 1.3em; font-weight: bold; color: #667eea; }
                .invoice-footer { margin-top: 40px; text-align: center; color: #666; }
                .payment-terms { margin-top: 10px; font-size: 0.9em; }
                @media print { body { padding: 20px; } }
            </style>
        </head>
        <body>
            ${invoiceContent}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 250);
}

// Generate initial preview
generateInvoice();

console.log('Invoice Generator - Built by Abdel Ali');
