import React from 'react';
import { useNavigate } from 'react-router-dom';
import bookImg from '../assets/book.png'
import '../css/ExchangeHistoryForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ExchangeHistoryForm = () => {
    const navigate = useNavigate('');
  return (
    <div className="exchange-history-section">
        <h1 className='page-title'
        onClick={() => navigate('/assets')}
        >
            <span><FontAwesomeIcon icon={faArrowLeft} /></span>
            Exchange
        </h1>
      <div className="exchange-history-panel">
        <div className="exchange-history-header">
          <h2 className="exchange-history-title">Exchange History Record</h2>
        </div>
        
        <div className="exchange-history-content">
          <div className="exchange-history-grid">
            <div className="exchange-history-header-row">
              <div className="exchange-history-column">Amount</div>
              <div className="exchange-history-column">Reference</div>
              <div className="exchange-history-column">Description</div>
              <div className="exchange-history-column">Balance Before</div>
              <div className="exchange-history-column">Balance After</div>
              <div className="exchange-history-column">Created At</div>
            </div>

            <div className="exchange-history-empty">
              <div className="exchange-empty-trades-content">
                <img 
                  alt="No transactions" 
                  className="exchange-empty-trades-image" 
                  src={bookImg}
                />
                <p className="exchange-empty-trades-text">No exchange transactions yet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeHistoryForm