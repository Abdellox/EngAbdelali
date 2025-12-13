const geofences = new Map();
let geofenceIdCounter = 1;

class Geofence {
  constructor(data) {
    this.id = data.id || geofenceIdCounter++;
    this.childId = data.childId;
    this.parentId = data.parentId;
    this.name = data.name;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.radius = data.radius; // in meters
    this.type = data.type; // 'home', 'school', 'friend', 'activity', 'custom'
    this.notifyOnEnter = data.notifyOnEnter !== false;
    this.notifyOnExit = data.notifyOnExit !== false;
    this.active = data.active !== false;
    this.schedule = data.schedule || null; // { days: [], startTime: '', endTime: '' }
    this.createdAt = data.createdAt || new Date();
  }

  static create(data) {
    const geofence = new Geofence(data);
    geofences.set(geofence.id, geofence);
    return geofence;
  }

  static findById(id) {
    return geofences.get(id);
  }

  static findByChildId(childId) {
    return Array.from(geofences.values()).filter(g => g.childId === childId);
  }

  static findByParentId(parentId) {
    return Array.from(geofences.values()).filter(g => g.parentId === parentId);
  }

  static update(id, data) {
    const geofence = geofences.get(id);
    if (geofence) {
      Object.assign(geofence, data);
      geofences.set(id, geofence);
    }
    return geofence;
  }

  static delete(id) {
    return geofences.delete(id);
  }

  static isInsideGeofence(latitude, longitude, geofence) {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = latitude * Math.PI / 180;
    const φ2 = geofence.latitude * Math.PI / 180;
    const Δφ = (geofence.latitude - latitude) * Math.PI / 180;
    const Δλ = (geofence.longitude - longitude) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance <= geofence.radius;
  }
}

module.exports = Geofence;
