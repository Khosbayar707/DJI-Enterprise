export const calculateSavings = (originalPrice: string, discountPrice: string): string => {
  const extractNumber = (priceStr: string): number => parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
  const original = extractNumber(originalPrice);
  const discount = extractNumber(discountPrice);
  const savings = original - discount;

  return savings.toLocaleString() + '₮';
};
