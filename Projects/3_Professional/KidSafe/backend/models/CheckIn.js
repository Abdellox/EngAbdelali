const checkIns = new Map();
let checkInIdCounter = 1;

class CheckIn {
  constructor(data) {
    this.id = data.id || checkInIdCounter++;
    this.childId = data.childId;
    this.location = data.location;
    this.status = data.status; // 'safe', 'help', 'emergency'
    this.timestamp = data.timestamp || new Date();
  }

  static create(data) {
    const checkIn = new CheckIn(data);
    checkIns.set(checkIn.id, checkIn);
    return checkIn;
  }

  static findByChildId(childId, limit = 50) {
    return Array.from(checkIns.values())
      .filter(c => c.childId === childId)
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }
}

module.exports = CheckIn;
