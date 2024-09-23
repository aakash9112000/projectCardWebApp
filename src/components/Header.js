import React from 'react';
import { Button, Typography } from 'antd';
import { LogoutOutlined } from '@ant-design/icons'; 
import AImage from './A.png'; 

const { Title } = Typography;

const Header = ({ onLogout }) => {
  return (
    <header style={styles.header}>
      <div style={styles.leftSection}>
        <img src={AImage} alt="Card Vault" style={styles.icon} /> {/* Use the imported image */}
        <Title level={2} style={styles.title}>
          Card Vault
        </Title>
      </div>

      <Button
        type="text"
        danger
        icon={<LogoutOutlined />} // Add the logout icon
        onClick={onLogout}
        style={styles.logoutButton}
      >
        Logout
      </Button>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '13px  20px',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#f0f2f5',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    margin: 0, // Remove margin to avoid extra spacing
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    margin: 0, // Remove default margin
    fontWeight: 'bold',
    fontSize: '24px', // Adjust font size for better visibility
  },
  icon: {
    width: '47px', // Set a fixed width
    height: '42px', // Set a fixed height
    marginRight: '4px', // Add spacing between icon and title
  },
  logoutButton: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#ff4d4f',
  },
};

export default Header;
