import React, { useState, useContext } from 'react';
import { AuthContext }            from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ identifier: '', password: '' });
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  });

  const { login, register } = useContext(AuthContext);

  const toggleMode = () => {
    document.querySelector('.login-container').classList.toggle('active');
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
      await login(loginData.identifier, loginData.password);
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (signupData.password.length > 15) {
      return alert('Password must be less than 15 characters');
    }
    try {
      await register(
        signupData.username,
        signupData.password,
        signupData.role
      );
      alert('Account created! Please login.');
      toggleMode();
    } catch (err) {
      console.error(err);
      alert('Account creation failed: ' + err.message || err);
    }
  };

  return (
    <div className="login-container">
      {/* Sign-Up Panel */}
      <div className="login-form-container login-sign-up">
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
      <div className="login-form-container login-sign-in">
        <form onSubmit={handleLoginSubmit}>
          <h1>Sign In</h1>
          <input
            type="text"
            name="identifier"
            placeholder="Username"
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
          <button type="submit">Login</button>
        </form>
      </div>

      {/* Toggle Panels */}
      <div className="login-toggle-container">
        <div className="login-toggle">
          <div className="login-toggle-panel login-toggle-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us, please login with your personal info</p>
            <button className="hidden" onClick={toggleMode}>Sign In</button>
          </div>
          <div className="login-toggle-panel login-toggle-right">
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
