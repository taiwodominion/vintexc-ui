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

  const identity = location.state?.identity;
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

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Cookie', 'PHPSESSID=1fb2e584b1527d603541bdcedd62e6c9');

    const raw = JSON.stringify({
      identity: identity,
      password: password,
      otp: otp.join(''),
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      const response = await fetch(
        'https://api.vintexc.com/apps/auth/login/validate_login',
        requestOptions
      );

      const result = await response.json();
      console.log('OTP validation response:', result);

      if (result?.data?.jwt_token) {
        console.log('JWT Token found:', result.data.jwt_token);

        localStorage.setItem('token', result.data.jwt_token);

        navigate('/assets');
      } else {
        console.error('No jwt_token found. Response was:', result);
      }
    } catch (err) {
      console.error('Error verifying OTP:', err);
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
