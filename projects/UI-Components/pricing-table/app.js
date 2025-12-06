/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

const pricingPlans = [
    {
        name: 'Basic',
        price: '$9',
        period: '/month',
        features: [
            { text: '10 Projects', included: true },
            { text: '5GB Storage', included: true },
            { text: 'Basic Support', included: true },
            { text: 'Advanced Analytics', included: false },
            { text: 'Priority Support', included: false }
        ],
        popular: false
    },
    {
        name: 'Pro',
        price: '$29',
        period: '/month',
        features: [
            { text: 'Unlimited Projects', included: true },
            { text: '50GB Storage', included: true },
            { text: 'Priority Support', included: true },
            { text: 'Advanced Analytics', included: true },
            { text: 'Custom Domain', included: false }
        ],
        popular: true
    },
    {
        name: 'Enterprise',
        price: '$99',
        period: '/month',
        features: [
            { text: 'Unlimited Everything', included: true },
            { text: 'Unlimited Storage', included: true },
            { text: '24/7 Support', included: true },
            { text: 'Advanced Analytics', included: true },
            { text: 'Custom Solutions', included: true }
        ],
        popular: false
    }
];

const pricingGrid = document.getElementById('pricingGrid');

function renderPricing() {
    pricingGrid.innerHTML = pricingPlans.map(plan => `
        <div class="pricing-card ${plan.popular ? 'popular' : ''}">
            ${plan.popular ? '<div class="popular-badge">Most Popular</div>' : ''}
            <h3 class="plan-name">${plan.name}</h3>
            <div class="plan-price">
                <span class="price">${plan.price}</span>
                <span class="period">${plan.period}</span>
            </div>
            <ul class="features-list">
                ${plan.features.map(feature => `
                    <li class="${feature.included ? 'included' : 'excluded'}">
                        <span class="icon">${feature.included ? '✓' : '✗'}</span>
                        ${feature.text}
                    </li>
                `).join('')}
            </ul>
            <button class="btn ${plan.popular ? 'btn-popular' : ''}">Choose Plan</button>
        </div>
    `).join('');
}

renderPricing();

console.log('Pricing Table - Built by Abdel Ali');
