import React from 'react';
import bookImg from '../assets/book.png'
import '../css/RechargeHistory.css';

const RechargeHistory = () => {
  return (
    <div className="recharge-history-section">
      <div className="recharge-history-panel">
        <div className="recharge-history-header">
          <h2 className="recharge-history-title">Recharge History</h2>
        </div>
        
        <div className="recharge-history-content">
          <div className="recharge-history-grid">
            <div className="recharge-history-header-row">
              <div className="recharge-history-column">Coin</div>
              <div className="recharge-history-column">Direction</div>
              <div className="recharge-history-column">Margin</div>
              <div className="recharge-history-column">Leverage</div>
              <div className="recharge-history-column">Status</div>
              <div className="recharge-history-column">PNL</div>
              <div className="recharge-history-column">Entry Price</div>
              <div className="recharge-history-column">Exit Price</div>
              <div className="recharge-history-column">Created At</div>
            </div>

            <div className="recharge-history-empty">
              <div className="recharge-empty-content">
                <img 
                  alt="No transactions" 
                  className="recharge-empty-image" 
                  src={bookImg}
                />
                <p className="recharge-empty-text">No Ai trading transactions yet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RechargeHistory;