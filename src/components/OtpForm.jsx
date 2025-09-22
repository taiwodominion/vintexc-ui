// import React, { useState, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import "../css/OtpForm.css";

// const OtpForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ✅ get identity (username/email) passed from LoginForm
//   const identity = location.state?.identifier;
//   const password = location.state?.password;

//   const OTP_LENGTH = 6;
//   const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
//   const inputsRef = useRef([]);

//   const handleChange = (value, index) => {
//     if (!/^[0-9]?$/.test(value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < OTP_LENGTH - 1) {
//       inputsRef.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputsRef.current[index - 1].focus();
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const otpCode = otp.join("");

//     console.log("OTP Entered:", otpCode);

//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     // const raw = JSON.stringify({
//     //   identity: identity,
//     //   token: otpCode,
//     // });

//     const raw = JSON.stringify({
//       identity: identity,
//       password: password,
//       otp: '000000'
//     });

//     try {
//       const res = await fetch(
//         "https://api.vintexc.com/apps/auth/login/validate_login",
//         {
//           method: "POST",
//           headers: myHeaders,
//           body: raw,
//         }
//       );

//       const data = await res.json();
//       console.log("OTP validation:", data);

//       if (data.status === "success") {
//         navigate("/dashboard"); // ✅ success → go to dashboard
//       } else {
//         alert(data.message || "Invalid OTP");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Network error, please try again.");
//     }
//   };

//   return (
//     <main className="otp-container">
//       <h2>Enter Verification Code</h2>
//       <p>We sent a code to <strong>{identity}</strong></p>

//       <form onSubmit={handleSubmit} className="otp-form">
//         <div className="otp-inputs">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               type="text"
//               maxLength="1"
//               value={digit}
//               ref={(el) => (inputsRef.current[index] = el)}
//               onChange={(e) => handleChange(e.target.value, index)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//               className="otp-input"
//             />
//           ))}
//         </div>

//         <button type="submit" className="verify-btn">
//           Verify OTP
//         </button>
//       </form>
//     </main>
//   );
// };

// export default OtpForm;

import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/OtpForm.css';

const OtpForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ safely get values passed from LoginForm
  const identity = location.state?.identity; // ✅ now matches
  const password = location.state?.password;

  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''));
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
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

    console.log('OTP Entered:', otpCode);

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    // ✅ send correct payload to backend
    const raw = JSON.stringify({
      identity: identity,
      password: password,
      otp: otpCode || '000000', // fallback to hardcoded if input empty
    });

    try {
      const res = await fetch(
        'https://api.vintexc.com/apps/auth/login/validate_login',
        {
          method: 'POST',
          headers: myHeaders,
          body: raw,
        }
      );

      const data = await res.json();
      console.log('OTP validation:', data);

      if (data.status === 'success') {
        navigate('/assets');
      } else {
        alert(data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error(error);
      alert('Network error, please try again.');
    }
  };

  return (
    <main className="otp-container">
      <h2>Enter Verification Code</h2>
      <p>
        We sent a code to <strong>{identity}</strong>
      </p>

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
            />
          ))}
        </div>

        <button type="submit" className="verify-btn">
          Verify OTP
        </button>
      </form>
    </main>
  );
};

export default OtpForm;
