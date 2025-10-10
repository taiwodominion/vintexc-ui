import { useCallback } from 'react';

export const useCoinImage = () => {
  const imageBaseUrl = 'https://api.vintexc.com/files/';

  const getCoinImage = useCallback((symbol) => {
    if (!symbol) return `${imageBaseUrl}usdt.png`;
    
    const cleanSymbol = symbol.replace(/(USDT|USD)$/i, '').toLowerCase();
    
    // If symbol becomes empty after removal, default to usdt.png
    if (cleanSymbol === '') {
      return `${imageBaseUrl}usdt.png`;
    }
    
    return `${imageBaseUrl}${cleanSymbol}.png`;
  }, [imageBaseUrl]);

  return getCoinImage;
};