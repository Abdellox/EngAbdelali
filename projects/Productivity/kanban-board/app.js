/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('kanbanTasks')) || {
    todo: [],
    progress: [],
    done: []
};

// Initialize board
function init() {
    renderAllColumns();
}

// Render all columns
function renderAllColumns() {
    renderColumn('todo');
    renderColumn('progress');
    renderColumn('done');
}

// Render a specific column
function renderColumn(columnId) {
    const column = document.getElementById(columnId);
    column.innerHTML = '';
    
    tasks[columnId].forEach(task => {
        const taskElement = createTaskElement(task, columnId);
        column.appendChild(taskElement);
    });
}

// Create task element
function createTaskElement(task, columnId) {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.draggable = true;
    taskDiv.id = task.id;
    taskDiv.innerHTML = `
        <span class="task-text">${task.text}</span>
        <button class="delete-btn" onclick="deleteTask('${columnId}', '${task.id}')">×</button>
    `;
    
    taskDiv.ondragstart = drag;
    
    return taskDiv;
}

// Add new task
function addTask(column) {
    const text = prompt('Enter task:');
    
    if (text && text.trim()) {
        const task = {
            id: 'task-' + Date.now(),
            text: text.trim()
        };
        
        tasks[column].push(task);
        saveTasks();
        renderColumn(column);
    }
}

// Delete task
function deleteTask(column, taskId) {
    if (confirm('Delete this task?')) {
        tasks[column] = tasks[column].filter(task => task.id !== taskId);
        saveTasks();
        renderColumn(column);
    }
}

// Drag and drop functions
function allowDrop(e) {
    e.preventDefault();
}

function drag(e) {
    e.dataTransfer.setData('text', e.target.id);
    e.dataTransfer.setData('sourceColumn', e.target.parentElement.id);
}

function drop(e) {
    e.preventDefault();
    
    const taskId = e.dataTransfer.getData('text');
    const sourceColumn = e.dataTransfer.getData('sourceColumn');
    const targetColumn = e.target.id || e.target.parentElement.id;
    
    // Find the task in source column
    const taskIndex = tasks[sourceColumn].findIndex(task => task.id === taskId);
    
    if (taskIndex !== -1 && sourceColumn !== targetColumn) {
        // Move task from source to target
        const task = tasks[sourceColumn].splice(taskIndex, 1)[0];
        tasks[targetColumn].push(task);
        
        saveTasks();
        renderAllColumns();
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
}

// Initialize on load
init();
