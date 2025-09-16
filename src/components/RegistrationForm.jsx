import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faEye,
  faEyeSlash,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import '../css/RegistrationForm.css';

const RegistrationForm = () => {
  const navigate = useNavigate();

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Error states
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [verificationCodeError, setVerificationCodeError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [termsError, setTermsError] = useState('');

  // Track touched fields
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    verificationCode: false,
    username: false,
    password: false,
    confirmPassword: false,
    terms: false,
  });

  // Validation functions
  const validateFullName = (name) => {
    if (!name.trim()) return 'Full name is required';
    if (name.length < 2) return 'Name must be at least 2 characters';
    if (!/^[a-zA-Z\s\-']+$/.test(name))
      return 'Only letters, spaces, hyphens and apostrophes allowed';
    if (name.length > 50) return 'Name cannot exceed 50 characters';
    return '';
  };

  const validateEmail = (email) => {
    if (!email.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return 'Please enter a valid email address';
    if (email.length > 100) return 'Email cannot exceed 100 characters';
    return '';
  };

  const validateVerificationCode = (code) => {
    if (!code.trim()) return 'Verification code is required';
    if (!/^\d{6}$/.test(code))
      return 'Verification code must be exactly 6 digits';
    return '';
  };

  const validateUsername = (username) => {
    if (!username.trim()) return 'Username is required';
    if (username.length < 3) return 'Username must be at least 3 characters';
    if (username.length > 20) return 'Username cannot exceed 20 characters';
    if (!/^[a-zA-Z0-9_-]+$/.test(username))
      return 'Username can only contain letters, numbers, underscores and hyphens';
    if (/^\d+$/.test(username))
      return 'Username cannot consist only of numbers';
    return '';
  };

  const validatePassword = (password) => {
    if (!password.trim()) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/(?=.*[a-z])/.test(password))
      return 'Password must contain at least one lowercase letter';
    if (!/(?=.*[A-Z])/.test(password))
      return 'Password must contain at least one uppercase letter';
    if (!/(?=.*\d)/.test(password))
      return 'Password must contain at least one number';
    if (!/(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?])/.test(password))
      return 'Password must contain at least one special character';
    return '';
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword.trim()) return 'Please confirm your password';
    if (confirmPassword !== password) return 'Passwords do not match';
    return '';
  };

  const validateTerms = (isChecked) => {
    if (!isChecked) return 'You must agree to the Terms of Service';
    return '';
  };

  // Handle blur validation
  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });

    switch (field) {
      case 'fullName':
        setFullNameError(validateFullName(fullName));
        break;
      case 'email':
        setEmailError(validateEmail(email));
        break;
      case 'verificationCode':
        setVerificationCodeError(validateVerificationCode(verificationCode));
        break;
      case 'username':
        setUsernameError(validateUsername(username));
        break;
      case 'password':
        setPasswordError(validatePassword(password));
        break;
      case 'confirmPassword':
        setConfirmPasswordError(
          validateConfirmPassword(confirmPassword, password)
        );
        break;
      case 'terms':
        setTermsError(validateTerms(agreeTerms));
        break;
      default:
        break;
    }
  };

  // Send OTP
  const handleSendOtp = async () => {
    try {
      const res = await fetch(
        'https://api.vintexc.com/apps/auth/register/verify_registration',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            fullname: fullName, 
            email
           }),
        }
      );
      const data = await res.json();
      console.log('Send OTP Response:', data);
      alert(data.message || 'OTP sent to your email.');
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP.');
    }
  };

  // Validate OTP
  const handleValidateOtp = async () => {
    try {
      const res = await fetch(
        'https://api.vintexc.com/apps/auth/register/validate_reg_otp',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp: verificationCode }),
        }
      );
      const data = await res.json();
      console.log('Validate OTP Response:', data);
      return data.status === 'success';
    } catch (error) {
      console.error('Error validating OTP:', error);
      return false;
    }
  };

  // Submit handler
  const registerUser = async (e) => {
    e.preventDefault();

    // Validate all fields
    const errors = {
      fullName: validateFullName(fullName),
      email: validateEmail(email),
      verificationCode: validateVerificationCode(verificationCode),
      username: validateUsername(username),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(confirmPassword, password),
      terms: validateTerms(agreeTerms),
    };

    setFullNameError(errors.fullName);
    setEmailError(errors.email);
    setVerificationCodeError(errors.verificationCode);
    setUsernameError(errors.username);
    setPasswordError(errors.password);
    setConfirmPasswordError(errors.confirmPassword);
    setTermsError(errors.terms);

    setTouched({
      fullName: true,
      email: true,
      verificationCode: true,
      username: true,
      password: true,
      confirmPassword: true,
      terms: true,
    });

    if (Object.values(errors).some((error) => error !== '')) {
      return;
    }

    // Validate OTP first
    const otpValid = await handleValidateOtp();
    if (!otpValid) {
      alert('Invalid OTP, please try again.');
      return;
    }

    // Register account
    try {
      const res = await fetch(
        'https://api.vintexc.com/apps/auth/register/register_account',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullname: fullName,
            email,
            username,
            password,
            referralCode,
          }),
        }
      );
      const data = await res.json();
      console.log('Register Account Response:', data);
      alert(data.message || 'Registration complete!');
    } catch (error) {
      console.error('Error registering account:', error);
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
        </div>

        <div className="section-title">Welcome Onboard User</div>
        <p className="welcome-subtitle">
          Enter details to register and start trading
        </p>

        <div className="form-container">
          <form className="registration-form" onSubmit={registerUser}>
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label">Fullname</label>
              <input
                className={`form-input ${
                  touched.fullName && fullNameError ? 'error' : ''
                }`}
                placeholder="Enter fullname"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onBlur={() => handleBlur('fullName')}
              />
              {touched.fullName && fullNameError && (
                <div className="error-message">
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="error-icon"
                  />
                  {fullNameError}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className={`form-input ${
                  touched.email && emailError ? 'error' : ''
                }`}
                placeholder="Enter email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur('email')}
              />
              {touched.email && emailError && (
                <div className="error-message">
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="error-icon"
                  />
                  {emailError}
                </div>
              )}
            </div>

            {/* Verification Code */}
            <div className="form-group">
              <label className="form-label">Verification Code</label>
              <div className="verification-container">
                <div className="verification-input-wrapper">
                  <input
                    className={`form-input verification-input ${
                      touched.verificationCode && verificationCodeError
                        ? 'error'
                        : ''
                    }`}
                    placeholder="Enter 6-digit verification code"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value) && value.length <= 6) {
                        setVerificationCode(value);
                      }
                    }}
                    onBlur={() => handleBlur('verificationCode')}
                  />
                </div>
                <button
                  className="send-code-button"
                  type="button"
                  onClick={handleSendOtp}
                >
                  Send
                </button>
              </div>
              {touched.verificationCode && verificationCodeError && (
                <div className="error-message">
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="error-icon"
                  />
                  {verificationCodeError}
                </div>
              )}
            </div>

            {/* Username */}
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                className={`form-input ${
                  touched.username && usernameError ? 'error' : ''
                }`}
                placeholder="Enter username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => handleBlur('username')}
              />
              {touched.username && usernameError && (
                <div className="error-message">
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="error-icon"
                  />
                  {usernameError}
                </div>
              )}
            </div>

            {/* Password */}
            <div className="form-group password-group">
              <label className="form-label">Password</label>
              <input
                className={`form-input ${
                  touched.password && passwordError ? 'error' : ''
                }`}
                placeholder="Enter password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur('password')}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              />
              {touched.password && passwordError && (
                <div className="error-message">
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="error-icon"
                  />
                  {passwordError}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group password-group">
              <label className="form-label">Confirm Password</label>
              <input
                className={`form-input ${
                  touched.confirmPassword && confirmPasswordError ? 'error' : ''
                }`}
                placeholder="Confirm password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => handleBlur('confirmPassword')}
              />
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
              {touched.confirmPassword && confirmPasswordError && (
                <div className="error-message">
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="error-icon"
                  />
                  {confirmPasswordError}
                </div>
              )}
            </div>

            {/* Referral Code */}
            <div className="form-group">
              <label className="form-label">Referral Code (Optional)</label>
              <input
                className="form-input"
                placeholder="Enter referral code/username"
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
              />
            </div>

            {/* Terms */}
            <div className="terms-container">
              <input
                id="agreeTerms"
                className={`terms-checkbox ${
                  touched.terms && termsError ? 'error' : ''
                }`}
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => {
                  setAgreeTerms(e.target.checked);
                  if (touched.terms) {
                    setTermsError(validateTerms(e.target.checked));
                  }
                }}
                onBlur={() => handleBlur('terms')}
              />
              <label htmlFor="agreeTerms" className="terms-label">
                I have read and agree to the{' '}
                <span className="terms-link">Terms of Service</span>
              </label>
              {touched.terms && termsError && (
                <div className="error-message">
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="error-icon"
                  />
                  {termsError}
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="form-actions">
              <button className="register-button" type="submit">
                Register
              </button>
              <p className="account-prompt">Have an account already?</p>
              <button
                className="login-button"
                type="button"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default RegistrationForm;
