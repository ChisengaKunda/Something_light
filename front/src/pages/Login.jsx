import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ identifier: '', password: '' });
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  });

  const navigate = useNavigate();

  const toggleMode = () => {
    document.querySelector('.container').classList.toggle('active');
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
      // build x-www-form-urlencoded body
      const params = new URLSearchParams();
      params.append('grant_type', 'password');
      params.append('username',   loginData.identifier);
      params.append('password',   loginData.password);

      const res = await axios.post(
        'http://localhost:8000/auth/token',
        params,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );

      // store auth info
      localStorage.setItem('token',    res.data.access_token);
      localStorage.setItem('role',     res.data.role);
      localStorage.setItem('username', res.data.username);

      // redirect by role
      if (res.data.role === 'doctor') navigate('/doctor');
      else if (res.data.role === 'nurse') navigate('/nurse');
      else navigate('/patient');
    } catch (err) {
      console.error(err.response || err);
      alert('Login failed');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (signupData.password.length > 15) {
      return alert('Password must be less than 15 characters');
    }
    try {
      await axios.post('http://localhost:8000/auth/create', signupData);
      alert('Account created! Please login.');
      toggleMode();
    } catch (err) {
      alert('Account creation failed: ' + err.response?.data?.detail);
    }
  };

  return (
    <div className="container">
      {/* Sign-Up Panel */}
      <div className="form-container sign-up">
        <form onSubmit={handleSignupSubmit}>
          <h1>Create Account</h1>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={signupData.username}
            onChange={handleSignupChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signupData.email}
            onChange={handleSignupChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signupData.password}
            onChange={handleSignupChange}
            required
          />
          <select
            name="role"
            value={signupData.role}
            onChange={handleSignupChange}
            required
          >
            <option value="">Select Role</option>
            <option value="doctor">Doctor</option>
            <option value="nurse">Nurse</option>
            <option value="patient">Patient</option>
          </select>
          <button type="submit">Register</button>
        </form>
      </div>

      {/* Sign-In Panel */}
      <div className="form-container sign-in">
        <form onSubmit={handleLoginSubmit}>
          <h1>Sign In</h1>
          <input
            type="text"
            name="identifier"
            placeholder="Username or Email"
            value={loginData.identifier}
            onChange={handleLoginChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginChange}
            required
          />
          <a href="#">Forgot your password?</a>
          <button type="submit">Login</button>
        </form>
      </div>

      {/* Toggle Panels */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us, please login with your personal info</p>
            <button className="hidden" onClick={toggleMode}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button className="hidden" onClick={toggleMode}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
