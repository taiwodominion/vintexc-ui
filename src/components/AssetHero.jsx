import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faArrowRightArrowLeft,
  faEye,
  faCircleArrowUp,
  faCircleArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import shapeImg1 from '../assets/shape1.png';
import shapeImg2 from '../assets/shape2.png';
import shapeImg3 from '../assets/shape4.png';
import shapeImg4 from '../assets/shape6.png';
import shapeImg5 from '../assets/shape5.png';
import shapeImg6 from '../assets/shape3.png';
import bookImg from '../assets/book.png';
import '../css/AssetHero.css';
import { faCoins } from '@fortawesome/free-solid-svg-icons/faCoins';
import { useCoinImage } from '../hooks/useCoinImage';
import { formatPrice, formatChange } from '../utils/formatUtils';
import { useNavigate } from 'react-router-dom';

const AssetHero = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [assetCards, setAssetCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const getCoinImage = useCoinImage();

  useEffect(() => {
    const getAssetHeroList = async () => {
      const myHeaders = new Headers();
      myHeaders.append('Cookie', 'PHPSESSID=b4c7dd79a4cdb01e796d174c0d58911b');

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      try {
        const res = await fetch(
          'https://api.vintexc.com/apps/trade/get_asset',
          requestOptions
        );
        const data = await res.json();
        setAssetCards(data.data.slice(0, 6));
      } catch (error) {
        console.log('The error is :', error);
      } finally {
        setLoading(false);
      }
    };

    getAssetHeroList();
  }, []);

  const nextSlide = () => {
    if (assetCards.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % assetCards.length);
    }
  };

  const prevSlide = () => {
    if (assetCards.length > 0) {
      setCurrentSlide(
        (prev) => (prev - 1 + assetCards.length) % assetCards.length
      );
    }
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    const existingFallback = e.target.parentNode.querySelector(
      '.asset-hero-card-fallback'
    );
    if (existingFallback) return;

    const fallbackDiv = document.createElement('div');
    fallbackDiv.className = 'asset-hero-card-fallback';
    fallbackDiv.textContent = e.target.alt?.charAt(0) || '?';
    e.target.parentNode.appendChild(fallbackDiv);
  };

  const renderSkeletonCards = () => {
    return Array(6)
      .fill()
      .map((_, index) => (
        <div key={index} className="asset-hero-card">
          <div className="asset-hero-card-header">
            <Skeleton circle width={40} height={40} baseColor="#dddddd46" />
            <Skeleton width={80} height={20} baseColor="#dddddd46" />
          </div>
          <div className="asset-hero-card-footer">
            <div className="asset-hero-card-pair">
              <Skeleton width={50} height={16} baseColor="#dddddd46" />
              <FontAwesomeIcon
                icon={faArrowRightArrowLeft}
                className="asset-hero-card-exchange"
                style={{ opacity: 0.3 }}
              />
              <Skeleton width={40} height={16} baseColor="#dddddd46" />
            </div>
            <div className="asset-hero-card-change">
              <Skeleton circle width={16} height={16} baseColor="#dddddd46" />
              <Skeleton width={60} height={16} baseColor="#dddddd46" />
            </div>
          </div>
        </div>
      ));
  };

  return (
    <div className="asset-hero">
      <div className="asset-hero-header">
        <h4 className="asset-hero-title">Asset</h4>
      </div>

      <div className="asset-hero-grid">
        <div className="asset-hero-left">
          <div className="asset-hero-main">
            <div className="asset-hero-content">
              <p className="asset-hero-subtitle">VINTEXC</p>
              <p className="asset-hero-heading">Your Gateway into Trading</p>
              <p className="asset-hero-description">
                Paronia is a blockchain platform. We make blockchain accessible.
              </p>
              <button
                className="asset-hero-button"
                type="button"
                onClick={() => navigate('/recharge')}
              >
                Add assets
              </button>
            </div>
            <div className="asset-hero-graphics">
              <img alt="Asset 1" src={shapeImg1} />
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

          <div className="asset-hero-cards">
            <div className="asset-hero-cards-container">
              <button
                className="asset-hero-nav-button asset-hero-nav-prev"
                onClick={prevSlide}
                disabled={loading || assetCards.length === 0}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>

              <div className="asset-hero-cards-wrapper">
                <div
                  className="asset-hero-cards-track"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {loading
                    ? renderSkeletonCards()
                    : assetCards.map((asset) => {
                        const imageUrl = getCoinImage(asset.symbol);
                        const price = formatPrice(asset.price_data?.lastPrice);
                        const change = formatChange(
                          asset.price_data?.priceChangePercent
                        );

                        return (
                          <div key={asset.id} className="asset-hero-card">
                            <div className="asset-hero-card-header">
                              <img
                                alt={asset.name}
                                className="asset-hero-card-icon"
                                src={imageUrl}
                                onError={handleImageError}
                                loading="lazy"
                              />
                              <p className="asset-hero-card-price">{price}</p>
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
                                    change.isPositive
                                      ? faCircleArrowUp
                                      : faCircleArrowDown
                                  }
                                  className={`asset-hero-change-icon ${change.className}`}
                                />
                                <p
                                  className={`asset-hero-change-text ${change.className}`}
                                >
                                  {change.text}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                </div>
              </div>

              <button
                className="asset-hero-nav-button asset-hero-nav-next"
                onClick={nextSlide}
                disabled={loading || assetCards.length === 0}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>

            <div className="asset-hero-dots">
              {loading
                ? // Skeleton dots
                  Array(6)
                    .fill()
                    .map((_, index) => (
                      <Skeleton
                        key={index}
                        circle
                        width={8}
                        height={8}
                        baseColor="#dddddd46"
                        style={{ margin: '0 4px' }}
                      />
                    ))
                : assetCards.map((_, index) => (
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

        <div className="asset-hero-valuation">
          <div className="asset-hero-valuation-header">
            <h4 className="asset-hero-valuation-title">
              Total Assets valuation
            </h4>
            <span
              className="asset-hero-view-icon"
              style={{ cursor: 'pointer' }}
            >
              <FontAwesomeIcon
                icon={faEye}
                onClick={() => setShowPassword(!showPassword)}
              />
            </span>
          </div>
          <div className="asset-hero-valuation-amount">
            {loading ? (
              <>
                <Skeleton width={150} height={40} baseColor="#dddddd46" />
                <Skeleton width={60} height={20} baseColor="#dddddd46" />
              </>
            ) : (
              <>
                <h1 className="asset-hero-amount">
                  {showPassword ? '*****' : '0.000'}
                </h1>
                <p className="asset-hero-currency">USDT</p>
              </>
            )}
          </div>
          <div className="asset-hero-earnings">
            <p className="asset-hero-earnings-label">Today's earning</p>
            {loading ? (
              <Skeleton width={80} height={20} baseColor="#dddddd46" />
            ) : (
              <p className="asset-hero-earnings-value">
                {showPassword ? '*****' : '0.000'}
              </p>
            )}
          </div>
          <div className="asset-hero-actions">
            {loading ? (
              Array(3)
                .fill()
                .map((_, index) => (
                  <Skeleton
                    key={index}
                    circle
                    width={40}
                    height={40}
                    baseColor="#dddddd46"
                    style={{ margin: '0 8px' }}
                  />
                ))
            ) : (
              <>
                <div className="asset-hero-actions-box"
                onClick={() => navigate('/recharge')}
                >
                  <FontAwesomeIcon
                  icon={faCoins}
                  className="asset-hero-action-icon"
                />
                <p>Recharge</p>
                </div>
                <div className="asset-hero-actions-box"
                onClick={() => navigate('/exchange')}
                >
                  <FontAwesomeIcon
                  icon={faCoins}
                  className="asset-hero-action-icon"
                />
                <p>Exchange</p>
                </div>
                <div className="asset-hero-actions-box"
                onClick={() => navigate('/withdrawal')}
                >
                  <FontAwesomeIcon
                  icon={faCoins}
                  className="asset-hero-action-icon"
                />
                <p>Withdraw</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="asset-hero-transactions">
          <h4 className="asset-hero-transactions-title">Recent Transactions</h4>
          <div className="asset-hero-transactions-empty">
            {loading ? (
              <>
                <Skeleton circle width={60} height={60} baseColor="#dddddd46" />
                <Skeleton width={120} height={20} baseColor="#dddddd46" />
              </>
            ) : (
              <>
                <img alt="" className="asset-hero-empty-icon" src={bookImg} />
                <p className="asset-hero-empty-text">No transaction yet</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetHero;
