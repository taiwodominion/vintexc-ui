import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faPaperPlane,
  faXmark,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import shapeImg1 from '../assets/shape1.png';
import shapeImg2 from '../assets/shape2.png';
import shapeImg3 from '../assets/shape4.png';
import shapeImg4 from '../assets/shape6.png';
import shapeImg5 from '../assets/shape5.png';
import shapeImg6 from '../assets/shape3.png';
import '../css/AiTradingHero.css';

const AiTradingHero = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null)
  const [selectedAsset, setSelectedAsset] = useState({ value: 'btc', label: 'BTC' });
  const [selectedDuration, setSelectedDuration] = useState('1min');
  const [selectedLeverage, setSelectedLeverage] = useState('1x');
  const [marginAmount, setMarginAmount] = useState('');

  const assets = [
    { value: 'btc', label: 'BTC',},
    { value: 'usdt', label: 'USDT',},
    { value: 'trx', label: 'TRX', }
  ];

  const leverageOptions = ['1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'];

  const durationOptions = ['1min', '3min', '5min', '15min', '30min', '1hr', '2hr', '4hr', '6hr', '8hr'];


  const handleAssetSelect = (asset) => {
    setSelectedAsset(asset);
    setOpenDropdown(false);
  };

  const handleDurationSelect = (time) => {
    setSelectedDuration(time);
    setOpenDropdown(false);
  };

  const handleLeverageSelect = (leverage) => {
    setSelectedLeverage(leverage);
    setOpenDropdown(false);
  };

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showPopup]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

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
              <button
                className="ai-hero-button"
                onClick={togglePopup}
                type="button"
              >
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
              <FontAwesomeIcon
                icon={faEye}
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

      {showPopup && (
        <div className="ai-pop-up">
          <div className="ai-pop-up-container">
            <div className="ai-pop-head-content">
              <FontAwesomeIcon
                className="ai-close"
                icon={faXmark}
                onClick={closePopup}
              />
            <div className="ai-pop-up-header">
              <h1>Enable AI Trading</h1>
              <p>Configure your ai trading parameters</p>
            </div>
            </div>

            <div className="form-group">
              <label className="network-label">Select Asset</label>
              <div className="network-select-wrapper">
                <button 
                  className="network-select-button" 
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === 'asset' ? null : 'asset')}
                >
                  <div className="network-option">
                    <span className="asset-icon">{selectedAsset.icon}</span>
                    <p>{selectedAsset.label}</p>
                  </div>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="network-select-icon"
                  />
                </button>
                {openDropdown === 'asset' && (
                  <div className="ai-dropdown-menu">
                    {assets.map((asset) => (
                      <button
                        key={asset.value}
                        className="dropdown-item"
                        onClick={() => handleAssetSelect(asset)}
                      >
                        <span className="asset-icon">{asset.icon}</span>
                        {asset.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="network-label">Margin Amount</label>
              <div className="margin-input-wrapper">
                <div className="margin-icon">
                  {selectedAsset.icon}
                </div>
                <input
                  type="number"
                  className="margin-input"
                  placeholder="Enter margin amount"
                  value={marginAmount}
                  onChange={(e) => setMarginAmount(e.target.value)}
                />
                <p>Available amount: 0.00000 Btc</p>
              </div>
            </div>

            <div className="form-group">
              <label className="network-label">Max Leverage</label>
              <div className="network-select-wrapper">
                <button 
                  className="network-select-button" 
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === 'leverage' ? null : 'leverage')}
                >
                  <div className="network-option">
                    <p>{selectedLeverage}</p>
                  </div>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="network-select-icon"
                  />
                </button>
                {openDropdown === 'leverage' && (
                  <div className="ai-dropdown-menu">
                    {leverageOptions.map((leverage) => (
                      <button
                        key={leverage}
                        className="dropdown-item"
                        onClick={() => handleLeverageSelect(leverage)}
                      >
                        {leverage}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="network-label">Trade Duration</label>
              <div className="network-select-wrapper">
                <button 
                  className="network-select-button" 
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === 'duration' ? null : 'duration')}
                >
                  <div className="network-option">
                    <p>{selectedDuration}</p>
                  </div>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="network-select-icon"
                  />
                </button>
                {openDropdown === 'duration' && (
                  <div className="ai-dropdown-menu">
                    {durationOptions.map((time) => (
                      <button
                        key={time}
                        className="dropdown-item"
                        onClick={() => handleDurationSelect(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="network-label">Take Profit (%)</label>
              <div className="margin-input-wrapper">
                <div className="margin-icon">
                  {selectedAsset.icon}
                </div>
                <input
                  type="number"
                  className="margin-input"
                  placeholder="e.g, 20 for (20%)"
                  value={marginAmount}
                  onChange={(e) => setMarginAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="network-label">Stop Loss (%)</label>
              <div className="margin-input-wrapper">
                <div className="margin-icon">
                  {selectedAsset.icon}
                </div>
                <input
                  type="number"
                  className="margin-input"
                  placeholder="e.g, 5 for (5%)"
                  value={marginAmount}
                  onChange={(e) => setMarginAmount(e.target.value)}
                />
              </div>
            </div>

          

            <button className="enable-ai-button" type="button">
              Start AI Trading
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiTradingHero;