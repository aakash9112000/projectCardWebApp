import React, { useState } from 'react';
import { Form, Input, Button, Typography, message, Card, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './LoginSignup.css'; // Import the CSS file for styling

const { Title } = Typography;

const LoginSignup = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  // State to store user credentials (simulating a backend storage)
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });

  const handleLogin = () => {
    if (email === userCredentials.email && password === userCredentials.password) {
      onLogin(true); // Notify parent component of successful login
      message.success('Login successful!');
    } else {
      message.error('Invalid email or password');
    }
  };

  const handleSignup = () => {
    if (email && password) {
      setUserCredentials({ email, password });
      message.success('Signup successful! Please login.');
      setIsSignup(false); // Switch back to login mode after successful signup
    } else {
      message.error('Please provide email and password');
    }
  };

  const handleSubmit = () => {
    if (isSignup) {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  return (
    <div className="login-page">
      <Title className="app-title">Welcome to Your Card Vault! 🌟 🔐</Title>
      <Card
        title={isSignup ? 'Sign Up' : 'Login'}
        className="login-card"
        extra={
          <Button type="link" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Already have an account? Login' : 'Need an account? Sign Up'}
          </Button>
        }
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          style={{ maxWidth: '400px', margin: '0 auto' }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <Input
              prefix={<UserOutlined />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              type="email"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" className="submit-button">
                {isSignup ? 'Sign Up' : 'Login'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginSignup;
