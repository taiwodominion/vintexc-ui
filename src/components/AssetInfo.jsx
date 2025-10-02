import React from 'react';
import '../css/AssetInfo.css';

const AssetInfo = () => {
  return (
    <div>
      <h1>Asset</h1>
      <div className="asset-info-container">
        <div className="asset-cta">
          <div className="asset-cta-card">
            <span>VINTEXC</span>
            <h2>Your Gateway into Trading</h2>
            <p>
              Paronia is a blockchain platform. We make blockchain accessible.
            </p>
            <button>Add asset</button>
          </div>
          <div className="asset-coin-group">
            <div className="asset-coin-box"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetInfo;
