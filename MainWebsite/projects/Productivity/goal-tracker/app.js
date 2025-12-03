/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
let goals=JSON.parse(localStorage.getItem('goals'))||[];function addGoal(){const name=document.getElementById('goalName').value;const deadline=document.getElementById('deadline').value;if(name&&deadline){goals.push({id:Date.now(),name,deadline,completed:false});localStorage.setItem('goals',JSON.stringify(goals));document.getElementById('goalName').value='';document.getElementById('deadline').value='';renderGoals()}}function toggleGoal(id){const goal=goals.find(g=>g.id===id);goal.completed=!goal.completed;localStorage.setItem('goals',JSON.stringify(goals));renderGoals()}function deleteGoal(id){goals=goals.filter(g=>g.id!==id);localStorage.setItem('goals',JSON.stringify(goals));renderGoals()}function renderGoals(){const container=document.getElementById('goals');container.innerHTML=goals.map(g=>`<div class="goal-item ${g.completed?'completed':''}"><div><strong>${g.name}</strong><br>Deadline: ${g.deadline}</div><div><button onclick="toggleGoal(${g.id})">✓</button><button onclick="deleteGoal(${g.id})">✗</button></div></div>`).join('')}renderGoals();console.log('Goal Tracker - Built by Abdel Ali');
