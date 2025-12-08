import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import API from '../../api/axios';
import './ChatApp.css';

function ChatApp({ onLogout, theme, toggleTheme }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    fetchCurrentUser();
    fetchConversations();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await API.get('/auth/me');
      setCurrentUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
      onLogout();
    }
  };

  const fetchConversations = async () => {
    try {
      const response = await API.get('/messages');
      setConversations(response.data.conversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  return (
    <div className="chat-app">
      <Sidebar
        currentUser={currentUser}
        conversations={conversations}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
        onLogout={onLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <ChatWindow
        currentUser={currentUser}
        selectedChat={selectedChat}
        onUpdateConversations={fetchConversations}
      />
    </div>
  );
}

export default ChatApp;
