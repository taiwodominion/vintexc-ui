import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AiQuickAccess.css';
import dollarImg from '../assets/dollar.png'
import coinSwapImg from '../assets/coin-swap.png'
import walletImg from '../assets/wallet.png'

const AiQuickAccess = () => {
  const navigate = useNavigate('');
  return (
    <div className="ai-quick-access">
      <div className="ai-quick-access-header">
        <h4 className="ai-quick-access-title">Quick Access</h4>
      </div>
      <div className="ai-quick-access-grid">
          <div 
            className="ai-quick-access-card"
            onClick={() => navigate('/withdrawal')}
          >
            <img src={walletImg} alt="" />
            <p className="ai-quick-access-text">Withdrawal</p>
          </div>
          <div 
            className="ai-quick-access-card"
            onClick={() => navigate('/withdrawal')}
          >
            <img src={dollarImg} alt="" />
            <p className="ai-quick-access-text">Transfer</p>
          </div>
          <div 
            className="ai-quick-access-card"
            onClick={() => navigate('/exchange')}
          >
            <img src={coinSwapImg} alt="" />
            <p className="ai-quick-access-text">Exchange</p>
          </div>
      </div>
    </div>
  );
};

export default AiQuickAccess;