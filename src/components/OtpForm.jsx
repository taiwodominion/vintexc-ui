import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/OtpForm.css';

const OtpForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { flow, identity, password, email } = location.state || {};
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [otpStatus, setOtpStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      setOtpStatus('Please enter complete 6-digit OTP');
      timeoutRef.current = setTimeout(() => setOtpStatus(''), 3000);
      return;
    }

    setLoading(true);
    setOtpStatus('');

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    try {
      if (flow === 'login') {
        // ✅ Login OTP validation
        const raw = JSON.stringify({
          identity: identity,
          password: password,
          otp: otpCode,
        });

        const response = await fetch(
          'https://api.vintexc.com/apps/auth/login/validate_login',
          {
            method: 'POST',
            headers: myHeaders,
            body: raw,
          }
        );

        const result = await response.json();
        console.log('OTP validation response:', result);

        if (result.status === 'success' && result.data?.jwt_token) {
          localStorage.setItem('token', result.data.jwt_token);
          // Clear timeout before navigating
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          navigate('/assets');
        } else {
          setOtpStatus(result.message || 'Invalid OTP. Please try again.');
          timeoutRef.current = setTimeout(() => setOtpStatus(''), 3000);
        }
      } else if (flow === 'forgotPassword') {
        // ✅ Forgot Password OTP validation
        const raw = JSON.stringify({
          email: email,
          token: otpCode, // ✅ Note: API uses 'token' not 'otp'
        });

        const response = await fetch(
          'https://api.vintexc.com/apps/auth/forgot_password/validate_reset_code',
          {
            method: 'POST',
            headers: myHeaders,
            body: raw,
          }
        );

        const result = await response.json();
        console.log('Reset OTP validation response:', result);

        if (result.status === 'success') {
          // ✅ Navigate to reset password page
          // Clear timeout before navigating
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          navigate('/reset-password', { 
            state: { 
              email: email,
              token: otpCode 
            } 
          });
        } else {
          setOtpStatus(result.message || 'Invalid OTP. Please try again.');
          timeoutRef.current = setTimeout(() => setOtpStatus(''), 3000);
        }
      }
    } catch (err) {
      console.error('Error verifying OTP:', err);
      setOtpStatus('Network error. Please try again.');
      timeoutRef.current = setTimeout(() => setOtpStatus(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="otp-container">
      <h2>Enter Verification Code</h2>
      <p>
        We sent a code to <strong>{flow === 'login' ? identity : email}</strong>
      </p>

      {/* OTP Status Display - similar to your other forms */}
      {otpStatus && (
        <div className="otp-status-card">
          {otpStatus === 'loading' ? 'Loading...' : otpStatus}
        </div>
      )}

      <form onSubmit={handleSubmit} className="otp-form">
        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="otp-input"
              disabled={loading}
            />
          ))}
        </div>

        <button type="submit" className="verify-btn" disabled={loading}>
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>
    </main>
  );
};

export default OtpForm;