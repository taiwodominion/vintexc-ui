import React from 'react';
import bookImg from '../assets/book.png'
import '../css/WithdrawalHistory.css';

const WithdrawalHistory = () => {
  return (
    <div className="withdrawal-history-section">
      <div className="withdrawal-history-panel">
        <div className="withdrawal-history-header">
          <h2 className="withdrawal-history-title">Withdrawal History</h2>
        </div>
        
        <div className="withdrawal-history-content">
          <div className="withdrawal-history-grid">
            <div className="withdrawal-history-header-row">
              <div className="withdrawal-history-column">Coin</div>
              <div className="withdrawal-history-column">Direction</div>
              <div className="withdrawal-history-column">Margin</div>
              <div className="withdrawal-history-column">Leverage</div>
              <div className="withdrawal-history-column">Status</div>
              <div className="withdrawal-history-column">PNL</div>
              <div className="withdrawal-history-column">Entry Price</div>
              <div className="withdrawal-history-column">Exit Price</div>
              <div className="withdrawal-history-column">Created At</div>
            </div>

            <div className="withdrawal-history-empty">
              <div className="withdrawal-empty-content">
                <img 
                  alt="No transactions" 
                  className="withdrawal-empty-image" 
                  src={bookImg}
                />
                <p className="withdrawal-empty-text">No Ai trading transactions yet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalHistory;