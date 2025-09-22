// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faArrowLeft,
//   faEye,
//   faEyeSlash,
// } from '@fortawesome/free-solid-svg-icons';
// import '../css/LoginForm.css';

// const LoginForm = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [identifier, setIdentifier] = useState('');
//   const [password, setPassword] = useState('');
//   const [device, setDevice] = useState('');
//   const [error, setError] = useState('');

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');

//     const myHeaders = new Headers();
//     myHeaders.append('Content-Type', 'application/json');
//     myHeaders.append('Cookie', 'PHPSESSID=0ca725228278e300d4e6a18ed9cc1910');

//     const raw = JSON.stringify({
//       identity: identifier,
//       password: password,
//       device: device,
//     });

//     const requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: raw,
//       redirect: 'follow',
//     };

//     try {
//       const res = await fetch(
//         'https://api.vintexc.com/apps/auth/login/login',
//         requestOptions
//       );

//       const data = await res.json();
//       console.log(data);
//       if (data.status === 'success') {
//         // Login successful -> ask for OTP
//         navigate('/enter-otp', { state: { identifier } });
//         navigate('/enter-otp', { state: { password } });
//       } else {
//         // User not found OR wrong credentials
//         setError('Incorrect email/username or password');
//       }
//     } catch (error) {
//       console.log(error);
//     }

//     // try {
//     //   const res = await fetch("https://api.vintexc.com/apps/auth/login/validate_login", {
//     //     method: "POST",
//     //     headers: { "Content-Type": "application/json" },
//     //     body: JSON.stringify({
//     //       identifier,
//     //       password
//     //     }),
//     //   });

//     //   const data = await res.json();
//     //   console.log("Login Response:", data);

//     // if (data.status === "success") {
//     //   // Login successful -> ask for OTP
//     //   navigate("/validate-otp", { state: { identifier } });
//     // } else {
//     //   // User not found OR wrong credentials
//     //   setError("Incorrect email/username or password");
//     // }
//     // } catch (err) {
//     //   console.error("Error logging in:", err);
//     //   setError("Something went wrong. Please try again.");
//     // }
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
//         </div>

//         <div className="section-title">Welcome Back User</div>
//         <p className="welcome-subtitle">
//           Enter details to login and start trading
//         </p>

//         <div className="form-container">
//           <form className="registration-form" onSubmit={handleLogin}>
//             <div className="form-group">
//               <label className="form-label">Email / Username</label>
//               <input
//                 className="form-input"
//                 placeholder="Enter email or username"
//                 type="text"
//                 value={identifier}
//                 onChange={(e) => setIdentifier(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="form-group password-group">
//               <label className="form-label">Password</label>
//               <input
//                 className="form-input password-input"
//                 placeholder="Enter password"
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <button
//                 type="button"
//                 className="password-toggle-btn"
//                 onClick={togglePasswordVisibility}
//               >
//                 <FontAwesomeIcon
//                   icon={showPassword ? faEyeSlash : faEye}
//                   className="password-toggle-icon"
//                 />
//               </button>
//             </div>

//             {error && <p className="error-message">{error}</p>}

//             <div className="forgot-password">
//               <Link to="/forgotpassword" className="forgot-password-link">
//                 forgot password?
//               </Link>
//             </div>

//             <div className="form-actions">
//               <button className="login-button" type="submit">
//                 Login
//               </button>
//               <p className="account-prompt">New User?</p>
//               <button
//                 className="register-button"
//                 type="button"
//                 onClick={() => navigate('/signup')}
//               >
//                 Get Started / Register
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default LoginForm;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import '../css/LoginForm.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [device, setDevice] = useState('Browser'); // ✅ default device
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      identity: identifier,
      password: password,
      device: device,
    });

    try {
      const res = await fetch('https://api.vintexc.com/apps/auth/login/login', {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      });

      const data = await res.json();
      console.log('Login response:', data);

      if (data.status === 'success') {
        // ✅ pass identity (NOT identifier) and password
        navigate('/enter-otp', { state: { identity: identifier, password } });
      } else {
        setError(data.message || 'Incorrect email/username or password');
      }
    } catch (error) {
      console.error(error);
      setError('Something went wrong. Please try again.');
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

        <div className="section-title">Welcome Back User</div>
        <p className="welcome-subtitle">
          Enter details to login and start trading
        </p>

        <div className="form-container">
          <form className="registration-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Email / Username</label>
              <input
                className="form-input"
                placeholder="Enter email or username"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>

            <div className="form-group password-group">
              <label className="form-label">Password</label>
              <input
                className="form-input password-input"
                placeholder="Enter password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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

            {error && <p className="error-message">{error}</p>}

            <div className="forgot-password">
              <Link to="/forgotpassword" className="forgot-password-link">
                forgot password?
              </Link>
            </div>

            <div className="form-actions">
              <button className="login-button" type="submit">
                Login
              </button>
              <p className="account-prompt">New User?</p>
              <button
                className="register-button"
                type="button"
                onClick={() => navigate('/signup')}
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
