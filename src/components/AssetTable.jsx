import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../css/AssetTable.css';

const AssetTable = () => {
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
    { name: "PEPE", symbol: "PEPE", balance: "0.000", icon: "https://api.vintexc.com/files/pepe.png" }
  ];

  return (
    <div className="asset-table-container">
      <div className="table-header">
        <h2 className="table-title">Asset Lists</h2>
      </div>
      
      <div className="table-wrapper">
        <div className="table-scroll">
          <table className="asset-table">
            <thead>
              <tr>
                <th className="table-header-asset">Assets</th>
                <th className="table-header-symbol">Symbols</th>
                <th className="table-header-balance">Balance</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset, index) => (
                <tr key={index} className="table-row">
                  <td className="asset-cell">
                    <div className="asset-info">
                      <img alt={`${asset.name} logo`} className="asset-logo" src={asset.icon} />
                      <span className="asset-name">{asset.name}</span>
                    </div>
                  </td>
                  <td className="symbol-cell">
                    <span className="symbol-text">{asset.symbol}</span>
                  </td>
                  <td className="balance-cell">
                    <span className="balance-text">{asset.balance}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="table-pagination">
        <button className="pagination-button">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span className="pagination-number active">1</span>
        <span className="pagination-number">2</span>
        <button className="pagination-button">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default AssetTable;