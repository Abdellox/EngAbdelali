/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
const team = [
    { name: 'John Doe', role: 'CEO & Founder', bio: 'Visionary leader with 15 years of experience.' },
    { name: 'Jane Smith', role: 'CTO', bio: 'Tech expert passionate about innovation.' },
    { name: 'Mike Johnson', role: 'Lead Developer', bio: 'Full-stack developer with expertise in modern frameworks.' },
    { name: 'Sarah Williams', role: 'Designer', bio: 'Creative designer focused on user experience.' },
    { name: 'David Brown', role: 'Marketing Manager', bio: 'Strategic marketer with proven track record.' },
    { name: 'Emily Davis', role: 'Product Manager', bio: 'Product strategist driving business growth.' }
];

function renderTeam() {
    const grid = document.getElementById('teamGrid');
    grid.innerHTML = team.map((member, index) => `
        <div class="team-card" onclick="showMemberDetails(${index})">
            <div class="avatar">${member.name.split(' ').map(n => n[0]).join('')}</div>
            <h3>${member.name}</h3>
            <p class="role">${member.role}</p>
        </div>
    `).join('');
}

function showMemberDetails(index) {
    const member = team[index];
    const modal = document.getElementById('memberModal');
    
    document.getElementById('memberName').textContent = member.name;
    document.getElementById('memberRole').textContent = member.role;
    document.getElementById('memberBio').textContent = member.bio;
    document.getElementById('memberAvatar').textContent = member.name.split(' ').map(n => n[0]).join('');
    
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('memberModal').style.display = 'none';
}

renderTeam();
console.log('Team Members - Built by Abdel Ali');
