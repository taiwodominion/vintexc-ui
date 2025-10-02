import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import '../css/ResetPasswordForm.css';

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [canResend, setCanResend] = useState(true);
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef(null);
  const timeoutRef = useRef(null);
  const [otpStatus, setOtpStatus] = useState('');

  const email = location.state?.email;
  const otp = location.state?.token;

  const handleSubmit = async (e) => {
    setOtpStatus('Loading...');
    e.preventDefault();

    if (!password || !confirmPassword) {
      setOtpStatus('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setOtpStatus('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setOtpStatus('Password must be at least 6 characters');
      return;
    }

    if (!email || !otp) {
      setOtpStatus(
        'Missing required information. Please restart the reset process.'
      );
      return;
    }

    setLoading(true);

    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const raw = JSON.stringify({
        email: email,
        password: password,
        otp: otp,
      });

      const response = await fetch(
        'https://api.vintexc.com/apps/auth/forgot_password/reset_password',
        {
          method: 'POST',
          headers: myHeaders,
          body: raw,
        }
      );

      const result = await response.json();
      console.log('Reset password response:', result);

      if (result.status === 'success') {
        navigate('/login', {
          state: {
            message:
              'Password reset successfully! Please login with your new password.',
          },
        });
      } else {
        setOtpStatus(
          result.message || 'Password reset failed. Please try again.'
        );
      }
    } catch (err) {
      console.error('Reset password error:', err);
      setOtpStatus(
        'Network error. Please check your connection and try again.'
      );
    } finally {
      setLoading(false);
      timeoutRef.current = setTimeout(() => setOtpStatus(''), 3000);
    }
  };

  useEffect(() => {
    if (cooldown > 0) {
      cooldownRef.current = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(cooldownRef.current);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (cooldownRef.current) clearInterval(cooldownRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [cooldown]);

  const handleResendCode = async () => {
    if (!canResend) return;

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
        setOtpStatus('Verification code resent successfully');
        setCanResend(false);
        setCooldown(60);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <main className="reset-main">
      <div className="reset-container">
        <button
          className="back-button"
          onClick={() => navigate('/login')}
          type="button"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
          Back
        </button>

        {otpStatus && (
          <div className="otp-status-card">
            {otpStatus === 'loading' ? 'Loading...' : otpStatus}
          </div>
        )}

        <h4 className="reset-title">Reset Your Password</h4>
        <p className="reset-subtitle">Create a new password for your account</p>

        <form onSubmit={handleSubmit} className="reset-form">
          <div className="input-group">
            <label>New Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
              minLength="6"
            />
            <span
              onClick={togglePasswordVisibility}
              className="password-toggle"
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </span>
          </div>

          <div className="input-group">
            <label>Confirm New Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
              minLength="6"
            />
            <span
              onClick={toggleConfirmPasswordVisibility}
              className="password-toggle"
            >
              {showConfirmPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </span>
          </div>

          <button className="reset-btn" type="submit" disabled={loading}>
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </form>

        <button
          className="back-login-btn"
          type="button"
          onClick={() => navigate('/login')}
        >
          Back to Login
        </button>

        <p className="resend-text">
          Didn't receive the code?{' '}
          <span
            className={`resend-link ${!canResend ? 'disabled' : ''}`}
            onClick={handleResendCode}
            disabled={!canResend || loading}
          >
            {/* Resend OTP */}
            {canResend ? 'Resend Code' : `Resend in ${cooldown}s`}
          </span>
        </p>
      </div>
    </main>
  );
};

export default ResetPasswordForm;
