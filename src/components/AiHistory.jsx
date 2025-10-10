import React from 'react';
import bookImg from '../assets/book.png'
import '../css/AiHistory.css';

const AiHistory = () => {
  return (
    <div className="ai-trade-history-section">
      <div className="ai-trade-history-panel">
        <div className="ai-trade-history-header">
          <h2 className="ai-trade-history-title">Ai Trading History</h2>
        </div>
        
        <div className="ai-trade-history-content">
          <div className="ai-trade-history-grid">
            <div className="ai-trade-history-header-row">
              <div className="ai-trade-history-column">Coin</div>
              <div className="ai-trade-history-column">Direction</div>
              <div className="ai-trade-history-column">Margin</div>
              <div className="ai-trade-history-column">Leverage</div>
              <div className="ai-trade-history-column">Status</div>
              <div className="ai-trade-history-column">PNL</div>
              <div className="ai-trade-history-column">Entry Price</div>
              <div className="ai-trade-history-column">Exit Price</div>
              <div className="ai-trade-history-column">Created At</div>
            </div>

            <div className="ai-trade-history-empty">
              <div className="ai-empty-trades-content">
                <img 
                  alt="No transactions" 
                  className="ai-empty-trades-image" 
                  src={bookImg}
                />
                <p className="ai-empty-trades-text">No Ai trading transactions yet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiHistory;