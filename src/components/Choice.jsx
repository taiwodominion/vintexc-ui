import React from 'react'
import learnImg from '../assets/learn.png'
import saveImg from '../assets/savings.png'
import growthImg from '../assets/growth.png'
import resumeImg from '../assets/online-resume.png'
import "../css/Choice.css"

const Choice = () => {
  return (
      <div className="choice-container">
        <div className="choice-title">Why Choose Us</div>
        <div className="choice-content">
            <h1>The VINTEXC Advantage</h1>
            <p>Vintexc is engineered for the future, providing robust access to the dynamic Futures markets and groundbreaking AI-powered analytics designed to uncover opportunities and optimize performance where human intuition often reaches its limits.</p>
            <div className="choice-grid">
                <div className="box">
                    <img src={learnImg} alt="" />
                    <p>Safe and Stable</p>
                </div>
                <div className="box">
                    <img src={saveImg} alt="" />
                    <p>Professional and Reliable</p>
                </div>
                <div className="box">
                    <img src={growthImg} alt="" />
                    <p>Serve with Heart</p>
                </div>
                <div className="box">
                    <img src={resumeImg} alt="" />
                    <p>High Performance</p>
                </div>
            </div>
        </div> 
      </div>
  )
}

export default Choice