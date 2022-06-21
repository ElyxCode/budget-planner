export const formatAmount = (amount: string) => {
  return Number(amount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};
