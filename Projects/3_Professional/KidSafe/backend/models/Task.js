const tasks = new Map();
let taskIdCounter = 1;

class Task {
  constructor(data) {
    this.id = data.id || taskIdCounter++;
    this.childId = data.childId;
    this.parentId = data.parentId;
    this.title = data.title;
    this.description = data.description;
    this.dueDate = data.dueDate;
    this.completed = data.completed || false;
    this.completedAt = data.completedAt || null;
    this.points = data.points || 0;
    this.createdAt = data.createdAt || new Date();
  }

  static create(data) {
    const task = new Task(data);
    tasks.set(task.id, task);
    return task;
  }

  static findByChildId(childId) {
    return Array.from(tasks.values())
      .filter(t => t.childId === childId)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }

  static complete(id) {
    const task = tasks.get(id);
    if (task) {
      task.completed = true;
      task.completedAt = new Date();
      tasks.set(id, task);
    }
    return task;
  }
}

module.exports = Task;
