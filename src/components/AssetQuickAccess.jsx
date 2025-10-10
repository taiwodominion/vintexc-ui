import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AssetQuickAccess.css';

const AssetQuickAccess = () => {
  const navigate = useNavigate('');
  return (
    <div className="asset-quick-access">
      <div className="asset-quick-access-header">
        <h4 className="asset-quick-access-title">Quick Access</h4>
      </div>
      <div className="asset-quick-access-grid">
          <div 
            className="asset-quick-access-card"
            onClick={() => navigate('/exchange')}
          >
            <p className="asset-quick-access-text">Exchange History</p>
          </div>
          <div 
            className="asset-quick-access-card"
            onClick={() => navigate('/futures-history')}
          >
            <p className="asset-quick-access-text">Future Trades History</p>
          </div>
          <div 
            className="asset-quick-access-card"
            onClick={() => navigate('/all-transactions')}
          >
            <p className="asset-quick-access-text">Transaction History</p>
          </div>
      </div>
    </div>
  );
};

export default AssetQuickAccess;