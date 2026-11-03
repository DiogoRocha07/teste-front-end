export function getProductPricing(price: number) {
  const previousPrice = Math.round(price * 115) / 100;
  const installmentPrice = price > 3000 ? price / 10 : null;
  const hasFreeShipping = price > 200;

  return {
    previousPrice,
    installmentPrice,
    hasFreeShipping,
  };
}
