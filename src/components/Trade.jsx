import React from 'react'
import { useNavigate } from "react-router-dom";
import '../css/Trade.css'
import tradeImg from '../assets/vintexc-trade.png'

const Trade = () => {
  const navigate = useNavigate();
  return (
    <div className='overlay'>
        <section className='trade-container'>
            <img src={tradeImg} alt="" />
            <div className="trade-content">
                <h1>Trade Anytime, Anywhere</h1>
                <p>Download our app to enjoy all the benefits of <span>VINTEXC</span> on the go.</p>
                <div className="trade-button">
                    <button className="btn" onClick={() => navigate("/login")} >Get Started</button>
                    <button className="btn btn-outline" onClick={() => navigate("/login")} >Start Trading</button>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Trade