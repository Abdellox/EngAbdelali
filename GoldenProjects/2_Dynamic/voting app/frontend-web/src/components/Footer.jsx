import React from 'react';

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p>&copy; 2025 SecureVote. All rights reserved.</p>
        <p>Secure, Transparent, Accessible Voting for All</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: '#333',
    color: 'white',
    padding: '2rem 0',
    marginTop: '4rem',
    textAlign: 'center'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem'
  }
};

export default Footer;
