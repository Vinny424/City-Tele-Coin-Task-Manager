import React from 'react';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #4B7BE5 0%, #6A89CC 100%)',
      padding: '24px 20px',
      marginBottom: '24px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{
            color: 'white',
            fontSize: '28px',
            fontWeight: '700',
            margin: '0 0 8px 0',
            letterSpacing: '0.5px'
          }}>
            Welcome to Task Nexus
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '16px',
            fontWeight: '400',
            margin: 0,
            letterSpacing: '0.2px'
          }}>
            Manage your tasks efficiently and boost productivity
          </p>
        </div>
        <button
          onClick={onLogout}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            fontFamily: 'Poppins, sans-serif'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;