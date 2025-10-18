import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bookImg from '../assets/book.png';
import '../css/AllTransactionsHistoryForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const AllTransactionsHistoryForm = () => {
  const navigate = useNavigate('');
  
  return (
    <div className="all-transactions-history-section">
      <h1 className="page-title" onClick={() => navigate('/assets')}>
        <span>
          <FontAwesomeIcon icon={faArrowLeft} />
        </span>
        All Transactions
      </h1>
      <div className="all-transactions-history-panel">
        <div className="all-transactions-history-header">
          <h2 className="all-transactions-history-title">
            All Transactions History Record
          </h2>
        </div>

        <div className="all-transactions-history-content">
          <div className="all-transactions-history-grid">
            <div className="all-transactions-history-header-row">
              <div className="all-transactions-history-column">Amount</div>
              <div className="all-transactions-history-column">Reference</div>
              <div className="all-transactions-history-column">Description</div>
              <div className="all-transactions-history-column">
                Balance Before
              </div>
              <div className="all-transactions-history-column">
                Balance After
              </div>
              {/* <div className="all-transactions-history-column">Exit Point</div> */}
              <div className="all-transactions-history-column">Created At</div>
            </div>

            <div className="all-transactions-history-empty">
              <div className="all-transactions-empty-trades-content">
                <img
                  alt="No transactions"
                  className="all-transactions-empty-trades-image"
                  src={bookImg}
                />
                <p className="all-transactions-empty-trades-text">
                  No transactions yet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTransactionsHistoryForm;
