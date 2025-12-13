const helpers = new Map();
let helperIdCounter = 1;

class Helper {
  constructor(data) {
    this.id = data.id || helperIdCounter++;
    this.parentId = data.parentId;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.relationship = data.relationship;
    this.permissions = data.permissions || 'view-only';
    this.childrenAccess = data.childrenAccess || [];
    this.active = data.active !== false;
    this.createdAt = data.createdAt || new Date();
  }

  static create(data) {
    const helper = new Helper(data);
    helpers.set(helper.id, helper);
    return helper;
  }

  static findById(id) {
    return helpers.get(id);
  }

  static findByParentId(parentId) {
    return Array.from(helpers.values()).filter(h => h.parentId === parentId);
  }

  static update(id, data) {
    const helper = helpers.get(id);
    if (helper) {
      Object.assign(helper, data);
      helpers.set(id, helper);
    }
    return helper;
  }

  static delete(id) {
    return helpers.delete(id);
  }
}

module.exports = Helper;
