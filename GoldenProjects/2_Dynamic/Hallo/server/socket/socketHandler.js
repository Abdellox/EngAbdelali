const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

const connectedUsers = new Map();

module.exports = (io) => {
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.userId;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', async (socket) => {
    console.log(`✅ User connected: ${socket.userId}`);
    
    // Store socket connection
    connectedUsers.set(socket.userId, socket.id);
    
    // Update user status
    await User.findByIdAndUpdate(socket.userId, { status: 'online' });
    
    // Broadcast online status
    socket.broadcast.emit('user_status', { userId: socket.userId, status: 'online' });

    // Join user's personal room
    socket.join(socket.userId);

    // Send message
    socket.on('send_message', async (data) => {
      try {
        const { receiverId, content, messageType, fileUrl, disappearIn } = data;

        // Create message
        const message = new Message({
          sender: socket.userId,
          receiver: receiverId,
          content,
          messageType: messageType || 'text',
          fileUrl,
          isDelivered: connectedUsers.has(receiverId),
          deliveredAt: connectedUsers.has(receiverId) ? new Date() : null,
          disappearAt: disappearIn ? new Date(Date.now() + disappearIn * 1000) : null
        });

        await message.save();
        await message.populate('sender', 'username avatar');
        await message.populate('receiver', 'username avatar');

        // Update or create conversation
        let conversation = await Conversation.findOne({
          participants: { $all: [socket.userId, receiverId] }
        });

        if (!conversation) {
          conversation = new Conversation({
            participants: [socket.userId, receiverId],
            lastMessage: message._id,
            lastMessageAt: new Date()
          });
        } else {
          conversation.lastMessage = message._id;
          conversation.lastMessageAt = new Date();
        }
        await conversation.save();

        // Send to receiver if online
        const receiverSocketId = connectedUsers.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('receive_message', message);
        }

        // Confirm to sender
        socket.emit('message_sent', message);
      } catch (error) {
        socket.emit('error', { message: error.message });
      }
    });

    // Typing indicator
    socket.on('typing', (data) => {
      const receiverSocketId = connectedUsers.get(data.receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('user_typing', {
          userId: socket.userId,
          isTyping: data.isTyping
        });
      }
    });

    // Message read receipt
    socket.on('message_read', async (data) => {
      try {
        const message = await Message.findById(data.messageId);
        if (message && message.receiver.toString() === socket.userId) {
          message.isRead = true;
          message.readAt = new Date();
          await message.save();

          // Notify sender
          const senderSocketId = connectedUsers.get(message.sender.toString());
          if (senderSocketId) {
            io.to(senderSocketId).emit('message_read_receipt', {
              messageId: message._id,
              readAt: message.readAt
            });
          }
        }
      } catch (error) {
        console.error('Error marking message as read:', error);
      }
    });

    // Disconnect
    socket.on('disconnect', async () => {
      console.log(`❌ User disconnected: ${socket.userId}`);
      connectedUsers.delete(socket.userId);
      
      // Update user status
      await User.findByIdAndUpdate(socket.userId, {
        status: 'offline',
        lastSeen: new Date()
      });
      
      // Broadcast offline status
      socket.broadcast.emit('user_status', {
        userId: socket.userId,
        status: 'offline',
        lastSeen: new Date()
      });
    });
  });
};
