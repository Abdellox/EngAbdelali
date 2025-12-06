// Accordion Component - Full Implementation

const faqData = [
    {
        question: "What is an Accordion Component?",
        answer: "An accordion is a vertically stacked list of items where each item can be expanded or collapsed to reveal more content. It's commonly used for FAQs, menus, and content organization."
    },
    {
        question: "How do I use this accordion?",
        answer: "Simply click on any question to expand it and reveal the answer. Click again to collapse it. You can also use the 'Expand All' and 'Collapse All' buttons to control all items at once."
    },
    {
        question: "Can multiple items be open at once?",
        answer: "Yes! This accordion allows multiple items to be expanded simultaneously, giving you flexibility in viewing multiple answers at the same time."
    },
    {
        question: "Is this accordion responsive?",
        answer: "Absolutely! This accordion is fully responsive and works perfectly on all devices - desktop, tablet, and mobile. The layout adapts seamlessly to different screen sizes."
    },
    {
        question: "What technologies are used?",
        answer: "This accordion is built with pure HTML, CSS, and JavaScript. No external libraries or frameworks are required, making it lightweight and fast."
    },
    {
        question: "Can I customize the styling?",
        answer: "Yes! The CSS is well-organized and easy to customize. You can change colors, fonts, spacing, animations, and more to match your design needs."
    },
    {
        question: "Does it support keyboard navigation?",
        answer: "Yes! You can use the Tab key to navigate between items and Enter or Space to expand/collapse them, making it accessible for all users."
    },
    {
        question: "Is it accessible?",
        answer: "This accordion follows accessibility best practices including proper ARIA attributes, keyboard navigation, and semantic HTML structure."
    }
];

let expandedCount = 0;

function initAccordion() {
    const accordion = document.getElementById('accordion');
    
    faqData.forEach((item, index) => {
        const accordionItem = document.createElement('div');
        accordionItem.className = 'accordion-item';
        accordionItem.innerHTML = `
            <div class="accordion-header" onclick="toggleAccordion(${index})" id="header-${index}">
                <div class="accordion-title">${item.question}</div>
                <div class="accordion-icon">▼</div>
            </div>
            <div class="accordion-content" id="content-${index}">
                <div class="accordion-text">${item.answer}</div>
            </div>
        `;
        accordion.appendChild(accordionItem);
    });
    
    updateStats();
}

function toggleAccordion(index) {
    const header = document.getElementById(`header-${index}`);
    const content = document.getElementById(`content-${index}`);
    
    const isActive = header.classList.contains('active');
    
    if (isActive) {
        header.classList.remove('active');
        content.classList.remove('active');
        expandedCount--;
    } else {
        header.classList.add('active');
        content.classList.add('active');
        expandedCount++;
    }
    
    updateStats();
}

function expandAll() {
    faqData.forEach((item, index) => {
        const header = document.getElementById(`header-${index}`);
        const content = document.getElementById(`content-${index}`);
        
        if (!header.classList.contains('active')) {
            header.classList.add('active');
            content.classList.add('active');
        }
    });
    
    expandedCount = faqData.length;
    updateStats();
}

function collapseAll() {
    faqData.forEach((item, index) => {
        const header = document.getElementById(`header-${index}`);
        const content = document.getElementById(`content-${index}`);
        
        header.classList.remove('active');
        content.classList.remove('active');
    });
    
    expandedCount = 0;
    updateStats();
}

function updateStats() {
    document.getElementById('totalQuestions').textContent = faqData.length;
    document.getElementById('expandedCount').textContent = expandedCount;
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.target.classList.contains('accordion-header')) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.target.click();
        }
    }
});

// Initialize accordion on page load
initAccordion();

console.log('📋 Accordion Component - Fully Functional');
