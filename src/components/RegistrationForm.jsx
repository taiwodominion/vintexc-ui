import React from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../css/RegistrationForm.css'

const RegistrationForm = () => {
    const navigate = useNavigate();

  return (
    <main className="registration-container">
      <div className="registration-content">
        <div className="navigation-section">
          <button className="back-button" type="button" onClick={() => navigate("/")} >
            <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
            Back Home
          </button>
        </div>
        
        <div className="section-title">Welcome Onboard User</div>
        <p className="welcome-subtitle">
          Enter details to register and start trading
        </p>
        
        <div className="form-container">
          <form className="registration-form">
            <div className="form-group">
              <label className="form-label">Fullname</label>
              <input 
                className="form-input" 
                placeholder="Enter fullname" 
                type="text" 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Email</label>
              <input 
                className="form-input" 
                placeholder="Enter email address" 
                type="email" 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Verification Code</label>
              <div className="verification-container">
                <div className="verification-input-wrapper">
                  <input 
                    className="form-input verification-input" 
                    placeholder="Enter 6-digit verification code" 
                    type="text" 
                  />
                </div>
                <button className="send-code-button" type="button">
                  Send
                </button>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Username</label>
              <div className="input-wrapper">
                <input 
                  className="form-input username-input" 
                  placeholder="Enter username" 
                  type="text" 
                />
              </div>
            </div>
            
            <div className="form-group password-group">
              <label className="form-label">Password</label>
              <input 
                className="form-input password-input" 
                placeholder="Enter password" 
                type="password" 
              />
              <FontAwesomeIcon icon={faEye} className="password-toggle" />
            </div>
            
            <div className="form-group password-group">
              <label className="form-label">Confirm Password</label>
              <input 
                className="form-input password-input" 
                placeholder="Confirm password" 
                type="password" 
              />
              <FontAwesomeIcon icon={faEye} className="password-toggle" />
            </div>
            
            <div className="form-group">
              <label className="form-label">Referral Code (Optional)</label>
              <input 
                className="form-input" 
                placeholder="Enter referral code/username" 
                type="text" 
              />
            </div>
            
            <div className="terms-container">
              <input 
                id="agreeTerms" 
                className="terms-checkbox" 
                type="checkbox" 
              />
              <label htmlFor="agreeTerms" className="terms-label">
                I have read and agree to the <span className="terms-link">Terms of Service</span>
              </label>
            </div>
            
            <div className="form-actions">
              <button className="register-button" type="submit">
                Register
              </button>
              <p className="account-prompt">Have an account already?</p>
              <button className="login-button" type="button" onClick={() => navigate("/login")}>
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