import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, 
  faChevronDown, 
  faChevronUp,
  faArrowLeft as faBack
} from '@fortawesome/free-solid-svg-icons';
import '../css/WithdrawalForm.css';

const WithdrawalForm = () => {
  const [selectedCoin, setSelectedCoin] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);


  const coins = [
    { value: 'usdt', label: 'USDT' },
    { value: 'btc', label: 'BTC' },
    { value: 'eth', label: 'ETH' }
  ];

  const getwithdrawalCoin = async () => {
    const myHeaders = new Headers();
    myHeaders.append('Cookie', 'PHPSESSID=38be269f43975b000ceed257539c8bc1');

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    try {
      const res = await fetch("https://api.vintexc.com/apps/trade/withdrawal_wallet", 
      requestOptions);
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log('Error fetching withdrawal coin:', error)
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
    <div className="withdrawal-container">
      <div className="withdrawal-wrapper">
        <button className="back-button" type="button">
          <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
          Withdrawal
        </button>

        <div className="withdrawal-card">
          <div className="withdrawal-content">
            {/* Step 1 */}
            {currentStep === 1 && (
              <>
                <p className="step-indicator">Step 1</p>

                <div className="form-group">
                  <label className="form-label">
                    Withdraw Currency
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
                    <button className="network select-input withdrawal-input" type="button">
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

                <div className="transfer-network-section">
                  <label className="network-label">Address</label>
                  <input type="text" className='withdrawal-input'
                  placeholder='Enter Withdrawal Address'
                  />
                </div>

                <div className="transfer-network-section">
                  <div className="withdrawal-amount-labels">
                    <label className="network-label">Withdrawal Amount</label>
                    <label className="network-label">Available </label>
                  </div>
                  <input type="text" className='withdrawal-input'
                  placeholder='Enter Withdrawal Amount'
                  />
                  <p className='withdrawal-fee'>Handling fee <span>2 USDT</span></p>
                </div>

                <button className='confirm-withdrawal'>Confirm Withdrawal</button>

                <div className="note-section">
                  <p className="note-text">
                    Important Notice: Please do not withdraw money directly to the crowdfunding or ICO address, otherwise you will not be
                     able to receive the tokens issued by the crowdfunding or ICO.
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

export default WithdrawalForm;