import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import '../css/FuturesTrading.css';

const FuturesTrading = () => {
  const [selectedAsset, setSelectedAsset] = useState('BTCUSDT');
  const [selectedLeverage, setSelectedLeverage] = useState('1X');
  const [selectedDuration, setSelectedDuration] = useState('1min');
  const [margin, setMargin] = useState('');
  const [showAssetDropdown, setShowAssetDropdown] = useState(false);
  const [showLeverageDropdown, setShowLeverageDropdown] = useState(false);
  const [showDurationDropdown, setShowDurationDropdown] = useState(false);

  const assets = [
    { symbol: 'BTCUSDT', name: 'Bitcoin' },
    { symbol: 'ETHUSDT', name: 'Ethereum' },
    { symbol: 'ADAUSDT', name: 'Cardano' },
    { symbol: 'DOTUSDT', name: 'Polkadot' },
    { symbol: 'LINKUSDT', name: 'Chainlink' }
  ];

  return (
    <div className="futures-container">
      <div className="futures-header">
        <h4 className="futures-title">Futures</h4>
      </div>

      <div className="futures-grid">
        <div className="chart-section">
          <div className="chart-container">
          </div>
        </div>

        <div className="controls-section">
          <div className="controls-content">
            <div className="form-group">
              <label className="form-label">Select Asset</label>
              <div className="dropdown-container">
                <div 
                  className="select-button"
                //   onClick={(e) => {
                //     e.stopPropagation();
                //     setShowAssetDropdown(!showAssetDropdown);
                //     setShowLeverageDropdown(false);
                //     setShowDurationDropdown(false);
                //   }}
                >
                  {selectedAsset}
                  <FontAwesomeIcon 
                    icon={faChevronDown} 
                    className={`select-arrow ${showAssetDropdown ? 'rotated' : ''}`} 
                  />
                </div>
                {showAssetDropdown && (
                  <div className="dropdown-menu">
                    {assets.map((asset) => (
                      <div
                        key={asset.symbol}
                        className={`dropdown-item ${selectedAsset === asset.symbol ? 'selected' : ''}`}
                        // onClick={(e) => {
                        //   e.stopPropagation();
                        //   setSelectedAsset(asset.symbol);
                        //   setShowAssetDropdown(false);
                        // }}
                      >
                        <span className="asset-symbol">{asset.symbol}</span>
                        <span className="asset-name">{asset.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Margin</label>
              <input
                className="form-input"
                placeholder="Enter margin"
                min="0"
                step="0.01"
                type="number"
                value={margin}
                onChange={(e) => setMargin(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Select Leverage</label>
              <div className="dropdown-container">
                <div 
                  className="select-button"
                //   onClick={(e) => {
                //     e.stopPropagation();
                //     setShowLeverageDropdown(!showLeverageDropdown);
                //     setShowAssetDropdown(false);
                //     setShowDurationDropdown(false);
                //   }}
                >
                  {selectedLeverage}
                  <FontAwesomeIcon 
                    icon={faChevronDown} 
                    className={`select-arrow ${showLeverageDropdown ? 'rotated' : ''}`} 
                  />
                </div>
                {showLeverageDropdown && (
                  <div className="dropdown-menu">
                    {leverageOptions.map((leverage) => (
                      <div
                        key={leverage}
                        className={`dropdown-item ${selectedLeverage === leverage ? 'selected' : ''}`}
                        // onClick={(e) => {
                        //   e.stopPropagation();
                        //   setSelectedLeverage(leverage);
                        //   setShowLeverageDropdown(false);
                        // }}
                      >
                        {leverage}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Select Duration</label>
              <div className="dropdown-container">
                <div 
                  className="select-button"
                //   onClick={(e) => {
                //     e.stopPropagation();
                //     setShowDurationDropdown(!showDurationDropdown);
                //     setShowAssetDropdown(false);
                //     setShowLeverageDropdown(false);
                //   }}
                >
                  {selectedDuration}
                  <FontAwesomeIcon 
                    icon={faChevronDown} 
                    className={`select-arrow ${showDurationDropdown ? 'rotated' : ''}`} 
                  />
                </div>
                {showDurationDropdown && (
                  <div className="dropdown-menu">
                    {durationOptions.map((duration) => (
                      <div
                        key={duration}
                        className={`dropdown-item ${selectedDuration === duration ? 'selected' : ''}`}
                        // onClick={(e) => {
                        //   e.stopPropagation();
                        //   setSelectedDuration(duration);
                        //   setShowDurationDropdown(false);
                        // }}
                      >
                        {duration}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="info-section">
            <div className="info-row">
              <p className="info-label">Available:</p>
              <p className="info-value">0.0000 BTC</p>
            </div>
            <div className="info-row">
              <p className="info-label">Volume:</p>
              <p className="info-value">0.0000 BTC</p>
            </div>
            <div className="info-row">
              <p className="info-label">Fee:</p>
              <p className="info-value">0 BTC</p>
            </div>
          </div>

          <div className="action-buttons">
            <button className="buy-button" type="button">
              Buy
            </button>
            <button className="sell-button" type="button">
              Sell
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuturesTrading;