import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginRegisterPage.css'; // Style as needed

const LoginRegisterPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState(
    JSON.parse(localStorage.getItem('users')) || []
  );
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const navigate = useNavigate(); // useNavigate hook to redirect

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  // Register the user by saving credentials to JSON (localStorage)
  const handleRegister = () => {
    if (!username || !password) {
      alert('Please fill out both username and password!');
      return;
    }

    // Check if user already exists
    const userExists = registeredUsers.find((user) => user.username === username);
    if (userExists) {
      alert('User already exists! Please login.');
      return;
    }

    const newUser = { username, password };
    const updatedUsers = [...registeredUsers, newUser];
    setRegisteredUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    alert('Registration successful! You can now log in.');
    setUsername('');
    setPassword('');
    setIsLogin(true); // Switch to login after successful registration
  };

  // Login by checking credentials
  const handleLogin = () => {
    const user = registeredUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      localStorage.setItem('loggedInUser', username); // Save user in localStorage
      alert('Login successful! Welcome!');
      onLoginSuccess(); // Call the authentication handler
      navigate('/user'); // Navigate to UserPage
    } else {
      alert('Invalid username or password!');
    }
  };

  return (
    <div className="login-register-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <div className="form-group">
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={handleInputChange(setUsername)}
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handleInputChange(setPassword)}
        />
      </div>

      {isLogin ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <button onClick={handleRegister}>Register</button>
      )}

      <button
        onClick={() => setIsLogin(!isLogin)}
        className="toggle-btn"
      >
        {isLogin ? 'Create an account' : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default LoginRegisterPage;
