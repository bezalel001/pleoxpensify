const formatAmount = ({ currency, value }) => {
  return new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency
  }).format(value);
};
export default formatAmount;
