import React from 'react';
import bookImg from '../assets/book.png'
import '../css/FuturesTradeHistory.css';

const FuturesTradeHistory = () => {
  return (
    <div className="future-trade-history-section">
      <div className="future-trade-history-panel">
        <div className="future-trade-history-header">
          <h2 className="future-trade-history-title">Future Trading History</h2>
        </div>
        
        <div className="future-trade-history-content">
          <div className="future-trade-history-grid">
            <div className="future-trade-history-header-row">
              <div className="future-trade-history-column">Coin</div>
              <div className="future-trade-history-column">Direction</div>
              <div className="future-trade-history-column">Margin</div>
              <div className="future-trade-history-column">Status</div>
              <div className="future-trade-history-column">Entry Point</div>
              <div className="future-trade-history-column">Exit Point</div>
              <div className="future-trade-history-column">Created At</div>
            </div>

            <div className="future-trade-history-empty">
              <div className="future-empty-trades-content">
                <img 
                  alt="No transactions" 
                  className="future-empty-trades-image" 
                  src={bookImg}
                />
                <p className="future-empty-trades-text">No futures transactions yet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuturesTradeHistory;