// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faArrowLeft,
//   faEye,
//   faEyeSlash,
//   faExclamationCircle,
// } from '@fortawesome/free-solid-svg-icons';
// import '../css/RegistrationForm.css';

// const RegistrationForm = () => {
//   const navigate = useNavigate();

//   const DEV_BYPASS_OTP = false;

//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [verificationCode, setVerificationCode] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [referralCode, setReferralCode] = useState('');
//   const [agreeTerms, setAgreeTerms] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [fullNameError, setFullNameError] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [verificationCodeError, setVerificationCodeError] = useState('');
//   const [usernameError, setUsernameError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [confirmPasswordError, setConfirmPasswordError] = useState('');
//   const [termsError, setTermsError] = useState('');

//   const [touched, setTouched] = useState({
//     fullName: false,
//     email: false,
//     verificationCode: false,
//     username: false,
//     password: false,
//     confirmPassword: false,
//     terms: false,
//   });

//   const [otpStatus, setOtpStatus] = useState('');

//   // ---------------- VALIDATION FUNCTIONS ----------------
//   const validateFullName = (name) => {
//     if (!name.trim()) return 'Full name is required';
//     if (name.length < 2) return 'Name must be at least 2 characters';
//     if (!/^[a-zA-Z\s\-']+$/.test(name))
//       return 'Only letters, spaces, hyphens and apostrophes allowed';
//     if (name.length > 50) return 'Name cannot exceed 50 characters';
//     return '';
//   };

//   const validateEmail = (email) => {
//     if (!email.trim()) return 'Email is required';
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
//       return 'Please enter a valid email address';
//     if (email.length > 100) return 'Email cannot exceed 100 characters';
//     return '';
//   };

//   const validateVerificationCode = (code) => {
//     if (!code.trim()) return 'Verification code is required';
//     if (!/^\d{6}$/.test(code))
//       return 'Verification code must be exactly 6 digits';
//     return '';
//   };

//   const validateUsername = (username) => {
//     if (!username.trim()) return 'Username is required';
//     if (username.length < 3) return 'Username must be at least 3 characters';
//     if (username.length > 20) return 'Username cannot exceed 20 characters';
//     if (!/^[a-zA-Z0-9_-]+$/.test(username))
//       return 'Username can only contain letters, numbers, underscores and hyphens';
//     if (/^\d+$/.test(username))
//       return 'Username cannot consist only of numbers';
//     return '';
//   };

//   const validatePassword = (password) => {
//     if (!password.trim()) return 'Password is required';
//     if (password.length < 8) return 'Password must be at least 8 characters';
//     if (!/(?=.*[a-z])/.test(password))
//       return 'Password must contain at least one lowercase letter';
//     if (!/(?=.*[A-Z])/.test(password))
//       return 'Password must contain at least one uppercase letter';
//     if (!/(?=.*\d)/.test(password))
//       return 'Password must contain at least one number';
//     if (!/(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?])/.test(password))
//       return 'Password must contain at least one special character';
//     return '';
//   };

//   const validateConfirmPassword = (confirmPassword, password) => {
//     if (!confirmPassword.trim()) return 'Please confirm your password';
//     if (confirmPassword !== password) return 'Passwords do not match';
//     return '';
//   };

//   const validateTerms = (isChecked) => {
//     if (!isChecked) return 'You must agree to the Terms of Service';
//     return '';
//   };

//   const handleBlur = (field) => {
//     setTouched({ ...touched, [field]: true });

//     switch (field) {
//       case 'fullName':
//         setFullNameError(validateFullName(fullName));
//         break;
//       case 'email':
//         setEmailError(validateEmail(email));
//         break;
//       case 'verificationCode':
//         setVerificationCodeError(validateVerificationCode(verificationCode));
//         break;
//       case 'username':
//         setUsernameError(validateUsername(username));
//         break;
//       case 'password':
//         setPasswordError(validatePassword(password));
//         break;
//       case 'confirmPassword':
//         setConfirmPasswordError(
//           validateConfirmPassword(confirmPassword, password)
//         );
//         break;
//       case 'terms':
//         setTermsError(validateTerms(agreeTerms));
//         break;
//       default:
//         break;
//     }
//   };

//   const handleSendOtp = async () => {
//     const myHeaders = new Headers();
//     myHeaders.append('Content-Type', 'application/json');
//     myHeaders.append('Cookie', 'PHPSESSID=f03af51593631d67f9ea4f56d4c4145e');

//     const raw = JSON.stringify({
//       email: email,
//       fullname: fullName,
//     });

//     const requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: raw,
//       redirect: 'follow',
//     };

//     try {
//       setOtpStatus('loading');
//       const res = await fetch(
//         'https://api.vintexc.com/apps/auth/register/verify_registration',
//         requestOptions
//       );
//       const data = await res.json();
//       console.log(data);

//       if (data.status === 'success') {
//         setOtpStatus(data.message || 'Code sent successfully');
//         if (DEV_BYPASS_OTP) {
//           setVerificationCode('000000');
//           setTouched((prev) => ({ ...prev, verificationCode: true }));
//         }
//       } else {
//         setOtpStatus(data.message || 'Failed to send code');
//       }
//     } catch (error) {
//       console.error(error);
//       setOtpStatus('Network error, please try again');
//     }

//     setTimeout(() => setOtpStatus(''), 3000);
//   };

//   const handleValidateOtp = async () => {
//     if (DEV_BYPASS_OTP && verificationCode === '000000') return true;

//     const myHeaders = new Headers();
//     myHeaders.append('Content-Type', 'application/json');
//     myHeaders.append('Cookie', 'PHPSESSID=606b2ae7991010e5127d8b5f96264c07');

//     const raw = JSON.stringify({
//       email: email,
//       otp: verificationCode,
//     });

//     const requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: raw,
//       redirect: 'follow',
//     };

//     try {
//       const res = await fetch(
//         'https://api.vintexc.com/apps/auth/register/validate_reg_otp',
//         requestOptions
//       );
//       const data = await res.json();

//       if (data.status === 'success') {
//         return true;
//       } else {
//         setOtpStatus(data.message || 'Invalid OTP, please try again');
//         setTimeout(() => setOtpStatus(''), 3000);
//         return false;
//       }
//     } catch (error) {
//       console.error(error);
//       setOtpStatus('Network error, please try again');
//       setTimeout(() => setOtpStatus(''), 3000);
//     }
//   };

//   const registerUser = async (e) => {
//     setOtpStatus('');
//     e.preventDefault();

//     const errors = {
//       fullName: validateFullName(fullName),
//       email: validateEmail(email),
//       verificationCode: validateVerificationCode(verificationCode),
//       username: validateUsername(username),
//       password: validatePassword(password),
//       confirmPassword: validateConfirmPassword(confirmPassword, password),
//       terms: validateTerms(agreeTerms),
//     };

//     setFullNameError(errors.fullName);
//     setEmailError(errors.email);
//     setVerificationCodeError(errors.verificationCode);
//     setUsernameError(errors.username);
//     setPasswordError(errors.password);
//     setConfirmPasswordError(errors.confirmPassword);
//     setTermsError(errors.terms);

//     setTouched({
//       fullName: true,
//       email: true,
//       verificationCode: true,
//       username: true,
//       password: true,
//       confirmPassword: true,
//       terms: true,
//     });

//     if (Object.values(errors).some((error) => error !== '')) {
//       return;
//     }

//     const otpValid = await handleValidateOtp();
//     if (!otpValid) {
//       return;
//     }

//     const myHeaders = new Headers();
//     myHeaders.append('Content-Type', 'application/json');
//     myHeaders.append('Cookie', 'PHPSESSID=046ae717fc0d7281b7913f9e564d01dc');

//     const raw = JSON.stringify({
//       fullname: fullName,
//       email: email,
//       username: username,
//       password: password,
//       otp: '000000',
//     });

//     const requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: raw,
//       redirect: 'follow',
//     };

//     try {
//       setOtpStatus('loading...');
//       const res = await fetch(
//         'https://api.vintexc.com/apps/auth/register/register',
//         requestOptions
//       );

//       const data = await res.json();
//       console.log('Register User acct:', data);
//       setOtpStatus(data.message || 'Registration complete');
//       setTimeout(() => setOtpStatus(''), 3000);
//       navigate('/login');
//     } catch (error) {
//       console.log(error);
//       setOtpStatus('Network error, please try again');
//       setTimeout(() => setOtpStatus(''), 3000);
//     }
//   };

//   return (
//     <main className="registration-container">
//       <div className="registration-content">
//         <div className="navigation-section">
//           <button
//             className="back-button"
//             type="button"
//             onClick={() => navigate('/')}
//           >
//             <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
//             Back Home
//           </button>

//           {otpStatus && (
//             <div className="otp-status-card">
//               {otpStatus === 'loading' ? 'Loading...' : otpStatus}
//             </div>
//           )}
//         </div>

//         <div className="section-title">Welcome Onboard User</div>
//         <p className="welcome-subtitle">
//           Enter details to register and start trading
//         </p>

//         <div className="form-container">
//           <form className="registration-form" onSubmit={registerUser}>
//             <div className="form-group">
//               <label className="form-label">Fullname</label>
//               <input
//                 className={`form-input ${
//                   touched.fullName && fullNameError ? 'error' : ''
//                 }`}
//                 placeholder="Enter fullname"
//                 type="text"
//                 value={fullName}
//                 onChange={(e) => setFullName(e.target.value)}
//                 onBlur={() => handleBlur('fullName')}
//               />
//               {touched.fullName && fullNameError && (
//                 <div className="error-message">
//                   <FontAwesomeIcon
//                     icon={faExclamationCircle}
//                     className="error-icon"
//                   />
//                   {fullNameError}
//                 </div>
//               )}
//             </div>

//             <div className="form-group">
//               <label className="form-label">Email</label>
//               <input
//                 className={`form-input ${
//                   touched.email && emailError ? 'error' : ''
//                 }`}
//                 placeholder="Enter email address"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 onBlur={() => handleBlur('email')}
//               />
//               {touched.email && emailError && (
//                 <div className="error-message">
//                   <FontAwesomeIcon
//                     icon={faExclamationCircle}
//                     className="error-icon"
//                   />
//                   {emailError}
//                 </div>
//               )}
//             </div>

//             <div className="form-group">
//               <label className="form-label">Verification Code</label>
//               <div className="verification-container">
//                 <div className="verification-input-wrapper">
//                   <input
//                     className={`form-input verification-input ${
//                       touched.verificationCode && verificationCodeError
//                         ? 'error'
//                         : ''
//                     }`}
//                     placeholder="Enter 6-digit verification code"
//                     type="text"
//                     value={verificationCode}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       if (/^\d*$/.test(value) && value.length <= 6) {
//                         setVerificationCode(value);
//                       }
//                     }}
//                     onBlur={() => handleBlur('verificationCode')}
//                   />
//                 </div>
//                 <button
//                   className="send-code-button"
//                   type="button"
//                   onClick={handleSendOtp}
//                 >
//                   Send
//                 </button>
//               </div>
//               {touched.verificationCode && verificationCodeError && (
//                 <div className="error-message">
//                   <FontAwesomeIcon
//                     icon={faExclamationCircle}
//                     className="error-icon"
//                   />
//                   {verificationCodeError}
//                 </div>
//               )}
//             </div>

//             <div className="form-group">
//               <label className="form-label">Username</label>
//               <input
//                 className={`form-input ${
//                   touched.username && usernameError ? 'error' : ''
//                 }`}
//                 placeholder="Enter username"
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 onBlur={() => handleBlur('username')}
//               />
//               {touched.username && usernameError && (
//                 <div className="error-message">
//                   <FontAwesomeIcon
//                     icon={faExclamationCircle}
//                     className="error-icon"
//                   />
//                   {usernameError}
//                 </div>
//               )}
//             </div>

