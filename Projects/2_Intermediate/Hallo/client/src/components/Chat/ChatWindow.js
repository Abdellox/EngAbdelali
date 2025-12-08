import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../../context/SocketContext';
import API from '../../api/axios';
import { formatDistanceToNow } from 'date-fns';
import './ChatWindow.css';

function ChatWindow({ currentUser, selectedChat, onUpdateConversations }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const messagesEndRef = useRef(null);
  const { socket, onlineUsers } = useSocket();

  useEffect(() => {
    if (selectedChat) {
      fetchMessages();
    }
  }, [selectedChat]);

  useEffect(() => {
    if (!socket) return;

    socket.on('receive_message', (message) => {
      if (message.sender._id === selectedChat?._id || message.receiver._id === selectedChat?._id) {
        setMessages(prev => [...prev, message]);
        scrollToBottom();
        onUpdateConversations();
      }
    });

    socket.on('user_typing', ({ userId, isTyping }) => {
      if (userId === selectedChat?._id) {
        setIsTyping(isTyping);
      }
    });

    socket.on('message_read_receipt', ({ messageId, readAt }) => {
      setMessages(prev => prev.map(msg =>
        msg._id === messageId ? { ...msg, isRead: true, readAt } : msg
      ));
    });

    return () => {
      socket.off('receive_message');
      socket.off('user_typing');
      socket.off('message_read_receipt');
    };
  }, [socket, selectedChat]);

  const fetchMessages = async () => {
    try {
      const response = await API.get(`/messages/${selectedChat._id}`);
      setMessages(response.data.messages);
      scrollToBottom();
      
      // Mark messages as read
      response.data.messages.forEach(msg => {
        if (msg.receiver._id === currentUser?._id && !msg.isRead) {
          socket?.emit('message_read', { messageId: msg._id });
        }
      });
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket) return;

    socket.emit('send_message', {
      receiverId: selectedChat._id,
      content: newMessage,
      messageType: 'text'
    });

    setNewMessage('');
    socket.emit('typing', { receiverId: selectedChat._id, isTyping: false });
    onUpdateConversations();
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);

    if (!socket) return;

    socket.emit('typing', { receiverId: selectedChat._id, isTyping: true });

    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      socket.emit('typing', { receiverId: selectedChat._id, isTyping: false });
    }, 1000);

    setTypingTimeout(timeout);
  };

  if (!selectedChat) {
    return (
      <div className="chat-window empty">
        <div className="empty-state">
          <h2>🗨️ Hallo</h2>
          <p>Select a conversation to start chatting</p>
        </div>
      </div>
    );
  }

  const isOnline = onlineUsers.has(selectedChat._id);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-user-info">
          <div className="avatar">
            {selectedChat.avatar || selectedChat.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="chat-username">{selectedChat.username}</div>
            <div className="chat-status">
              {isOnline ? 'Online' : `Last seen ${formatDistanceToNow(new Date(selectedChat.lastSeen || Date.now()))} ago`}
            </div>
          </div>
        </div>
      </div>

      <div className="messages-container">
        {messages.map((message) => {
          const isSent = message.sender._id === currentUser?._id;
          return (
            <div key={message._id} className={`message ${isSent ? 'sent' : 'received'}`}>
              <div className="message-content">{message.content}</div>
              <div className="message-meta">
                {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                {isSent && (
                  <span className="message-status">
                    {message.isRead ? ' ✓✓' : message.isDelivered ? ' ✓' : ''}
                  </span>
                )}
              </div>
            </div>
          );
        })}
        {isTyping && (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="message-input-container">
        <input
          type="text"
          value={newMessage}
          onChange={handleTyping}
          placeholder="Type a message..."
          className="message-input"
        />
        <button type="submit" className="send-button" disabled={!newMessage.trim()}>
          ➤
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;
