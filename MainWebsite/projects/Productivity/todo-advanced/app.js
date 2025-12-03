/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
// Todo Advanced App - Full Implementation
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let filter = 'all';
let sortBy = 'date';

const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const filterBtns = document.querySelectorAll('.filter-btn');
const sortSelect = document.getElementById('sortSelect');
const clearBtn = document.getElementById('clearBtn');
const statsEl = document.getElementById('stats');

// Add todo
function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return;
    
    const todo = {
        id: Date.now(),
        text: text,
        completed: false,
        priority: 'medium',
        date: new Date().toISOString()
    };
    
    todos.push(todo);
    todoInput.value = '';
    saveTodos();
    renderTodos();
}

// Delete todo
function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    saveTodos();
    renderTodos();
}

// Toggle complete
function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
}

// Change priority
function changePriority(id, priority) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.priority = priority;
        saveTodos();
        renderTodos();
    }
}

// Edit todo
function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        const newText = prompt('Edit todo:', todo.text);
        if (newText && newText.trim()) {
            todo.text = newText.trim();
            saveTodos();
            renderTodos();
        }
    }
}

// Filter todos
function filterTodos() {
    let filtered = [...todos];
    
    if (filter === 'active') {
        filtered = filtered.filter(t => !t.completed);
    } else if (filter === 'completed') {
        filtered = filtered.filter(t => t.completed);
    }
    
    // Sort
    if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else {
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    return filtered;
}

// Render todos
function renderTodos() {
    const filtered = filterTodos();
    
    todoList.innerHTML = '';
    
    if (filtered.length === 0) {
        todoList.innerHTML = '<div class="empty-state">No todos found</div>';
    } else {
        filtered.forEach(todo => {
            const li = document.createElement('div');
            li.className = `todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority}`;
            li.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${todo.id})">
                <span class="todo-text">${todo.text}</span>
                <select class="priority-select" onchange="changePriority(${todo.id}, this.value)">
                    <option value="low" ${todo.priority === 'low' ? 'selected' : ''}>Low</option>
                    <option value="medium" ${todo.priority === 'medium' ? 'selected' : ''}>Medium</option>
                    <option value="high" ${todo.priority === 'high' ? 'selected' : ''}>High</option>
                </select>
                <button onclick="editTodo(${todo.id})" class="edit-btn">Edit</button>
                <button onclick="deleteTodo(${todo.id})" class="delete-btn">Delete</button>
            `;
            todoList.appendChild(li);
        });
    }
    
    updateStats();
}

// Update stats
function updateStats() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;
    
    if (statsEl) {
        statsEl.textContent = `Total: ${total} | Active: ${active} | Completed: ${completed}`;
    }
}

// Save to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Clear completed
function clearCompleted() {
    if (confirm('Clear all completed todos?')) {
        todos = todos.filter(t => !t.completed);
        saveTodos();
        renderTodos();
    }
}

// Event listeners
if (addBtn) addBtn.addEventListener('click', addTodo);
if (todoInput) {
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTodo();
    });
}

if (filterBtns) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filter = btn.dataset.filter;
            renderTodos();
        });
    });
}

if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
        sortBy = e.target.value;
        renderTodos();
    });
}

if (clearBtn) clearBtn.addEventListener('click', clearCompleted);

// Initial render
renderTodos();

console.log('Todo Advanced App - Ready!');
