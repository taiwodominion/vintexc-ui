import React from 'react'
import BitcoinIcon from '../assets/bitcoin.png';
import EthereumIcon from '../assets/eth.png';
import dogeIcon from '../assets/doge.png';
import coinsIcon from '../assets/coins.png';
import "../css/MarketLeaders.css"

const MarketLeaders = () => {
  const marketsData = [
      {
        id: 1,
        symbol: "BITCOIN",
        name: "BITCOIN",
        icon: BitcoinIcon,
        change: +14.04,
        price: "$114.950K",
      },
      {
        id: 2,
        symbol: "ETHEREUM",
        name: "ETHERUM",
        icon: EthereumIcon,
        change: +43.04,
        price: "$4.235K",
      },
      {
        id: 3,
        symbol: "SOLANA",
        name: "SOLANA",
        icon: coinsIcon,
        change: -14.23,
        price: "$0.348",
      },
      {
        id: 4,
        symbol: "DOGE",
        name: "DOGE",
        icon: dogeIcon,
        change: +17.06,
        price: "$0.925",
      },
      {
        id: 1,
        symbol: "BITCOIN",
        name: "BITCOIN",
        icon: BitcoinIcon,
        change: +14.04,
        price: "$114.950K",
      },
      {
        id: 2,
        symbol: "ETHEREUM",
        name: "ETHERUM",
        icon: EthereumIcon,
        change: +43.04,
        price: "$4.235K",
      },
      {
        id: 3,
        symbol: "SOLANA",
        name: "SOLANA",
        icon: coinsIcon,
        change: -14.23,
        price: "$0.348",
      },
      {
        id: 4,
        symbol: "DOGE",
        name: "DOGE",
        icon: dogeIcon,
        change: +17.06,
        price: "$0.925",
      }
    ];
  
    return (
      <div className="overlay">
      <section className="market-leaders-container"> 
        <div className="shape shape-7"></div>  
        <div className="shape shape-8"></div>      
        <div className="market-leaders-grid">
            <div className="markets-list top-gainers">
                <div className="market-leaders-title">Top Gainers</div>
            {marketsData.map(market => (
              <div key={market.id} className="market-card">
                <div className="market-info">
                  <img 
                    alt={market.name} 
                    className="market-icon" 
                    src={market.icon} 
                  />
                  <div className="market-details">
                    <p className="market-symbol">{market.symbol}</p>
                    <p className="market-name">{market.name}</p>
                  </div>
                </div>
                
                <div className="market-metric">
                  <p className="metric-label">Change</p>
                  <p className={`metric-value ${market.change >= 0 ? 'positive-change' : 'negative-change'}`}>
                    {market.change >= 0 ? '+' : ''}{market.change}%
                  </p>
                </div>
                
                <div className="market-metric">
                  <p className="metric-label">Price</p>
                  <p className="metric-value price-value">{market.price}</p>
                </div>
                
                <div className="action-trade-container">
                  <button className="trade-action-button">Trade</button>
                </div>
              </div>
            ))}
          </div>

          <div className="markets-list top-losers">
            <div className="market-leaders-title">Top Losers</div>
            {marketsData.map(market => (
              <div key={market.id} className="market-card">
                <div className="market-info">
                  <img 
                    alt={market.name} 
                    className="market-icon" 
                    src={market.icon} 
                  />
                  <div className="market-details">
                    <p className="market-symbol">{market.symbol}</p>
                    <p className="market-name">{market.name}</p>
                  </div>
                </div>
                
                <div className="market-metric">
                  <p className="metric-label">Change</p>
                  <p className={`metric-value ${market.change >= 0 ? 'positive-change' : 'negative-change'}`}>
                    {market.change >= 0 ? '+' : ''}{market.change}%
                  </p>
                </div>
                
                <div className="market-metric">
                  <p className="metric-label">Price</p>
                  <p className="metric-value price-value">{market.price}</p>
                </div>
                
                <div className="action-trade-container">
                  <button className="trade-action-button">Trade</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* <button className="view-more-button">View Other Crypto</button> */}
      </section>
      </div>
    );
}

export default MarketLeaders