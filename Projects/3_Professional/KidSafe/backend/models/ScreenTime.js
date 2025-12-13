const screenTimes = new Map();
let screenTimeIdCounter = 1;

class ScreenTime {
  constructor(data) {
    this.id = data.id || screenTimeIdCounter++;
    this.childId = data.childId;
    this.parentId = data.parentId;
    this.appName = data.appName;
    this.category = data.category;
    this.duration = data.duration; // in minutes
    this.date = data.date || new Date();
  }

  static create(data) {
    const screenTime = new ScreenTime(data);
    screenTimes.set(screenTime.id, screenTime);
    return screenTime;
  }

  static findByChildId(childId, limit = 100) {
    return Array.from(screenTimes.values())
      .filter(s => s.childId === childId)
      .sort((a, b) => b.date - a.date)
      .slice(0, limit);
  }

  static getTodayTotal(childId) {
    const today = new Date().toDateString();
    return Array.from(screenTimes.values())
      .filter(s => s.childId === childId && s.date.toDateString() === today)
      .reduce((total, s) => total + s.duration, 0);
  }
}

module.exports = ScreenTime;
