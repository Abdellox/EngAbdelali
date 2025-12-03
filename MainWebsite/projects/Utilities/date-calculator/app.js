function switchTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
    document.getElementById(`${tab}Tab`).classList.add('active');
    document.getElementById(`${tab}Content`).style.display = 'block';
    document.getElementById('calcType').value = tab;
}

function calculate() {
    const type = document.getElementById('calcType').value;
    if (type === 'diff') {
        calculateDiff();
    } else {
        calculateAdd();
    }
}

function calculateDiff() {
    const date1 = new Date(document.getElementById('date1').value);
    const date2 = new Date(document.getElementById('date2').value);
    
    if (!date1 || !date2 || isNaN(date1) || isNaN(date2)) {
        alert('Select both dates!');
        return;
    }
    
    const diff = Math.abs(date2 - date1);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    
    document.getElementById('result').innerHTML = `
        <h3>Difference</h3>
        <p>${days} days</p>
        <p>${weeks} weeks</p>
        <p>${months} months (approx)</p>
        <p>${years} years (approx)</p>
    `;
    document.getElementById('resultBox').style.display = 'block';
}

function calculateAdd() {
    const date = new Date(document.getElementById('startDate').value);
    const days = parseInt(document.getElementById('daysToAdd').value) || 0;
    
    if (!date || isNaN(date)) {
        alert('Select a date!');
        return;
    }
    
    date.setDate(date.getDate() + days);
    
    document.getElementById('result').innerHTML = `
        <h3>Result Date</h3>
        <p>${date.toDateString()}</p>
        <p>${date.toLocaleDateString()}</p>
    `;
    document.getElementById('resultBox').style.display = 'block';
}
