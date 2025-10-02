import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../css/ForgotPasswordForm.css';

const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpStatus, setOtpStatus] = useState('');

  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const validateEmail = (value) => {
    if (!value.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return 'Please enter a valid email address';
    if (value.length > 100) return 'Email cannot exceed 100 characters';
    return '';
  };

  const handleResetCode = async (e) => {
    e.preventDefault();

    const error = validateEmail(email);
    setEmailError(error);
    if (error) return;

    setLoading(true);
    setOtpStatus('');

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      email: email,
      device: 'Browser',
    });

    try {
      const response = await fetch(
        'https://api.vintexc.com/apps/auth/forgot_password/forgot_password',
        {
          method: 'POST',
          headers: myHeaders,
          body: raw,
        }
      );

      const data = await response.json();

      if (data.status === 'success') {
        setOtpStatus(data.message || 'Verification code sent to your email');
        timeoutRef.current = setTimeout(() => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          navigate("/enter-otp", { 
            state: { 
              flow: "forgotPassword", 
              email: email 
            } 
          });
        }, 1500);
      } else {
        setOtpStatus(data.message || 'Something went wrong');
        timeoutRef.current = setTimeout(() => setOtpStatus(''), 3000);
      }
    } catch (err) {
      setOtpStatus('Network error. Please try again.');
      timeoutRef.current = setTimeout(() => setOtpStatus(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="forgot-password-container">
      <div className="forgot-password-content">
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

        <div className="section-title">Forgot Password?</div>
        <p className="welcome-subtitle">
          Enter your email address and we'll send you a verification code to
          log you in
        </p>

        <div className="form-container">
          <form className="forgot-password-form" onSubmit={handleResetCode}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                className={`form-input ${emailError ? 'error' : ''}`}
                placeholder="Enter your email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              {emailError && <p className="error-message">{emailError}</p>}
            </div>

            <div className="form-actions">
              <button
                className="send-otp-button"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
              <p className="account-prompt">Remember Password?</p>
              <button
                className="register-button"
                type="button"
                onClick={() => navigate('/login')}
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ForgotPasswordForm;