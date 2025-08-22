import React from 'react';
import { useNavigate } from "react-router-dom";
import '../css/Contracts.css';
import BitcoinIcon from '../assets/bitcoin.png';
import EthereumIcon from '../assets/eth.png';
import dogeIcon from '../assets/doge.png';
import coinsIcon from '../assets/coins.png';

const Contracts = ({ showCryptoBtn = true }) => {
  const navigate = useNavigate();
  const contractsData = [
    {
      id: 1,
      symbol: "BITCOIN",
      name: "BITCOIN",
      icon: BitcoinIcon,
      change: +14.04,
      price: "$114.950K",
      chart: <svg width="70" height="30" viewBox="0 0 100 30">
                     <defs>
                         <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                         <feDropShadow dx="0" dy="7" 
                         stdDeviation="7" flood-color="yellow" />
                         </filter>
                     </defs>
                     <polyline fill="none"
                     stroke="yellow"
                     stroke-width="2"
                     filter="url(#shadow)"
                     points="0,20,20,10,40,15,60,5,80,15,100,10" />
              </svg>
    },
    {
      id: 2,
      symbol: "ETHEREUM",
      name: "ETHERUM",
      icon: EthereumIcon,
      change: +43.04,
      price: "$4.235K",
      chart: <svg width="70" height="30" viewBox="0 0 100 30">
                     <defs>
                         <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                         <feDropShadow dx="0" dy="7" 
                         stdDeviation="7" flood-color="yellow" />
                         </filter>
                     </defs>
                     <polyline fill="none"
                     stroke="yellow"
                     stroke-width="2"
                     filter="url(#shadow)"
                     points="0,20,20,10,40,15,60,5,80,15,100,10" />
              </svg>
    },
    {
      id: 3,
      symbol: "SOLANA",
      name: "SOLANA",
      icon: coinsIcon,
      change: -14.23,
      price: "$0.348",
      chart: <svg width="70" height="30" viewBox="0 0 100 30">
                     <defs>
                         <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                         <feDropShadow dx="0" dy="7" 
                         stdDeviation="7" flood-color="yellow" />
                         </filter>
                     </defs>
                     <polyline fill="none"
                     stroke="yellow"
                     stroke-width="2"
                     filter="url(#shadow)"
                     points="0,20,20,10,40,15,60,5,80,15,100,10" />
              </svg>
    },
    {
      id: 4,
      symbol: "DOGE",
      name: "DOGE",
      icon: dogeIcon,
      change: +17.06,
      price: "$0.925",
      chart: <svg width="70" height="30" viewBox="0 0 100 30">
                     <defs>
                         <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                         <feDropShadow dx="0" dy="7" 
                         stdDeviation="7" flood-color="yellow" />
                         </filter>
                     </defs>
                     <polyline fill="none"
                     stroke="yellow"
                     stroke-width="2"
                     filter="url(#shadow)"
                     points="0,20,20,10,40,15,60,5,80,15,100,10" />
              </svg>
    }
  ];

  return (
    <div className="overlay">
    <section className="popular-contracts-section">
      <div className="shape shape-4"></div>
      <div className="shape shape-5"></div>
      <div className="section-label">
        <p className="section-label-text">Market</p>
      </div>
      
      <div className="section-title">Popular Contracts</div>
      
      <div className="contracts-container">
        <div className="contracts-list">
          {contractsData.map(contract => (
            <div key={contract.id} className="contract-card">
              <div className="contract-info">
                <img 
                  alt={contract.name} 
                  className="contract-icon" 
                  src={contract.icon} 
                />
                <div className="contract-details">
                  <p className="contract-symbol">{contract.symbol}</p>
                  <p className="contract-name">{contract.name}</p>
                </div>
              </div>
              
              <div className="contract-metric">
                <p className="metric-label">Change</p>
                <p className={`metric-value ${contract.change >= 0 ? 'positive-change' : 'negative-change'}`}>
                  {contract.change >= 0 ? '+' : ''}{contract.change}%
                </p>
              </div>
              
              <div className="contract-metric">
                <p className="metric-label">Price</p>
                <p className="metric-value price-value">{contract.price}</p>
              </div>
              
              <div className="contract-metric">
                <p className="metric-label">Chart</p>
                <p className="metric-value chart-value">{contract.chart}</p>
              </div>
              
                <div className="action-trade-container">
                <button className="trade-action-button" onClick={() => navigate("/login")}>Trade</button>
                </div>
            </div>
          ))}
        </div>
      </div>
      

      {showCryptoBtn && (
        <button className="view-more-button">View Other Crypto</button>
      )}
    </section>
    </div>
  );
};

export default Contracts;