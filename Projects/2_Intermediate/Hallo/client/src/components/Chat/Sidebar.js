import React, { useState } from 'react';
import API from '../../api/axios';
import { useSocket } from '../../context/SocketContext';
import './Sidebar.css';

function Sidebar({ currentUser, conversations, selectedChat, onSelectChat, onLogout, theme, toggleTheme }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const { onlineUsers } = useSocket();

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      try {
        const response = await API.get(`/users/search?query=${query}`);
        setSearchResults(response.data.users);
        setShowSearch(true);
      } catch (error) {
        console.error('Search error:', error);
      }
    } else {
      setShowSearch(false);
      setSearchResults([]);
    }
  };

  const handleSelectUser = async (user) => {
    onSelectChat(user);
    setShowSearch(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const getOtherUser = (conversation) => {
    return conversation.participants.find(p => p._id !== currentUser?._id);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="user-info">
          <div className="avatar">
            {currentUser?.avatar || currentUser?.username?.charAt(0).toUpperCase()}
          </div>
          <span>{currentUser?.username}</span>
        </div>
        <div className="header-actions">
          <button onClick={toggleTheme} className="icon-btn" title="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button onClick={onLogout} className="icon-btn" title="Logout">
            🚪
          </button>
        </div>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="conversations-list">
        {showSearch ? (
          searchResults.length > 0 ? (
            searchResults.map(user => (
              <div
                key={user._id}
                className="conversation-item"
                onClick={() => handleSelectUser(user)}
              >
                <div className="avatar">
                  {user.avatar || user.username.charAt(0).toUpperCase()}
                </div>
                <div className="conversation-info">
                  <div className="conversation-name">{user.username}</div>
                  <div className="conversation-preview">{user.email}</div>
                </div>
                {onlineUsers.has(user._id) && <div className="online-indicator"></div>}
              </div>
            ))
          ) : (
            <div className="no-results">No users found</div>
          )
        ) : (
          conversations.length > 0 ? (
            conversations.map(conv => {
              const otherUser = getOtherUser(conv);
              return (
                <div
                  key={conv._id}
                  className={`conversation-item ${selectedChat?._id === otherUser?._id ? 'active' : ''}`}
                  onClick={() => onSelectChat(otherUser)}
                >
                  <div className="avatar">
                    {otherUser?.avatar || otherUser?.username?.charAt(0).toUpperCase()}
                  </div>
                  <div className="conversation-info">
                    <div className="conversation-name">{otherUser?.username}</div>
                    <div className="conversation-preview">
                      {conv.lastMessage?.content || 'Start chatting'}
                    </div>
                  </div>
                  {onlineUsers.has(otherUser?._id) && <div className="online-indicator"></div>}
                </div>
              );
            })
          ) : (
            <div className="no-conversations">
              <p>No conversations yet</p>
              <p>Search for users to start chatting</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Sidebar;
