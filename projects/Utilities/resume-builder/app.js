function generateResume() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const summary = document.getElementById('summary').value;
    const skills = document.getElementById('skills').value;
    const experience = document.getElementById('experience').value;
    const education = document.getElementById('education').value;

    if (!fullName) {
        alert('Please enter your name!');
        return;
    }

    const preview = document.getElementById('resumePreview');
    const skillsList = skills.split(',').map(s => `<span class="skill-tag">${s.trim()}</span>`).join('');
    
    preview.innerHTML = `
        <div class="resume-content">
            <div class="resume-header">
                <h1>${fullName}</h1>
                <div class="contact-info">
                    ${email ? `<span>📧 ${email}</span>` : ''}
                    ${phone ? `<span>📱 ${phone}</span>` : ''}
                </div>
            </div>
            
            ${summary ? `
            <div class="resume-section">
                <h2>Professional Summary</h2>
                <p>${summary}</p>
            </div>
            ` : ''}
            
            ${skills ? `
            <div class="resume-section">
                <h2>Skills</h2>
                <div class="skills-list">${skillsList}</div>
            </div>
            ` : ''}
            
            ${experience ? `
            <div class="resume-section">
                <h2>Experience</h2>
                <pre>${experience}</pre>
            </div>
            ` : ''}
            
            ${education ? `
            <div class="resume-section">
                <h2>Education</h2>
                <pre>${education}</pre>
            </div>
            ` : ''}
        </div>
    `;
}

function downloadPDF() {
    const preview = document.getElementById('resumePreview');
    if (preview.querySelector('.placeholder')) {
        alert('Please generate resume first!');
        return;
    }
    
    alert('PDF download feature would require a library like jsPDF or html2pdf. For now, you can print this page (Ctrl+P) and save as PDF!');
    window.print();
}

// Auto-generate on input
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
        if (document.getElementById('fullName').value) {
            generateResume();
        }
    });
});

console.log('📄 Resume Builder Ready');
