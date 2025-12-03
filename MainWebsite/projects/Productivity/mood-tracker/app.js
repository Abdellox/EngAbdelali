/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
let moods=JSON.parse(localStorage.getItem('moods'))||[];function logMood(mood){moods.unshift({mood,date:new Date().toLocaleString()});if(moods.length>10)moods.pop();localStorage.setItem('moods',JSON.stringify(moods));renderHistory()}function renderHistory(){const history=document.getElementById('history');history.innerHTML='<h3>Recent Moods</h3>'+moods.map(m=>`<div class="mood-entry"><span>${m.mood}</span><span>${m.date}</span></div>`).join('')}renderHistory();console.log('Mood Tracker - Built by Abdel Ali');
