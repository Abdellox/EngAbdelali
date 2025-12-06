/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
let habits = JSON.parse(localStorage.getItem('habits')) || [];

function addHabit() {
    const name = document.getElementById('habitName').value;
    if (!name) {
        alert('Please enter a habit name!');
        return;
    }
    
    habits.push({
        id: Date.now(),
        name,
        streak: 0,
        lastCompleted: null,
        completedDates: []
    });
    
    saveHabits();
    renderHabits();
    document.getElementById('habitName').value = '';
}

function renderHabits() {
    const list = document.getElementById('habitList');
    const today = new Date().toDateString();
    
    list.innerHTML = habits.map(habit => {
        const completedToday = habit.lastCompleted === today;
        return `
            <div class="habit-item">
                <div>
                    <div class="habit-name">${habit.name}</div>
                    <div class="habit-streak">🔥 ${habit.streak} day streak</div>
                </div>
                <div>
                    <button onclick="toggleHabit(${habit.id})" class="check-btn ${completedToday ? 'completed' : ''}">
                        ${completedToday ? '✓' : '○'}
                    </button>
                    <button onclick="deleteHabit(${habit.id})" class="delete-btn">×</button>
                </div>
            </div>
        `;
    }).join('');
    
    updateStats();
}

function toggleHabit(id) {
    const habit = habits.find(h => h.id === id);
    const today = new Date().toDateString();
    
    if (habit.lastCompleted === today) {
        // Uncomplete
        habit.lastCompleted = null;
        habit.streak = Math.max(0, habit.streak - 1);
        habit.completedDates = habit.completedDates.filter(d => d !== today);
    } else {
        // Complete
        habit.lastCompleted = today;
        habit.streak++;
        habit.completedDates.push(today);
    }
    
    saveHabits();
    renderHabits();
}

function deleteHabit(id) {
    if (confirm('Delete this habit?')) {
        habits = habits.filter(h => h.id !== id);
        saveHabits();
        renderHabits();
    }
}

function updateStats() {
    const totalHabits = habits.length;
    const today = new Date().toDateString();
    const completedToday = habits.filter(h => h.lastCompleted === today).length;
    const totalStreak = habits.reduce((sum, h) => sum + h.streak, 0);
    
    document.getElementById('totalHabits').textContent = totalHabits;
    document.getElementById('completedToday').textContent = completedToday;
    document.getElementById('totalStreak').textContent = totalStreak;
}

function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
}

renderHabits();
console.log('Habit Tracker - Built by Abdel Ali');
