import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faDollarSign, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import logoImage from '../assets/vintexc-logo.png';
import characterImg from '../assets/Character.png';
import "../css/AssetTable.css";

const AssetTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 7;

  const assets = [
    { name: "BITCOIN", symbol: "BTC", balance: "0.000", icon: "https://api.vintexc.com/files/btc.png" },
    { name: "ETHERUM", symbol: "ETH", balance: "0.000", icon: "https://api.vintexc.com/files/eth.png" },
    { name: "TRONX", symbol: "TRX", balance: "0.000", icon: "https://api.vintexc.com/files/trx.png" },
    { name: "ADA", symbol: "ADA", balance: "0.000", icon: "https://api.vintexc.com/files/ada.png" },
    { name: "TETHER", symbol: "USDT", balance: "0.000", icon: "https://api.vintexc.com/files/usdt.png" },
    { name: "BINANCE COIN", symbol: "BNB", balance: "0.000", icon: "https://api.vintexc.com/files/bnb.png" },
    { name: "SOLANA", symbol: "SOL", balance: "0.000", icon: "https://api.vintexc.com/files/sol.png" },
    { name: "TONCOIN", symbol: "TON", balance: "0.000", icon: "https://api.vintexc.com/files/ton.png" },
    { name: "SHIBA INU", symbol: "SHIB", balance: "0.000", icon: "https://api.vintexc.com/files/shib.png" },
    { name: "PEPE", symbol: "PEPE", balance: "0.000", icon: "https://api.vintexc.com/files/pepe.png" },
  ];

  const totalPages = Math.ceil(assets.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleAssets = assets.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="asset-table">
      <div className="asset-table-container">
      <div className="table-header">
        <h2 className="table-title">Asset Lists</h2>
      </div>

      <div className="table-wrapper">
        <div className="table-scroll">
          <div className="asset-grid-header">
            <div className="table-header-asset">Assets</div>
            <div className="table-header-symbol">Symbols</div>
            <div className="table-header-balance">Balance</div>
          </div>

          <div className="asset-grid-body">
            {visibleAssets.map((asset, index) => (
              <div key={index} className="asset-grid-row">
                <div className="asset-cell">
                  <div className="asset-info">
                    <img
                      alt={`${asset.name} logo`}
                      className="asset-logo"
                      src={asset.icon}
                    />
                    <span className="asset-name">{asset.name}</span>
                  </div>
                </div>
                <div className="symbol-cell">
                  <span className="symbol-text">{asset.symbol}</span>
                </div>
                <div className="balance-cell">
                  <span className="balance-text">{asset.balance}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="table-pagination">
        <button
          className="pagination-button"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <span 
            key={index + 1}
            className={`pagination-number ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </span>
        ))}
        
        {/* <span className="pagination-number">/ {totalPages}</span> */}

        <button
          className="pagination-button"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
    <div className="ai-trading-container">
      <img 
        alt="Platform logo" 
        className="platform-logo" 
        src={logoImage}
      />
      
      <div className="ai-trading-card">
        <p className="card-title">AI Trading</p>
        
        <div className="ai-avatar-container">
          <img src={characterImg} alt="" 
          className="ai-avatar"
          />
        </div>
        
        <p className="card-description">
          Gain Your Edge with AI Trading: Leverage intelligent algorithms to identify 
          opportunities and optimize your trading performance around the clock
        </p>
        
        <p className="income-label">Cumulative income:</p>
        
        <div className="income-display">
          <FontAwesomeIcon icon={faDollarSign} className="dollar-icon" />
          <p className="income-amount">0.00</p>
        </div>
        
        <button className="enable-ai-button" type="button">
          <FontAwesomeIcon icon={faPaperPlane} className="button-icon" />
          Enable AI Trading
        </button>
      </div>
    </div>  
    </div>
  );
};

export default AssetTable;