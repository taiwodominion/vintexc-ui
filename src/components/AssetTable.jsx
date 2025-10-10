import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faDollarSign,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import logoImage from '../assets/vintexc-logo.png';
import characterImg from '../assets/Character.png';
import { useCoinImage } from '../hooks/useCoinImage';
import '../css/AssetTable.css';

const AssetTable = () => {
  const navigate = useNavigate('');
  const [assetList, setAssetList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const getCoinImage = useCoinImage();
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const getAssetList = async () => {
      const myHeaders = new Headers();
      myHeaders.append('Cookie', 'PHPSESSID=b4c7dd79a4cdb01e796d174c0d58911b');

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      try {
        const res = await fetch("https://api.vintexc.com/apps/trade/get_asset", requestOptions);
        const data = await res.json();
        setAssetList(data.data);
      } catch(error) {
        console.log('The error is :', error);
      } finally {
        setLoading(false);
      }
    };

    getAssetList();
  }, []);

  const totalPages = Math.ceil(assetList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleAssets = assetList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleImageError = (e) => {
  e.target.style.display = 'none';
  const fallbackDiv = document.createElement('div');
  fallbackDiv.className = 'asset-logo-fallback';
  fallbackDiv.textContent = e.target.alt?.charAt(0) || '?';
  e.target.parentNode.appendChild(fallbackDiv);
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
              {loading ? (
                Array(ITEMS_PER_PAGE).fill().map((_, index) => (
                  <div key={index} className="asset-grid-row">
                    <div className="asset-cell">
                      <div className="asset-info">
                        <Skeleton circle width={32} height={32} />
                        <Skeleton width={80} height={16} />
                      </div>
                    </div>
                    <div className="symbol-cell">
                      <Skeleton width={60} height={16} />
                    </div>
                    <div className="balance-cell">
                      <Skeleton width={80} height={16} />
                    </div>
                  </div>
                ))
              ) : (
                visibleAssets.map((asset) => {
                  const imageUrl = getCoinImage(asset.symbol);
                  
                  return (
                    <div key={asset.id} className="asset-grid-row">
                      <div className="asset-cell">
                        <div className="asset-info">
                          <img
                            alt={`${asset.name} logo`}
                            className="asset-logo"
                            src={imageUrl}
                            onError={handleImageError}
                            loading="lazy"
                          />
                          <span className="asset-name">{asset.name}</span>
                        </div>
                      </div>
                      <div className="symbol-cell">
                        <span className="symbol-text">{asset.symbol}</span>
                      </div>
                      <div className="balance-cell">
                        <span className="balance-text">0.000</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div className="table-pagination">
          <button
            className="pagination-button"
            onClick={handlePrev}
            disabled={currentPage === 1 || loading}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <span
              key={index + 1}
              className={`pagination-number ${
                currentPage === index + 1 ? 'active' : ''
              }`}
            >
              {index + 1}
            </span>
          ))}

          <button
            className="pagination-button"
            onClick={handleNext}
            disabled={currentPage === totalPages || loading}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>

      <div className="ai-trading-container">
        <img alt="Platform logo" className="platform-logo" src={logoImage} />

        <div className="ai-trading-card">
          <p className="card-title">AI Trading</p>

          <div className="ai-avatar-container">
            <img src={characterImg} alt="" className="ai-avatar" />
          </div>

          <p className="card-description">
            Gain Your Edge with AI Trading: Leverage intelligent algorithms to
            identify opportunities and optimize your trading performance around
            the clock
          </p>

          <p className="income-label">Cumulative income:</p>

          <div className="income-display">
            <FontAwesomeIcon icon={faDollarSign} className="dollar-icon" />
            <p className="income-amount">0.00</p>
          </div>

          <button
            className="enable-ai-button"
            type="button"
            onClick={() => navigate('/ai-trading')}
          >
            <FontAwesomeIcon icon={faPaperPlane} className="button-icon" />
            Enable AI Trading
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetTable;