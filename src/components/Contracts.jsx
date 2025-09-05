import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Contracts.css';

const Contracts = ({ showCryptoBtn = true }) => {
  const [contracts, setContracts] = useState([]);
  const imageBaseUrl = 'https://api.vintexc.com/files/';

  const myHeaders = new Headers();
  myHeaders.append('Cookie', 'PHPSESSID=aaee21200efe511cc382bcc7065466a0');

  useEffect(() => {
    const fetchContractsData = async () => {
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
        setContracts(data.data.slice(0, 10));
      } catch (error) {
        console.error('Error fetching Contract data:', error);
      }
    };

    fetchContractsData();
  }, []);

  const navigate = useNavigate();

  const roundToDecimal = (num, decimalNum) => {
    const factor = Math.pow(10, decimalNum);
    return (Math.round(num * factor) / factor).toFixed(decimalNum);
  };

  const formatPrice = (price) => {
    if (price === undefined || price === null) return '$0.00';
    
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numPrice)) return '$0.00';
    
    // For numbers >= 1000, format with K suffix and 3 decimal places
    if (numPrice >= 1000) {
      const dividedPrice = numPrice / 1000;
      // Check if the integer part is 0 (like 0.925)
      const integerPart = Math.floor(dividedPrice);
      
      if (integerPart === 0) {
        // Remove the K and show 3 decimal places
        return `$${roundToDecimal(numPrice, 3)}`;
      } else {
        // Show with K and 3 decimal places
        return `$${roundToDecimal(dividedPrice, 3)}K`;
      }
    } 
    // For numbers less than 1000, just show with 3 decimal places
    else {
      return `$${roundToDecimal(numPrice, 3)}`;
    }
  };

  // Function to get image URL for a coin
  const getCoinImage = (symbol) => {
    if (!symbol) return '';
    
    // Clean the symbol by removing common trading pair suffixes
    const cleanSymbol = symbol.replace(/USDT|BTC|ETH|USD$/i, '').toLowerCase();
    return `${imageBaseUrl}${cleanSymbol}.png`;
  };

  const formatChange = (value) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return { text: '0.00%', className: 'negative-change' };
    
    if (numValue > 0) {
      return { text: `+${roundToDecimal(numValue, 2)}%`, className: 'positive-change' };
    } else if (numValue < 0) {
      return { text: `${roundToDecimal(numValue, 2)}%`, className: 'negative-change' };
    } else {
      return { text: '0.00%', className: 'negative-change' };
    }
  };

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
            {contracts.map((contract) => {
              const symbol = contract.price_data?.symbol || '';
              const imageUrl = getCoinImage(symbol);
              const change = formatChange(contract.price_data?.priceChangePercent);
              
              return (
                <div key={contract.id} className="contract-card">
                  <div className="contract-info">
                    <img
                      alt={contract.name}
                      className="contract-icon"
                      src={imageUrl}
                      onError={(e) => {
                        // Create a fallback using the first letter of the symbol
                        e.target.style.display = 'none';
                        const fallbackDiv = document.createElement('div');
                        fallbackDiv.className = 'contract-icon-fallback';
                        fallbackDiv.textContent = symbol.charAt(0).toUpperCase();
                        e.target.parentNode.appendChild(fallbackDiv);
                      }}
                    />
                    <div className="contract-details">
                      <p className="contract-symbol">
                        {symbol}
                      </p>
                      <p className="contract-name">{contract.name}</p>
                    </div>
                  </div>

                  <div className="contract-metric">
                    <p className="metric-label">Change</p>
                    <p className={`metric-value ${change.className}`}>
                      {change.text}
                    </p>
                  </div>

                  <div className="contract-metric">
                    <p className="metric-label">Price</p>
                    <p className="metric-value price-value">
                      {formatPrice(contract.price_data?.lastPrice)}
                    </p>
                  </div>

                  <div className="action-trade-container">
                    <button
                      className="trade-action-button"
                      onClick={() => navigate('/login')}
                    >
                      Trade
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {showCryptoBtn && (
          <button
            className="view-more-button"
            onClick={() => navigate('/market')}
          >
            View Other Crypto
          </button>
        )}
      </section>
    </div>
  );
};

export default Contracts;
