/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

const profiles = [
    {
        name: 'John Doe',
        role: 'Full Stack Developer',
        bio: 'Passionate about creating amazing web experiences',
        followers: '1.2K',
        following: '342',
        posts: '89',
        avatar: '👨‍💻'
    },
    {
        name: 'Jane Smith',
        role: 'UI/UX Designer',
        bio: 'Designing beautiful and intuitive interfaces',
        followers: '2.5K',
        following: '567',
        posts: '124',
        avatar: '👩‍🎨'
    },
    {
        name: 'Mike Johnson',
        role: 'Product Manager',
        bio: 'Building products that users love',
        followers: '890',
        following: '234',
        posts: '56',
        avatar: '👨‍💼'
    }
];

const profileGrid = document.getElementById('profileGrid');

function renderProfiles() {
    profileGrid.innerHTML = profiles.map(profile => `
        <div class="profile-card">
            <div class="profile-header">
                <div class="profile-avatar">${profile.avatar}</div>
            </div>
            <div class="profile-body">
                <h3 class="profile-name">${profile.name}</h3>
                <p class="profile-role">${profile.role}</p>
                <p class="profile-bio">${profile.bio}</p>
                <div class="profile-stats">
                    <div class="stat">
                        <strong>${profile.followers}</strong>
                        <span>Followers</span>
                    </div>
                    <div class="stat">
                        <strong>${profile.following}</strong>
                        <span>Following</span>
                    </div>
                    <div class="stat">
                        <strong>${profile.posts}</strong>
                        <span>Posts</span>
                    </div>
                </div>
                <div class="profile-actions">
                    <button class="btn btn-primary">Follow</button>
                    <button class="btn btn-secondary">Message</button>
                </div>
            </div>
        </div>
    `).join('');
}

renderProfiles();

console.log('Profile Card - Built by Abdel Ali');
