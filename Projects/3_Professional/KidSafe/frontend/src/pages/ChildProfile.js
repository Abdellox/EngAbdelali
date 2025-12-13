import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function ChildProfile() {
  const { id } = useParams();
  const [child, setChild] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id !== 'new') {
      fetchChild();
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchChild = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/children/${id}`);
      setChild(response.data);
    } catch (error) {
      console.error('Error fetching child:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container" style={{ padding: '2rem' }}>
        <h1>{id === 'new' ? 'Add New Child' : child?.name}</h1>
        <p>Child profile page coming soon!</p>
      </div>
    </div>
  );
}

export default ChildProfile;
