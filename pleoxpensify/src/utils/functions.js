import moment from 'moment';

export const formatAmount = ({ currency, value }) => {
  return new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency
  }).format(value);
};

export const formatDate = date => moment(date).format('MMM Do, YYYY');
