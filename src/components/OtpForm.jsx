import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/OtpForm.css';

const OtpForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { flow, identity, password, email } = location.state || {};

  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [otpStatus, setOtpStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputsRef = useRef([]);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const startTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCanResend(false);
    setTimeLeft(60);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [startTimer]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResendCode = async () => {
    if (!canResend || loading) return;
    setLoading(true);
    setOtpStatus('');
    try {
      const response = await fetch(
        'https://api.vintexc.com/apps/auth/forgot_password/forgot_password',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, device: 'Browser' }),
        }
      );
      const data = await response.json();
      if (data.status === 'success') {
        setOtpStatus('Verification code resent successfully');
        startTimer();
      } else {
        setOtpStatus(data.message || 'Failed to resend code');
      }
    } catch (err) {
      setOtpStatus('Network error. Please try again');
    } finally {
      setLoading(false);
      timeoutRef.current = setTimeout(() => setOtpStatus(''), 3000);
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
    try {
      setOtpStatus('Loading...');
      if (flow === 'login') {
        const raw = JSON.stringify({ identity, password, otp: otpCode });
        const response = await fetch(
          'https://api.vintexc.com/apps/auth/login/validate_login',
          { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: raw }
        );
        const result = await response.json();
        if (result.status === 'success' && result.data?.jwt_token) {
          localStorage.setItem('token', result.data.jwt_token);
          navigate('/assets');
        } else {
          setOtpStatus(result.message || 'Invalid OTP. Please try again.');
          timeoutRef.current = setTimeout(() => setOtpStatus(''), 3000);
        }
      } else if (flow === 'forgotPassword') {
        const raw = JSON.stringify({ email, token: otpCode });
        const response = await fetch(
          'https://api.vintexc.com/apps/auth/forgot_password/validate_reset_code',
          { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: raw }
        );
        const result = await response.json();
        if (result.status === 'success') {
          navigate('/reset-password', { state: { email, token: otpCode } });
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
      {otpStatus && <div className="otp-status-card">{otpStatus}</div>}
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
        <div>
          {!canResend && timeLeft > 0 && (
            <p>
              Time Left: <span className="otp-timer">{timeLeft}s</span>
            </p>
          )}
          {canResend && (
            <p className="resend-text">
              Didn't receive the code?{' '}
              <span
                className={`resend-link ${loading ? 'disabled' : ''}`}
                onClick={handleResendCode}
                role="button"
                tabIndex={0}
              >
                Resend Code
              </span>
            </p>
          )}
        </div>
      </form>
    </main>
  );
};

export default OtpForm;
