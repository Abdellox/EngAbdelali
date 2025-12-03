/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
let entries=JSON.parse(localStorage.getItem('journal'))||[];function saveEntry(){const title=document.getElementById('title').value;const content=document.getElementById('content').value;if(title&&content){entries.unshift({id:Date.now(),title,content,date:new Date().toLocaleDateString()});localStorage.setItem('journal',JSON.stringify(entries));document.getElementById('title').value='';document.getElementById('content').value='';renderEntries()}}function deleteEntry(id){entries=entries.filter(e=>e.id!==id);localStorage.setItem('journal',JSON.stringify(entries));renderEntries()}function renderEntries(){const container=document.getElementById('entries');container.innerHTML='<h3>Entries</h3>'+entries.map(e=>`<div class="entry"><h4>${e.title}</h4><p>${e.content}</p><small>${e.date}</small><button onclick="deleteEntry(${e.id})">Delete</button></div>`).join('')}renderEntries();console.log('Journal - Built by Abdel Ali');
