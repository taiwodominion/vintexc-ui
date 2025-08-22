import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../css/LoginForm.css'

const LoginForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <main className="registration-container">
            <div className="registration-content">
                <div className="navigation-section">
                    <button className="back-button" type="button" onClick={() => navigate("/")} >
                        <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
                        Back Home
                    </button>
                </div>
                
                <div className="section-title">Welcome Back User</div>
                <p className="welcome-subtitle">
                    Enter details to login and start trading
                </p>
                
                <div className="form-container">
                    <form className="registration-form">
                        <div className="form-group">
                            <label className="form-label">Email / Username</label>
                            <input 
                                className="form-input" 
                                placeholder="Enter email or username" 
                                type="text" 
                            />
                        </div>
                        
                        <div className="form-group password-group">
                            <label className="form-label">Password</label>
                            <input 
                                className="form-input password-input" 
                                placeholder="Enter password" 
                                type={showPassword ? "text" : "password"} 
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
                            {/* <button type="button" className="forgot-password-btn" onClick={() => navigate("/forgotpassword")}>
                                Forgot Password?
                            </button> */}
                            <Link to="/forgotpassword" className="forgot-password-link">forgot password?</Link>
                        </div>
                        
                        <div className="form-actions">
                            <button className="login-button" type="submit">
                                Login
                            </button>
                            <p className="account-prompt">New User?</p>
                            <button 
                                className="register-button" 
                                type="button"
                                onClick={() => navigate("/signup")}
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