// import React from 'react';
// import shapeImg1 from '../assets/shape1.png'
// import shapeImg2 from '../assets/shape2.png'
// import shapeImg3 from '../assets/shape4.png'
// import shapeImg4 from '../assets/shape6.png'
// import shapeImg5 from '../assets/shape5.png'
// import shapeImg6 from '../assets/shape3.png'

// import '../css/AssetHero.css';

// const AssetHero = () => {
//   return (
//     <div className="asset-hero">
//       <div className="asset-hero-content">
//         <p className="asset-hero-subtitle">VINTEXC</p>
//         <p className="asset-hero-title">Your Gateway into Trading</p>
//         <p className="asset-hero-description">
//           Paronia is a blockchain platform. We make blockchain accessible.
//         </p>
//         <button className="asset-hero-button" type="button">
//           Add assets
//         </button>
//       </div>
//       <div className="asset-hero-graphics">
// <img alt="Asset 1" className="asset-hero-main" src={shapeImg1} />
// <img alt="Asset 2" className="asset-hero-sphere" src={shapeImg2} />
// <img alt="Asset 3" className="asset-hero-pill" src={shapeImg3} />
// <img alt="Asset 4" className="asset-hero-toroid" src={shapeImg4} />
// <img alt="Asset 5" className="asset-hero-cube" src={shapeImg5} />
// <img alt="Asset 6" className="asset-hero-white" src={shapeImg6} />
//       </div>
//     </div>
//   );
// };

// export default AssetHero;

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faArrowRightArrowLeft,
  faEye,
  faCircleArrowUp,
  faCircleArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import shapeImg1 from '../assets/shape1.png';
import shapeImg2 from '../assets/shape2.png';
import shapeImg3 from '../assets/shape4.png';
import shapeImg4 from '../assets/shape6.png';
import shapeImg5 from '../assets/shape5.png';
import shapeImg6 from '../assets/shape3.png';
import '../css/AssetHero.css';

const AssetHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const assetCards = [
    {
      name: 'BITCOIN',
      price: '$122481.13',
      symbol: 'BTC',
      change: '+1.80%',
      isPositive: true,
      icon: 'https://api.vintexc.com/files/btc.png',
    },
    {
      name: 'ETHERUM',
      price: '$4526.83',
      symbol: 'ETH',
      change: '+1.32%',
      isPositive: true,
      icon: 'https://api.vintexc.com/files/eth.png',
    },
    {
      name: 'TRONX',
      price: '$0.341700',
      symbol: 'TRX',
      change: '-0.35%',
      isPositive: false,
      icon: 'https://api.vintexc.com/files/trx.png',
    },
    {
      name: 'ADA',
      price: '$0.873200',
      symbol: 'ADA',
      change: '+0.62%',
      isPositive: true,
      icon: 'https://api.vintexc.com/files/ada.png',
    },
    {
      name: 'TETHER',
      price: '$0.997800',
      symbol: 'FDUSD',
      change: '-0.06%',
      isPositive: false,
      icon: 'https://api.vintexc.com/files/usdt.png',
    },
    {
      name: 'BINANCE COIN',
      price: '$1181.99',
      symbol: 'BNB',
      change: '+9.11%',
      isPositive: true,
      icon: 'https://api.vintexc.com/files/bnb.png',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % assetCards.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + assetCards.length) % assetCards.length
    );
  };

  return (
    <div className="asset-hero">
      <div className="asset-hero-header">
        <h4 className="asset-hero-title">Asset</h4>
      </div>

      <div className="asset-hero-grid">
        {/* Left Column - Hero and Asset Cards */}
        <div className="asset-hero-left">
          {/* Hero Section */}
          <div className="asset-hero-main">
            <div className="asset-hero-content">
              <p className="asset-hero-subtitle">VINTEXC</p>
              <p className="asset-hero-heading">Your Gateway into Trading</p>
              <p className="asset-hero-description">
                Paronia is a blockchain platform. We make blockchain accessible.
              </p>
              <button className="asset-hero-button" type="button">
                Add assets
              </button>
            </div>
            <div className="asset-hero-graphics">
              <img alt="Asset 1" className="asset-hero-main" src={shapeImg1} />
              <img
                alt="Asset 2"
                className="asset-hero-sphere"
                src={shapeImg2}
              />
              <img alt="Asset 3" className="asset-hero-pill" src={shapeImg3} />
              <img
                alt="Asset 4"
                className="asset-hero-toroid"
                src={shapeImg4}
              />
              <img alt="Asset 5" className="asset-hero-cube" src={shapeImg5} />
              <img alt="Asset 6" className="asset-hero-white" src={shapeImg6} />
            </div>
          </div>

          {/* Asset Cards Carousel */}
          <div className="asset-hero-cards">
            <div className="asset-hero-cards-container">
              <button
                className="asset-hero-nav-button asset-hero-nav-prev"
                onClick={prevSlide}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>

              <div className="asset-hero-cards-wrapper">
                <div
                  className="asset-hero-cards-track"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {assetCards.map((asset, index) => (
                    <div key={index} className="asset-hero-card">
                      <div className="asset-hero-card-header">
                        <img
                          alt={asset.name}
                          className="asset-hero-card-icon"
                          src={asset.icon}
                        />
                        <p className="asset-hero-card-price">{asset.price}</p>
                      </div>
                      <div className="asset-hero-card-footer">
                        <div className="asset-hero-card-pair">
                          <p className="asset-hero-card-symbol">
                            {asset.symbol}
                          </p>
                          <FontAwesomeIcon
                            icon={faArrowRightArrowLeft}
                            className="asset-hero-card-exchange"
                          />
                          <p className="asset-hero-card-symbol">USDT</p>
                        </div>
                        <div className="asset-hero-card-change">
                          <FontAwesomeIcon
                            icon={
                              asset.isPositive
                                ? faCircleArrowUp
                                : faCircleArrowDown
                            }
                            className={`asset-hero-change-icon ${
                              asset.isPositive
                                ? 'asset-hero-change-positive'
                                : 'asset-hero-change-negative'
                            }`}
                          />
                          <p
                            className={`asset-hero-change-text ${
                              asset.isPositive
                                ? 'asset-hero-change-positive'
                                : 'asset-hero-change-negative'
                            }`}
                          >
                            {asset.change}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="asset-hero-nav-button asset-hero-nav-next"
                onClick={nextSlide}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>

            <div className="asset-hero-dots">
              {assetCards.map((_, index) => (
                <div
                  key={index}
                  className={`asset-hero-dot ${
                    index === currentSlide ? 'asset-hero-dot-active' : ''
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column - Total Assets */}
        <div className="asset-hero-valuation">
          <div className="asset-hero-valuation-header">
            <h4 className="asset-hero-valuation-title">
              Total Assets valuation
            </h4>
            <span
              className="asset-hero-view-icon"
              style={{ cursor: 'pointer' }}
            >
              <FontAwesomeIcon icon={faEye} />
            </span>
          </div>
          <div className="asset-hero-valuation-amount">
            <h1 className="asset-hero-amount">0.0000</h1>
            <p className="asset-hero-currency">USDT</p>
          </div>
          <div className="asset-hero-earnings">
            <p className="asset-hero-earnings-label">Today's earning</p>
            <p className="asset-hero-earnings-value">$0.0000</p>
          </div>
          <div className="asset-hero-actions">
            <img
              alt="Recharge"
              className="asset-hero-action-icon"
              src="/assets/recharge-HX7YuXWu.png"
            />
            <img
              alt="Exchange"
              className="asset-hero-action-icon"
              src="/assets/exchange-BDOGBrqI.png"
            />
            <img
              alt="Withdraw"
              className="asset-hero-action-icon"
              src="/assets/withdraw-hjbU-rHC.png"
            />
          </div>
        </div>

        {/* Right Column - Recent Transactions */}
        <div className="asset-hero-transactions">
          <h4 className="asset-hero-transactions-title">Recent Transactions</h4>
          <div className="asset-hero-transactions-empty">
            <img
              alt=""
              className="asset-hero-empty-icon"
              src="/assets/no-transaction-CKcd9NNL.png"
            />
            <p className="asset-hero-empty-text">No transaction yet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetHero;
