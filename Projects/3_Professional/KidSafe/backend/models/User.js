const users = new Map();
let userIdCounter = 1;

class User {
  constructor(data) {
    this.id = data.id || userIdCounter++;
    this.email = data.email;
    this.password = data.password;
    this.name = data.name;
    this.role = data.role; // 'parent', 'child', 'helper'
    this.phone = data.phone;
    this.parentId = data.parentId || null;
    this.createdAt = data.createdAt || new Date();
  }

  static create(data) {
    const user = new User(data);
    users.set(user.id, user);
    return user;
  }

  static findById(id) {
    return users.get(id);
  }

  static findByEmail(email) {
    return Array.from(users.values()).find(u => u.email === email);
  }

  static findByParentId(parentId) {
    return Array.from(users.values()).filter(u => u.parentId === parentId);
  }

  static update(id, data) {
    const user = users.get(id);
    if (user) {
      Object.assign(user, data);
      users.set(id, user);
    }
    return user;
  }

  static delete(id) {
    return users.delete(id);
  }

  static getAll() {
    return Array.from(users.values());
  }
}

module.exports = User;
