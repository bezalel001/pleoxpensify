import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import getExpensesInitialState from '../../state/initial-state';

const mockStore = configureMockStore([thunk]);

export const makeMockStore = (state = {}) => {
  return mockStore({
    ...getExpensesInitialState,
    ...state
  });
};

export const mockSuccess = data => {
  return {
    status: 200,
    response: data
  };
};

export const mockError = (statusCode, errorMessage) => {
  return {
    status: statusCode,
    response: errorMessage
  };
};
