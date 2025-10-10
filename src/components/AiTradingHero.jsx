import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import shapeImg1 from '../assets/shape1.png';
import shapeImg2 from '../assets/shape2.png';
import shapeImg3 from '../assets/shape4.png';
import shapeImg4 from '../assets/shape6.png';
import shapeImg5 from '../assets/shape5.png';
import shapeImg6 from '../assets/shape3.png';
import '../css/AiTradingHero.css';

const AiTradingHero = () => {
    const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="ai-trading-hero-container">
      <h4 className="ai-trading-hero-title">Ai Trading</h4>

      <div className="ai-trading-hero-grid">
        <div className="hero-section">
          <div className="ai-hero-main">
            <div className="ai-hero-content">
              <p className="ai-hero-subtitle">VINTEXC</p>
              <p className="ai-hero-heading">Gain Your Edge With AI Trading</p>
              <p className="ai-hero-description">
                Gain Your Edge with AI Trading: Leverage intelligent algorithms
                to identify opportunities and optimize your trading performance
                around the clock
              </p>
              <button className="ai-hero-button" type="button">
                <FontAwesomeIcon icon={faPaperPlane} className="button-icon" />
                Enable Ai Trading
              </button>
            </div>
            <div className="ai-hero-graphics">
              <img alt="Asset 1" src={shapeImg1} />
              <img
                alt="Asset 2"
                className="asset-hero-sphere"
                src={shapeImg2}
              />
              <img alt="Asset 3" className="asset-hero-pill" src={shapeImg3} />
              <img
                alt="Asset 4"
                className="asset-hero-toroid"
                src={shapeImg4}
              />
              <img alt="Asset 5" className="asset-hero-cube" src={shapeImg5} />
              <img alt="Asset 6" className="asset-hero-white" src={shapeImg6} />
            </div>
          </div>
        </div>

        <div className="assets-valuation">
          <div className="valuation-header">
            <h4 className="valuation-title">Total Assets valuation</h4>
            <span className="view-icon">
              <FontAwesomeIcon icon={faEye} 
              onClick={() => setShowPassword(!showPassword)}
              />
            </span>
          </div>

          <div className="valuation-amount">
            <h1 className="amount">{showPassword ? '*****' : '0.0000'}</h1>
            <p className="currency">USDT</p>
          </div>

          <div className="income-stats">
            <div className="stat-item">
              <p className="stat-label">30 days cumulative income (USDT)</p>
              <p className="stat-value">{showPassword ? '*****' : '$0.0000'}</p>
            </div>
            <div className="stat-item">
              <p className="stat-label">Today's earning (USDT)</p>
              <p className="stat-value">{showPassword ? '*****' : '$0.0000'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiTradingHero;
