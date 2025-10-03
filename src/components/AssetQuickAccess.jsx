import React from 'react';
import '../css/AssetQuickAccess.css';

const AssetQuickAccess = () => {
  const quickAccessItems = [
    {
      title: "Exchange History",
    },
    {
      title: "Future Trades History",
    },
    {
      title: "Transaction History",
    }
  ];

  return (
    <div className="asset-quick-access">
      <div className="asset-quick-access-header">
        <h4 className="asset-quick-access-title">Quick Access</h4>
      </div>
      <div className="asset-quick-access-grid">
        {quickAccessItems.map((item, index) => (
          <div 
            key={index} 
            className="asset-quick-access-card"
            onClick={() => console.log(`Clicked: ${item.title}`)}
          >
            <p className="asset-quick-access-text">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetQuickAccess;