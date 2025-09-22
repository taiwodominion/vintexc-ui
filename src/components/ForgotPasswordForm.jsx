// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import '../css/ForgotPasswordForm.css';

// const ForgotPasswordForm = () => {
//   const navigate = useNavigate();
//    const [email, setEmail] = useState('');
//    const [emailError, setEmailError] = useState('');

//    const [touched, setTouched] = useState({
//        email: false,
//      });

//      const validateEmail = (email) => {
//     if (!email.trim()) return 'Email is required';
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
//       return 'Please enter a valid email address';
//     if (email.length > 100) return 'Email cannot exceed 100 characters';
//     return '';
//   };

//   const handleBlur = (field) => {
//     setTouched({ ...touched, [field]: true });

//     switch (field) {
//       case 'email':
//         setEmailError(validateEmail(email));
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <main className="forgot-password-container">
//       <div className="forgot-password-content">
//         <div className="navigation-section">
//           <button
//             className="back-button"
//             type="button"
//             onClick={() => navigate('/')}
//           >
//             <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
//             Back Home
//           </button>
//         </div>

//         <div className="section-title">Forgot Password?</div>
//         <p className="welcome-subtitle">
//           Enter your email address and we'll send you a verification code to
//           reset your password
//         </p>

//         <div className="form-container">
//           <form className="forgot-password-form">
//             <div className="form-group">
//               <label className="form-label">Email Address</label>
//               <input
//                 className={`form-input verification-input ${
//                   touched.verificationCode && verificationCodeError
//                     ? 'error'
//                     : ''
//                 }`}
//                 placeholder="Enter your email address"
//                 type="text"
//                 value={verificationCode}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   if (/^\d*$/.test(value) && value.length <= 6) {
//                     setVerificationCode(value);
//                   }
//                 }}
//                 onBlur={() => handleBlur('verificationCode')}
//               />
//             </div>

//             <div className="form-actions">
//               <button className="send-otp-button" type="submit">
//                 Send OTP
//               </button>
//               <p className="account-prompt">Remember Password?</p>
//               <button
//                 className="register-button"
//                 type="button"
//                 onClick={() => navigate('/login')}
//               >
//                 Back to Login
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default ForgotPasswordForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../css/ForgotPasswordForm.css';

const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState('');

  const validateEmail = (value) => {
    if (!value.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return 'Please enter a valid email address';
    if (value.length > 100) return 'Email cannot exceed 100 characters';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateEmail(email);
    setEmailError(error);

    if (error) return;

    setLoading(true);
    setServerMessage('');

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Cookie', 'PHPSESSID=773351a72691ec365f7efc10698535fb');

    const raw = JSON.stringify({
      email: 'wanoghoco@gmail.com',
      device: 'Safari',
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      const response = await fetch(
        'https://api.vintexc.com/apps/auth/forgot_password/forgot_password',
        requestOptions
      );

      const data = await response.json();

      if (data.status === 'success') {
        setServerMessage(data.message);
        setTimeout(() => navigate('/enter-otp'), 1500);
      } else {
        setServerMessage(data.message || 'Something went wrong');
      }
    } catch (err) {
      setServerMessage('Network error. Please try again.');
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
        </div>

        <div className="section-title">Forgot Password?</div>
        <p className="welcome-subtitle">
          Enter your email address and we'll send you a verification code to
          reset your password
        </p>

        <div className="form-container">
          <form className="forgot-password-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                className={`form-input ${emailError ? 'error' : ''}`}
                placeholder="Enter your email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              {serverMessage && (
                <p className="server-message">{serverMessage}</p>
              )}
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
