/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';
let currentSort = 'newest';
let editingTaskId = null;

// DOM Elements
const tasksList = document.getElementById('tasksList');
const emptyState = document.getElementById('emptyState');
const addTaskForm = document.getElementById('addTaskForm');
const taskInput = document.getElementById('taskInput');
const prioritySelect = document.getElementById('prioritySelect');
const sortSelect = document.getElementById('sortSelect');
const editModal = document.getElementById('editModal');
const editTaskForm = document.getElementById('editTaskForm');
const editTaskInput = document.getElementById('editTaskInput');
const editPrioritySelect = document.getElementById('editPrioritySelect');
const pageTitle = document.getElementById('pageTitle');

// Event Listeners
addTaskForm.addEventListener('submit', addTask);
sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderTasks();
});

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        e.currentTarget.classList.add('active');
        currentFilter = e.currentTarget.dataset.filter;
        updatePageTitle();
        renderTasks();
    });
});

document.getElementById('clearCompleted').addEventListener('click', clearCompleted);
document.getElementById('closeModal').addEventListener('click', closeEditModal);
document.getElementById('cancelEdit').addEventListener('click', closeEditModal);
editTaskForm.addEventListener('submit', saveEdit);

// Functions
function addTask(e) {
    e.preventDefault();
    const text = taskInput.value.trim();
    const priority = prioritySelect.value;
    
    if (!text) return;
    
    const task = {
        id: Date.now(),
        text,
        priority,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = '';
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(id) {
    if (confirm('Delete this task?')) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
    }
}

function openEditModal(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        editingTaskId = id;
        editTaskInput.value = task.text;
        editPrioritySelect.value = task.priority;
        editModal.classList.add('show');
    }
}

function closeEditModal() {
    editModal.classList.remove('show');
    editingTaskId = null;
}

function saveEdit(e) {
    e.preventDefault();
    const task = tasks.find(t => t.id === editingTaskId);
    if (task) {
        task.text = editTaskInput.value.trim();
        task.priority = editPrioritySelect.value;
        saveTasks();
        renderTasks();
        closeEditModal();
    }
}

function clearCompleted() {
    if (confirm('Clear all completed tasks?')) {
        tasks = tasks.filter(t => !t.completed);
        saveTasks();
        renderTasks();
    }
}

function getFilteredTasks() {
    let filtered = [...tasks];
    
    if (currentFilter === 'active') {
        filtered = filtered.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filtered = filtered.filter(t => t.completed);
    }
    
    // Sort
    if (currentSort === 'newest') {
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (currentSort === 'oldest') {
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (currentSort === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }
    
    return filtered;
}

function renderTasks() {
    const filtered = getFilteredTasks();
    
    if (filtered.length === 0) {
        tasksList.style.display = 'none';
        emptyState.style.display = 'flex';
    } else {
        tasksList.style.display = 'block';
        emptyState.style.display = 'none';
        
        tasksList.innerHTML = filtered.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-priority="${task.priority}">
                <div class="task-checkbox">
                    <input type="checkbox" ${task.completed ? 'checked' : ''} 
                           onchange="toggleTask(${task.id})">
                </div>
                <div class="task-content">
                    <div class="task-text">${task.text}</div>
                    <div class="task-meta">
                        <span class="task-priority priority-${task.priority}">${task.priority}</span>
                        <span class="task-date">${new Date(task.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="task-btn edit-btn" onclick="openEditModal(${task.id})" title="Edit">
                        ✏️
                    </button>
                    <button class="task-btn delete-btn" onclick="deleteTask(${task.id})" title="Delete">
                        🗑️
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    updateCounts();
}

function updateCounts() {
    document.getElementById('allCount').textContent = tasks.length;
    document.getElementById('activeCount').textContent = tasks.filter(t => !t.completed).length;
    document.getElementById('completedCount').textContent = tasks.filter(t => t.completed).length;
}

function updatePageTitle() {
    const titles = {
        all: 'All Tasks',
        active: 'Active Tasks',
        completed: 'Completed Tasks'
    };
    pageTitle.textContent = titles[currentFilter];
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Initialize
renderTasks();
console.log('📋 TaskFlow - Fully Functional');
