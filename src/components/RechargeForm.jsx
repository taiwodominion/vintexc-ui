import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, 
  faChevronDown, 
  faChevronUp,
  faCopy,
  faCheck,
  faArrowLeft as faBack
} from '@fortawesome/free-solid-svg-icons';
import qrCode from '../assets/qr-code.png'
import '../css/RechargeForm.css';

const RechargeForm = () => {
  const [selectedCoin, setSelectedCoin] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [copied, setCopied] = useState(false);

    const walletAddress = '0x7B61cc42e86B73294A493562F65C86A2bc286C61';

  const coins = [
    { value: 'usdt', label: 'USDT' },
    { value: 'btc', label: 'BTC' },
    { value: 'eth', label: 'ETH' }
  ];

  const getRechargeCoin = async () => {
    const myHeaders = new Headers();
    myHeaders.append('Cookie', 'PHPSESSID=38be269f43975b000ceed257539c8bc1');

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    try {
      const res = await fetch("https://api.vintexc.com/apps/trade/recharge_wallet", 
      requestOptions);
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log('Error fetching recharge coin:', error)
    }
  };

  const handleCoinSelect = (coin) => {
    setSelectedCoin(coin);
    setShowDropdown(false);
    // Move to step 2 when a coin is selected
    setCurrentStep(2);
  };

  const handleBackToStep1 = () => {
    setCurrentStep(1);
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = walletAddress;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <div className="recharge-container">
      <div className="recharge-wrapper">
        <button className="back-button" type="button">
          <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
          Recharge
        </button>

        <div className="recharge-card">
          <div className="recharge-content">
            {/* Step 1 */}
            {currentStep === 1 && (
              <>
                <p className="step-indicator">Step 1</p>

                <div className="form-group">
                  <label className="form-label">
                    Please select the currency you want to recharge
                  </label>

                  <div className="select-wrapper">
                    <button 
                      className="select-button" 
                      type="button"
                      onClick={() => setShowDropdown(!showDropdown)}
                    >
                      <span>{selectedCoin ? selectedCoin.label : 'Select Coin'}</span>
                      <FontAwesomeIcon
                        icon={showDropdown ? faChevronUp : faChevronDown}
                        className="select-icon"
                      />
                    </button>
                    
                    {showDropdown && (
                      <div className="dropdown-menu">
                        {coins.map((coin) => (
                          <button
                            key={coin.value}
                            className="dropdown-item"
                            onClick={() => handleCoinSelect(coin)}
                          >
                            {coin.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <div className="step-2-content">
                <div className="step-2-header">
                  <p className="step-2-title">Step 2</p>
                  <button 
                    className="back-to-step1-btn"
                    onClick={handleBackToStep1}
                    type="button"
                  >
                    <FontAwesomeIcon icon={faBack} />
                    <span>Go back to Step 1</span>
                  </button>
                </div>

                <div className="transfer-network-section">
                  <label className="network-label">Transfer Network</label>
                  <div className="network-select-wrapper">
                    <button className="network-select-button" type="button">
                      <div className="network-option">
                        <p>BSC (Binance Smart Chain)</p>
                      </div>
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="network-select-icon"
                      />
                    </button>
                  </div>
                </div>

                <div className="qr-code-section">
                  <div className="qr-code-container">
                    <img src={qrCode} alt="" />
                  </div>
                  
                  <div className="address-container">
                    <p className="wallet-address">
                      0x7B61cc42e86B73294A493562F65C86A2bc286C61
                    </p>
                    <button 
                      className="copy-button"
                      onClick={handleCopyAddress}
                      type="button"
                    >
                      <FontAwesomeIcon 
                        icon={copied ? faCheck : faCopy} 
                        className={copied ? 'copy-icon copied' : 'copy-icon'}
                      />
                    </button>
                  </div>
                  {copied && (
                    <div className="copy-notification">
                      Address copied to clipboard!
                    </div>
                  )}

                </div>

                <div className="note-section">
                  <p className="note-text">
                    Note: Please double-check the wallet address and network before making a deposit. 
                    We are not responsible for any loss of funds due to incorrect information.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RechargeForm;