//             <div className="form-group password-group">
//               <label className="form-label">Password</label>
//               <input
//                 className={`form-input ${
//                   touched.password && passwordError ? 'error' : ''
//                 }`}
//                 placeholder="Enter password"
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 onBlur={() => handleBlur('password')}
//               />
//               <FontAwesomeIcon
//                 icon={showPassword ? faEyeSlash : faEye}
//                 className="password-toggle"
//                 onClick={() => setShowPassword(!showPassword)}
//               />
//               {touched.password && passwordError && (
//                 <div className="error-message">
//                   <FontAwesomeIcon
//                     icon={faExclamationCircle}
//                     className="error-icon"
//                   />
//                   {passwordError}
//                 </div>
//               )}
//             </div>

//             <div className="form-group password-group">
//               <label className="form-label">Confirm Password</label>
//               <input
//                 className={`form-input ${
//                   touched.confirmPassword && confirmPasswordError ? 'error' : ''
//                 }`}
//                 placeholder="Confirm password"
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 onBlur={() => handleBlur('confirmPassword')}
//               />
//               <FontAwesomeIcon
//                 icon={showConfirmPassword ? faEyeSlash : faEye}
//                 className="password-toggle"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               />
//               {touched.confirmPassword && confirmPasswordError && (
//                 <div className="error-message">
//                   <FontAwesomeIcon
//                     icon={faExclamationCircle}
//                     className="error-icon"
//                   />
//                   {confirmPasswordError}
//                 </div>
//               )}
//             </div>

//             <div className="form-group">
//               <label className="form-label">Referral Code (Optional)</label>
//               <input
//                 className="form-input"
//                 placeholder="Enter referral code/username"
//                 type="text"
//                 value={referralCode}
//                 onChange={(e) => setReferralCode(e.target.value)}
//               />
//             </div>

//             <div className="terms-container">
//               <input
//                 id="agreeTerms"
//                 className={`terms-checkbox ${
//                   touched.terms && termsError ? 'error' : ''
//                 }`}
//                 type="checkbox"
//                 checked={agreeTerms}
//                 onChange={(e) => {
//                   setAgreeTerms(e.target.checked);
//                   if (touched.terms) {
//                     setTermsError(validateTerms(e.target.checked));
//                   }
//                 }}
//                 onBlur={() => handleBlur('terms')}
//               />
//               <label htmlFor="agreeTerms" className="terms-label">
//                 I have read and agree to the{' '}
//                 <span className="terms-link">Terms of Service</span>
//               </label>
//               {touched.terms && termsError && (
//                 <div className="error-message">
//                   <FontAwesomeIcon
//                     icon={faExclamationCircle}
//                     className="error-icon"
//                   />
//                   {termsError}
//                 </div>
//               )}
//             </div>

//             <div className="form-actions">
//               <button className="register-button" type="submit">
//                 Register
//               </button>
//               <p className="account-prompt">Have an account already?</p>
//               <button
//                 className="login-button"
//                 type="button"
//                 onClick={() => navigate('/login')}
//               >
//                 Login
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default RegistrationForm;





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

  const DEV_BYPASS_OTP = false;

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

  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [verificationCodeError, setVerificationCodeError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [termsError, setTermsError] = useState('');

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    verificationCode: false,
    username: false,
    password: false,
    confirmPassword: false,
    terms: false,
  });

  const [otpStatus, setOtpStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New loading state

  // ---------------- VALIDATION FUNCTIONS ----------------
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

  const handleSendOtp = async () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Cookie', 'PHPSESSID=f03af51593631d67f9ea4f56d4c4145e');

    const raw = JSON.stringify({
      email: email,
      fullname: fullName,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      setOtpStatus('loading');
      const res = await fetch(
        'https://api.vintexc.com/apps/auth/register/verify_registration',
        requestOptions
      );
      const data = await res.json();
      console.log(data);

      if (data.status === 'success') {
        setOtpStatus(data.message || 'Code sent successfully');
        if (DEV_BYPASS_OTP) {
          setVerificationCode('000000');
          setTouched((prev) => ({ ...prev, verificationCode: true }));
        }
      } else {
        setOtpStatus(data.message || 'Failed to send code');
      }
    } catch (error) {
      console.error(error);
      setOtpStatus('Network error, please try again');
    }

    setTimeout(() => setOtpStatus(''), 3000);
  };

  const handleValidateOtp = async () => {
    if (DEV_BYPASS_OTP && verificationCode === '000000') return true;

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Cookie', 'PHPSESSID=606b2ae7991010e5127d8b5f96264c07');

    const raw = JSON.stringify({
      email: email,
      otp: verificationCode,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      const res = await fetch(
        'https://api.vintexc.com/apps/auth/register/validate_reg_otp',
        requestOptions
      );
      const data = await res.json();

      if (data.status === 'success') {
        return true;
      } else {
        setOtpStatus(data.message || 'Invalid OTP, please try again');
        setTimeout(() => setOtpStatus(''), 3000);
        return false;
      }
    } catch (error) {
      console.error(error);
      setOtpStatus('Network error, please try again');
      setTimeout(() => setOtpStatus(''), 3000);
      return false;
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setOtpStatus('');
    setIsLoading(true); // Set loading state at the beginning

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
      setIsLoading(false); // Reset loading state if validation fails
      return;
    }

    const otpValid = await handleValidateOtp();
    if (!otpValid) {
      setIsLoading(false); // Reset loading state if OTP validation fails
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Cookie', 'PHPSESSID=046ae717fc0d7281b7913f9e564d01dc');

    const raw = JSON.stringify({
      fullname: fullName,
      email: email,
      username: username,
      password: password,
      otp: '000000',
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      // Show loading state
      setOtpStatus('Creating your account...');
      
      const res = await fetch(
        'https://api.vintexc.com/apps/auth/register/register',
        requestOptions
      );

      const data = await res.json();
      console.log('Register User acct:', data);
      
      if (data.status === 'success') {
        setOtpStatus('Registration successful! Redirecting...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setOtpStatus(data.message || 'Registration failed');
        setTimeout(() => setOtpStatus(''), 3000);
      }
    } catch (error) {
      console.log(error);
      setOtpStatus('Network error, please try again');
      setTimeout(() => setOtpStatus(''), 3000);
    } finally {
      setIsLoading(false); // Reset loading state when done
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
            disabled={isLoading}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
            Back Home
          </button>

          {otpStatus && (
            <div className={`otp-status-card ${
              otpStatus === 'loading' || otpStatus === 'Creating your account...' ? 'loading' : 
              otpStatus.includes('success') || otpStatus.includes('successful') ? 'success' : 'error'
            }`}>
              {otpStatus === 'loading' ? 'Sending code...' : 
               otpStatus === 'Creating your account...' ? 'Creating your account...' : 
               otpStatus}
            </div>
          )}
        </div>

        <div className="section-title">Welcome Onboard User</div>
        <p className="welcome-subtitle">
          Enter details to register and start trading
        </p>

        <div className="form-container">
          <form className="registration-form" onSubmit={registerUser}>
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                    disabled={isLoading}
                  />
                </div>
                <button
                  className="send-code-button"
                  type="button"
                  onClick={handleSendOtp}
                  disabled={otpStatus === 'loading' || isLoading}
                >
                  {otpStatus === 'loading' ? 'Sending...' : 'Send'}
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="password-toggle"
                onClick={() => !isLoading && setShowPassword(!showPassword)}
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
                disabled={isLoading}
              />
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                className="password-toggle"
                onClick={() => !isLoading && setShowConfirmPassword(!showConfirmPassword)}
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

            <div className="form-group">
              <label className="form-label">Referral Code (Optional)</label>
              <input
                className="form-input"
                placeholder="Enter referral code/username"
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                disabled={isLoading}
              />
            </div>

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
                disabled={isLoading}
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

            <div className="form-actions">
              <button 
                className="register-button" 
                type="submit"
                disabled={isLoading || otpStatus === 'loading'}
              >
                {isLoading ? 'Creating Account...' : 'Register'}
              </button>
              <p className="account-prompt">Have an account already?</p>
              <button
                className="login-button"
                type="button"
                onClick={() => navigate('/login')}
                disabled={isLoading}
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