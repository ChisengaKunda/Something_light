import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ username: '', password: '', role: '' });
  const [signupData, setSignupData] = useState({ username: '', password: '', role: '' });

  const toggleMode = () => {
    const container = document.querySelector('.container');
    container.classList.toggle('active');
    setIsLogin(!isLogin);
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/token', loginData);
      localStorage.setItem('token', res.data.access_token);
      alert('Login successful');
    } catch (err) {
      alert('Login failed');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (signupData.password.length > 15) {
      alert('Password must be less than 15 characters');
      return;
    }
    try {
      await axios.post('http://localhost:8000/create', signupData);
      alert('Account created! Please login.');
      toggleMode();
    } catch (err) {
      alert('Account creation failed');
    }
  };

  return (
    <div className="container">
      <div className="form-container sign-up">
        <form onSubmit={handleSignupSubmit}>
          <h1>Create Account</h1>
          <input type="text" placeholder="Username" name="username" value={signupData.username} onChange={handleSignupChange} required />
          <input type="password" placeholder="Password" name="password" value={signupData.password} onChange={handleSignupChange} required />
          <select name="role" value={signupData.role} onChange={handleSignupChange} required>
            <option value="">Select Role</option>
            <option value="doctor">Doctor</option>
            <option value="nurse">Nurse</option>
            <option value="patient">Patient</option>
          </select>
          <button type="submit">Register</button>
        </form>
      </div>

      <div className="form-container sign-in">
        <form onSubmit={handleLoginSubmit}>
          <h1>Sign In</h1>
          <input type="text" placeholder="Username" name="username" value={loginData.username} onChange={handleLoginChange} required />
          <input type="password" placeholder="Password" name="password" value={loginData.password} onChange={handleLoginChange} required />
          <select name="role" value={loginData.role} onChange={handleLoginChange} required>
            <option value="">Select Role</option>
            <option value="doctor">Doctor</option>
            <option value="nurse">Nurse</option>
            <option value="patient">Patient</option>
          </select>
          <a href="#">Forgot your password?</a>
          <button type="submit">Login</button>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us, please login with your personal info</p>
            <button type="button" className="hidden" onClick={toggleMode}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button type="button" className="hidden" onClick={toggleMode}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
