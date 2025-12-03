/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
async function searchUser() {
    const username = document.getElementById('username').value.trim();
    if (!username) {
        alert('Please enter a username!');
        return;
    }
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error('User not found');
        
        const data = await response.json();
        displayProfile(data);
    } catch (error) {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('error').style.display = 'block';
    }
}

function displayProfile(user) {
    document.getElementById('error').style.display = 'none';
    document.getElementById('profile').style.display = 'block';
    
    document.getElementById('avatar').src = user.avatar_url;
    document.getElementById('name').textContent = user.name || user.login;
    document.getElementById('bio').textContent = user.bio || 'No bio available';
    document.getElementById('profileLink').href = user.html_url;
    document.getElementById('repos').textContent = user.public_repos;
    document.getElementById('followers').textContent = user.followers;
    document.getElementById('following').textContent = user.following;
}

document.getElementById('username').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchUser();
});

console.log('GitHub Profile Finder - Built by Abdel Ali');
