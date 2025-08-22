import React from 'react'
import { useNavigate } from "react-router-dom";
import '../css/Action.css'

const Action = () => {
  const navigate = useNavigate();
  return (
    <div className='action-container'>
        <div className='action-title'>Get In On The Crypto Action</div>
        <p>Provide easy access to customer support through chatbots or live chat features.</p>
        <div className="action-buttons">
            <button className='btn' onClick={() => navigate("/login")}>Get Started</button>
            <button className='btn btn-outline' onClick={() => navigate("/login")}>Contact Us</button>
        </div>
    </div>
  )
}

export default Action