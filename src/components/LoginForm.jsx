import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import '../css/LoginForm.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [device, setDevice] = useState('Browser');
  const [error, setError] = useState('');
  const [otpStatus, setOtpStatus] = useState('');
  const [loading, setLoading] = useState(false);

  // Use ref to track timeouts for cleanup
  const timeoutRef = useRef(null);

  // Cleanup timeouts on component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setOtpStatus('');
    setLoading(true);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      identity: identifier,
      password: password,
      device: device,
    });

    try {
      setOtpStatus('Loading...');
      const res = await fetch('https://api.vintexc.com/apps/auth/login/login', {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      });

      const data = await res.json();
      console.log('Login response:', data);

      if (data.status === 'success') {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        navigate("/enter-otp", { 
          state: { 
            flow: "login", 
            identity: identifier,
            password: password 
          } 
        });
      } else {
        setOtpStatus(data.message || 'Incorrect email/username or password');
        timeoutRef.current = setTimeout(() => setOtpStatus(''), 3000);
      }
    } catch (error) {
      // console.error(error);
      setOtpStatus('Something went wrong. Please try again.');
      timeoutRef.current = setTimeout(() => setOtpStatus(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="registration-container">
      <div className="registration-content">
        <div className="navigation-section">
          <button
            className="back-button"
            type="button"
            onClick={() => navigate('/')}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
            Back Home
          </button>

          {otpStatus && (
            <div className="otp-status-card">
              {otpStatus === 'loading' ? 'Loading...' : otpStatus}
            </div>
          )}
        </div>

        <div className="section-title">Welcome Back User</div>
        <p className="welcome-subtitle">
          Enter details to login and start trading
        </p>

        <div className="form-container">
          <form className="registration-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Email / Username</label>
              <input
                className="form-input"
                placeholder="Enter email or username"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>

            <div className="form-group password-group">
              <label className="form-label">Password</label>
              <input
                className="form-input password-input"
                placeholder="Enter password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="password-toggle-icon"
                />
              </button>
            </div>

            <div className="forgot-password">
              <Link to="/forgotpassword" className="forgot-password-link">
                forgot password?
              </Link>
            </div>

            <div className="form-actions">
              <button 
                className="login-button" 
                type="submit"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <p className="account-prompt">New User?</p>
              <button
                className="register-button"
                type="button"
                onClick={() => navigate('/signup')}
              >
                Get Started / Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;