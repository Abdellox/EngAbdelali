const children = new Map();
let childIdCounter = 1;

class Child {
  constructor(data) {
    this.id = data.id || childIdCounter++;
    this.parentId = data.parentId;
    this.name = data.name;
    this.age = data.age;
    this.grade = data.grade;
    this.school = data.school;
    this.photo = data.photo || null;
    this.deviceId = data.deviceId || null;
    this.emergencyContacts = data.emergencyContacts || [];
    this.medicalInfo = data.medicalInfo || {};
    this.currentLocation = data.currentLocation || null;
    this.lastCheckIn = data.lastCheckIn || null;
    this.createdAt = data.createdAt || new Date();
  }

  static create(data) {
    const child = new Child(data);
    children.set(child.id, child);
    return child;
  }

  static findById(id) {
    return children.get(id);
  }

  static findByParentId(parentId) {
    return Array.from(children.values()).filter(c => c.parentId === parentId);
  }

  static update(id, data) {
    const child = children.get(id);
    if (child) {
      Object.assign(child, data);
      children.set(id, child);
    }
    return child;
  }

  static delete(id) {
    return children.delete(id);
  }

  static getAll() {
    return Array.from(children.values());
  }
}

module.exports = Child;
