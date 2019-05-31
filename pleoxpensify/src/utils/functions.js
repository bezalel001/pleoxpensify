import moment from 'moment';

export const formatAmount = ({ currency, value }) => {
  return new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency
  }).format(parseInt(value, 10));
};

export const formatDate = date => moment(date).format('MMM Do, YYYY');
