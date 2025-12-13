const messages = new Map();
let messageIdCounter = 1;

class Message {
  constructor(data) {
    this.id = data.id || messageIdCounter++;
    this.senderId = data.senderId;
    this.recipientId = data.recipientId;
    this.content = data.content;
    this.type = data.type; // 'text', 'voice', 'video'
    this.read = data.read || false;
    this.readAt = data.readAt || null;
    this.createdAt = data.createdAt || new Date();
  }

  static create(data) {
    const message = new Message(data);
    messages.set(message.id, message);
    return message;
  }

  static getConversation(userId1, userId2, limit = 100) {
    return Array.from(messages.values())
      .filter(m => 
        (m.senderId === userId1 && m.recipientId === userId2) ||
        (m.senderId === userId2 && m.recipientId === userId1)
      )
      .sort((a, b) => a.createdAt - b.createdAt)
      .slice(-limit);
  }

  static markAsRead(id) {
    const message = messages.get(id);
    if (message) {
      message.read = true;
      message.readAt = new Date();
      messages.set(id, message);
    }
    return message;
  }
}

module.exports = Message;
