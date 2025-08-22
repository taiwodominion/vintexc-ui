import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../css/ForgotPasswordForm.css'

const ForgotPasswordForm = () => {
    const navigate = useNavigate();

    return (
        <main className="forgot-password-container">
            <div className="forgot-password-content">
                <div className="navigation-section">
                    <button className="back-button" type="button" onClick={() => navigate("/")} >
                        <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
                        Back Home
                    </button>
                </div>
                
                <div className="section-title">Forgot Password?</div>
                <p className="welcome-subtitle">
                    Enter your email address and we'll send you a verification code to reset your password
                </p>
                
                <div className="form-container">
                    <form className="forgot-password-form">
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input 
                                className="form-input" 
                                placeholder="Enter email" 
                                type="text" 
                            />
                        </div>
                        
                        
                        <div className="form-actions">
                            <button className="send-otp-button" type="submit">
                                Send OTP
                            </button>
                            <p className="account-prompt">Remember Password?</p>
                            <button 
                                className="register-button" 
                                type="button"
                                onClick={() => navigate("/login")}
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