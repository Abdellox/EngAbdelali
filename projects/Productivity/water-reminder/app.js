/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
let count=0;const goal=8;function addGlass(){if(count<goal){count++;updateDisplay()}}function reset(){count=0;updateDisplay()}function updateDisplay(){document.getElementById('progress').textContent=`${count}/${goal}`;const percentage=(count/goal)*100;document.querySelector('.progress-circle').style.background=`conic-gradient(#667eea ${percentage*3.6}deg, #f8fafc 0deg)`;if(count>=goal){alert('🎉 Goal achieved! Great job staying hydrated!')}}updateDisplay();console.log('Water Reminder - Built by Abdel Ali');
