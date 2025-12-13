import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function Messages() {
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchChildren();
  }, []);

  useEffect(() => {
    if (selectedChild) {
      fetchMessages(selectedChild.id);
    }
  }, [selectedChild]);

  const fetchChildren = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/children');
      setChildren(response.data);
      if (response.data.length > 0) {
        setSelectedChild(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching children:', error);
    }
  };

  const fetchMessages = async (childId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/messages/conversation/${childId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChild) return;

    try {
      await axios.post('http://localhost:5000/api/messages', {
        recipientId: selectedChild.id,
        content: newMessage,
        type: 'text'
      });
      setNewMessage('');
      fetchMessages(selectedChild.id);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container" style={{ padding: '2rem' }}>
        <h1>Messages</h1>
        <p>Messaging feature coming soon!</p>
      </div>
    </div>
  );
}

export default Messages;
