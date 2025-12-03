/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
const faqs = [
    {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day money-back guarantee on all purchases. If you\'re not satisfied, contact us for a full refund.'
    },
    {
        question: 'How long does shipping take?',
        answer: 'Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business days.'
    },
    {
        question: 'Do you ship internationally?',
        answer: 'Yes, we ship to over 100 countries worldwide. Shipping costs vary by location.'
    },
    {
        question: 'How can I track my order?',
        answer: 'Once your order ships, you\'ll receive a tracking number via email. Use it to track your package.'
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, PayPal, Apple Pay, and Google Pay.'
    }
];

function createFAQ() {
    const container = document.getElementById('faqContainer');
    container.innerHTML = faqs.map((faq, index) => `
        <div class="faq-item">
            <div class="faq-question" onclick="toggleFAQ(${index})">
                <span>${faq.question}</span>
                <span class="faq-icon" id="icon-${index}">+</span>
            </div>
            <div class="faq-answer" id="answer-${index}">
                <p>${faq.answer}</p>
            </div>
        </div>
    `).join('');
}

function toggleFAQ(index) {
    const answer = document.getElementById(`answer-${index}`);
    const icon = document.getElementById(`icon-${index}`);
    const isOpen = answer.style.maxHeight;
    
    // Close all
    document.querySelectorAll('.faq-answer').forEach(item => {
        item.style.maxHeight = null;
    });
    document.querySelectorAll('.faq-icon').forEach(item => {
        item.textContent = '+';
    });
    
    // Open clicked if it was closed
    if (!isOpen) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.textContent = '−';
    }
}

createFAQ();
console.log('FAQ Section - Built by Abdel Ali');
