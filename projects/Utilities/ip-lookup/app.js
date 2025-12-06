/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
async function getMyIP(){try{const res=await fetch('https://api.ipify.org?format=json');const data=await res.json();document.getElementById('ip').textContent=data.ip;document.getElementById('location').textContent='Demo Location';document.getElementById('isp').textContent='Demo ISP';document.getElementById('timezone').textContent='UTC';document.getElementById('ipInfo').style.display='block'}catch(e){alert('Error fetching IP: '+e.message)}}console.log('IP Lookup - Built by Abdel Ali');
