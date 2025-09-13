import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../css/MarketLeaders.css';

const MarketLeaders = () => {
  const navigate = useNavigate();
  const [marketData, setMarketData] = useState({ top_gainers: [], top_losers: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const imageBaseUrl = 'https://api.vintexc.com/files/';

  useEffect(() => {
    const fetchMarketData = async () => {
      const myHeaders = new Headers();
      myHeaders.append('Cookie', 'PHPSESSID=b2fea1676fc3ff7a2a6706c4037308c7');



      
      try {
        setLoading(true);
        const res = await fetch('https://api.vintexc.com/apps/trade/get_coin_grade', {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        setMarketData({
          top_gainers: data.data.top_gainers,
          top_losers: data.data.top_losers,
        });
      } catch (error) {
        console.error('Error fetching market data', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  const formatNumber = (num, decimals = 2) => {
    if (num === undefined || num === null) return '0.00';
    const factor = Math.pow(10, decimals);
    return (Math.round(parseFloat(num) * factor) / factor).toFixed(decimals);
  };

  const formatPrice = (price) => {
    if (price === undefined || price === null) return '$0.00';
    const numPrice = parseFloat(price);
    if (isNaN(numPrice)) return '$0.00';

    if (numPrice >= 1000) {
      const dividedPrice = numPrice / 1000;
      const integerPart = Math.floor(dividedPrice);
      return integerPart === 0 
        ? `$${formatNumber(numPrice, 3)}` 
        : `$${formatNumber(dividedPrice, 3)}K`;
    }
    
    return `$${formatNumber(numPrice, 3)}`;
  };

  const formatChange = (value) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return { text: '0.00%', className: 'negative-change' };
    
    if (numValue > 0) {
      return { text: `+${formatNumber(numValue)}%`, className: 'positive-change' };
    } else if (numValue < 0) {
      return { text: `${formatNumber(numValue)}%`, className: 'negative-change' };
    } else {
      return { text: '0.00%', className: 'negative-change' };
    }
  };

  // Function to get image URL for a coin
  const getCoinImage = (symbol) => {
    if (!symbol) return '';
    
    // Clean the symbol by removing common trading pair suffixes
    const cleanSymbol = symbol.replace(/USDT|BTC|ETH|USD$/i, '').toLowerCase();
    return `${imageBaseUrl}${cleanSymbol}.png`;
  };

  // if (loading) {
  //   return (
  //     <div className="overlay">
  //       <div className="loading-container">
  //         <div className="circle"></div>
  //         <p>Loading please wait..</p>
  //       </div>
  //     </div>
  //   );
  // }

  if (loading) {
  return (
    <div className="overlay">
      <section className="market-leaders-container">
        <div className="market-leaders-grid">
          {[...Array(2)].map((_, columnIndex) => (
            <div className="markets-list" key={columnIndex}>
              <h2><Skeleton width={120} height={20} baseColor='#dddddd46'/></h2>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="market-card">
                  <div className="market-info">
                    <Skeleton circle width={40} height={40} baseColor='#dddddd46'/>
                    <div className="market-details">
                      <p className="market-symbol">
                        <Skeleton width={80} baseColor='#dddddd46'/>
                      </p>
                      <p className="market-name">
                        <Skeleton width={120} baseColor='#dddddd46'/>
                      </p>
                    </div>
                  </div>
                  <div className="market-metric">
                    <p className="metric-label">Change</p>
                    <p className="metric-value">
                      <Skeleton width={60} baseColor='#dddddd46'/>
                    </p>
                  </div>
                  <div className="market-metric">
                    <p className="metric-label">Price</p>
                    <p className="metric-value price-value">
                      <Skeleton width={70} baseColor='#dddddd46'/>
                    </p>
                  </div>
                  <div className="action-trade-container">
                    <Skeleton height={32} width={80} borderRadius={10} baseColor='#dddddd46' />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


  if (error) {
    return (
      <div className="overlay">
        <div className="error-container">
          <p>Error loading data: {error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  const MarketList = ({ title, markets }) => (
    <div className="markets-list">
      <div className="market-leaders-title">{title}</div>
      {markets.map((market) => {
        const change = formatChange(market.price_data?.priceChangePercent);
        const symbol = market.price_data?.symbol || '';
        const imageUrl = getCoinImage(symbol);
        
        return (
          <div key={market.id} className="market-card">
            <div className="market-info">
              <img
                alt={market.name}
                className="market-icon"
                src={imageUrl}
                onError={(e) => {
                  // Create a fallback using the first letter of the symbol
                  e.target.style.display = 'none';
                  // You can also create a fallback div with the initial
                  const fallbackDiv = document.createElement('div');
                  fallbackDiv.className = 'market-icon-fallback';
                  fallbackDiv.textContent = symbol.charAt(0).toUpperCase();
                  e.target.parentNode.appendChild(fallbackDiv);
                }}
              />
              <div className="market-details">
                <p className="market-symbol">{symbol}</p>
                <p className="market-name">{market.name}</p>
              </div>
            </div>

            <div className="market-metric">
              <p className="metric-label">Change</p>
              <p className={`metric-value ${change.className}`}>
                {change.text}
              </p>
            </div>

            <div className="market-metric">
              <p className="metric-label">Price</p>
              <p className="metric-value price-value">
                {formatPrice(market.price_data?.lastPrice)}
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
  );

  return (
    <div className="overlay">
      <section className="market-leaders-container">
        <div className="shape shape-7"></div>
        <div className="shape shape-8"></div>
        <div className="market-leaders-grid">
          <MarketList title="Top Gainers" markets={marketData.top_gainers} />
          <MarketList title="Top Losers" markets={marketData.top_losers} />
        </div>
      </section>
    </div>
  );
};

export default MarketLeaders;
