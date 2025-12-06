/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

let workouts = JSON.parse(localStorage.getItem('fitnessWorkouts')) || [];

// DOM Elements
const exerciseTypeSelect = document.getElementById('exerciseType');
const customExerciseInput = document.getElementById('customExercise');
const setsInput = document.getElementById('sets');
const repsInput = document.getElementById('reps');
const addWorkoutBtn = document.getElementById('addWorkout');
const workoutsList = document.getElementById('workoutsList');

// Event Listeners
addWorkoutBtn.addEventListener('click', addWorkout);

exerciseTypeSelect.addEventListener('change', function() {
    if (this.value === 'Other') {
        customExerciseInput.focus();
    }
});

// Add workout function
function addWorkout() {
    const exerciseType = exerciseTypeSelect.value;
    const customExercise = customExerciseInput.value.trim();
    const sets = parseInt(setsInput.value);
    const reps = parseInt(repsInput.value);

    // Validation
    if (!exerciseType && !customExercise) {
        alert('Please select or enter an exercise type');
        return;
    }

    if (!sets || sets < 1) {
        alert('Please enter a valid number of sets');
        return;
    }

    if (!reps || reps < 1) {
        alert('Please enter a valid number of reps/duration');
        return;
    }

    // Determine exercise name
    const exerciseName = customExercise || exerciseType;

    // Create workout object
    const workout = {
        id: Date.now(),
        exercise: exerciseName,
        sets: sets,
        reps: reps,
        date: new Date().toISOString(),
        dateString: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };

    // Add to array
    workouts.unshift(workout);
    
    // Save to localStorage
    localStorage.setItem('fitnessWorkouts', JSON.stringify(workouts));

    // Clear inputs
    exerciseTypeSelect.value = '';
    customExerciseInput.value = '';
    setsInput.value = '';
    repsInput.value = '';

    // Update UI
    renderWorkouts();
    updateStats();
}

// Delete workout function
function deleteWorkout(id) {
    if (confirm('Are you sure you want to delete this workout?')) {
        workouts = workouts.filter(w => w.id !== id);
        localStorage.setItem('fitnessWorkouts', JSON.stringify(workouts));
        renderWorkouts();
        updateStats();
    }
}

// Render workouts
function renderWorkouts() {
    if (workouts.length === 0) {
        workoutsList.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">No workouts yet. Start tracking your fitness journey!</p>';
        return;
    }

    workoutsList.innerHTML = workouts.map(workout => `
        <div class="workout-item">
            <div class="workout-info">
                <div class="workout-type">${workout.exercise}</div>
                <div class="workout-details">
                    <span>📊 ${workout.sets} sets</span>
                    <span>🔢 ${workout.reps} reps</span>
                </div>
                <div class="workout-date">📅 ${workout.dateString}</div>
            </div>
            <button class="delete-workout" onclick="deleteWorkout(${workout.id})">Delete</button>
        </div>
    `).join('');
}

// Update statistics
function updateStats() {
    const totalWorkouts = workouts.length;
    const totalSets = workouts.reduce((sum, w) => sum + w.sets, 0);
    const totalReps = workouts.reduce((sum, w) => sum + w.reps, 0);

    document.getElementById('totalWorkouts').textContent = totalWorkouts;
    document.getElementById('totalSets').textContent = totalSets;
    document.getElementById('totalReps').textContent = totalReps;
}

// Initialize on page load
renderWorkouts();
updateStats();

console.log('Fitness Tracker - Built by Abdel Ali');
