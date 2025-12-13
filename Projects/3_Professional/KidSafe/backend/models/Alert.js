const alerts = new Map();
let alertIdCounter = 1;

class Alert {
  constructor(data) {
    this.id = data.id || alertIdCounter++;
    this.childId = data.childId;
    this.parentId = data.parentId;
    this.type = data.type; // 'info', 'attention', 'urgent', 'emergency'
    this.title = data.title;
    this.message = data.message;
    this.location = data.location || null;
    this.acknowledged = data.acknowledged || false;
    this.acknowledgedAt = data.acknowledgedAt || null;
    this.metadata = data.metadata || {};
    this.createdAt = data.createdAt || new Date();
  }

  static create(data) {
    const alert = new Alert(data);
    alerts.set(alert.id, alert);
    return alert;
  }

  static findById(id) {
    return alerts.get(id);
  }

  static findByParentId(parentId, limit = 50) {
    return Array.from(alerts.values())
      .filter(a => a.parentId === parentId)
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, limit);
  }

  static findByChildId(childId, limit = 50) {
    return Array.from(alerts.values())
      .filter(a => a.childId === childId)
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, limit);
  }

  static acknowledge(id) {
    const alert = alerts.get(id);
    if (alert) {
      alert.acknowledged = true;
      alert.acknowledgedAt = new Date();
      alerts.set(id, alert);
    }
    return alert;
  }

  static getUnacknowledged(parentId) {
    return Array.from(alerts.values())
      .filter(a => a.parentId === parentId && !a.acknowledged)
      .sort((a, b) => b.createdAt - a.createdAt);
  }
}

module.exports = Alert;
