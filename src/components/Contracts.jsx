import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../css/Contracts.css';

const Contracts = ({ showCryptoBtn = true }) => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const imageBaseUrl = 'https://api.vintexc.com/files/';
  const navigate = useNavigate();

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
        const res = await fetch('https://api.vintexc.com/apps/trade/get_asset', requestOptions);
        const data = await res.json();
        setContracts(data.data.slice(0, 10));
      } catch (error) {
        console.error('Error fetching Contract data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContractsData();
  }, []);

  const roundToDecimal = (num, decimalNum) => {
    const factor = Math.pow(10, decimalNum);
    return (Math.round(num * factor) / factor).toFixed(decimalNum);
  };

  const formatPrice = (price) => {
    if (price === undefined || price === null) return '$0.00';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numPrice)) return '$0.00';

    if (numPrice >= 1000) {
      const dividedPrice = numPrice / 1000;
      const integerPart = Math.floor(dividedPrice);
      if (integerPart === 0) {
        return `$${roundToDecimal(numPrice, 3)}`;
      } else {
        return `$${roundToDecimal(dividedPrice, 3)}K`;
      }
    } else {
      return `$${roundToDecimal(numPrice, 3)}`;
    }
  };

  const getCoinImage = (symbol) => {
    if (!symbol) return '';
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
            {loading
              ? Array(5).fill().map((_, index) => (
                  <div key={index} className="contract-card">
                    <div className="contract-info">
                      <Skeleton circle width={40} height={40} baseColor='#dddddd46'/>
                      <div className="contract-details">
                        <Skeleton width={80} height={16} baseColor='#dddddd46' />
                        <Skeleton width={100} height={12} baseColor='#dddddd46' />
                      </div>
                    </div>

                    <div className="contract-metric">
                      <p className="metric-label">Change</p>
                      <Skeleton width={60} height={16} baseColor='#dddddd46' />
                    </div>

                    <div className="contract-metric">
                      <p className="metric-label">Price</p>
                      <Skeleton width={80} height={16} baseColor='#dddddd46' />
                    </div>

                    <div className="action-trade-container">
                      <Skeleton width={70} height={30} borderRadius={4} baseColor='#dddddd46' />
                    </div>
                  </div>
                ))
              : contracts.map((contract) => {
                  const symbol = contract.price_data?.symbol || '';
                  const imageUrl = getCoinImage(symbol);
                  const change = formatChange(contract.price_data?.priceChangePercent);

                  return (
                    <div key={contract.id} className="contract-card">
                      <div className="contract-info">
                        <div className="coin-image">
                          <img
                          alt={contract.name}
                          className="contract-icon"
                          loading='lazy'
                          src={imageUrl}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            const fallbackDiv = document.createElement('div');
                            fallbackDiv.className = 'contract-icon-fallback';
                            fallbackDiv.textContent = symbol.charAt(0).toUpperCase();
                            e.target.parentNode.appendChild(fallbackDiv);
                          }}
                        />
                        </div>
                        
                        <div className="contract-details">
                          <p className="contract-symbol">{symbol}</p>
                          <p className="contract-name">{contract.name}</p>
                        </div>
                      </div>

                      <div className="contract-metric">
                        <p className="metric-label">Change</p>
                        <p className={`metric-value ${change.className}`}>{change.text}</p>
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
          <button className="view-more-button" onClick={() => navigate('/market')}>
            View Other Crypto
          </button>
        )}
      </section>
    </div>
  );
};

export default Contracts;
