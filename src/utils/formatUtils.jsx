export const roundToDecimal = (num, decimalNum) => {
  const factor = Math.pow(10, decimalNum);
  return (Math.round(num * factor) / factor).toFixed(decimalNum);
};

export const formatPrice = (price) => {
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

export const formatChange = (value) => {
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return { text: '0.00%', className: 'negative-change', isPositive: false };

  if (numValue > 0) {
    return { text: `+${roundToDecimal(numValue, 2)}%`, className: 'positive-change', isPositive: true };
  } else if (numValue < 0) {
    return { text: `${roundToDecimal(numValue, 2)}%`, className: 'negative-change', isPositive: false };
  } else {
    return { text: '0.00%', className: 'negative-change', isPositive: false };
  }
};