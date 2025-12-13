const locations = new Map();
let locationIdCounter = 1;

class Location {
  constructor(data) {
    this.id = data.id || locationIdCounter++;
    this.childId = data.childId;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.accuracy = data.accuracy;
    this.speed = data.speed || 0;
    this.battery = data.battery || 100;
    this.timestamp = data.timestamp || new Date();
  }

  static create(data) {
    const location = new Location(data);
    locations.set(location.id, location);
    return location;
  }

  static findByChildId(childId, limit = 100) {
    return Array.from(locations.values())
      .filter(l => l.childId === childId)
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }

  static getLatest(childId) {
    const childLocations = Array.from(locations.values())
      .filter(l => l.childId === childId)
      .sort((a, b) => b.timestamp - a.timestamp);
    return childLocations[0] || null;
  }

  static deleteOlderThan(days) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    for (const [id, location] of locations.entries()) {
      if (location.timestamp < cutoffDate) {
        locations.delete(id);
      }
    }
  }
}

module.exports = Location;
