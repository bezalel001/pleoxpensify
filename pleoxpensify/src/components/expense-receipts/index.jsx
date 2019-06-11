import React from 'react';
import PropTypes from 'prop-types';

import { reduxForm, Field } from 'redux-form';

import { Alert, Button } from 'react-bootstrap';

import ReceiptsDropzone from './receipts-dropzone';

import './style.scss';

const FILE_FIELD_NAME = 'files';

const ReceiptForm = props => {
  const { handleSubmit, reset, error, touch } = props;

  return (
    <div className="receipt-form">
      {' '}
      {touch && (error && <Alert variant="danger"> {error}</Alert>)}
      <form onSubmit={handleSubmit}>
        {' '}
        <div>
          {' '}
          <Field name={FILE_FIELD_NAME} component={ReceiptsDropzone} />{' '}
        </div>{' '}
        <div className="receipt-form__btn">
          {' '}
          <Button
            type="submit"
            className="receipt-form__btn--submit"
            variant="info"
          >
            {' '}
            Save{' '}
          </Button>{' '}
        </div>{' '}
      </form>{' '}
    </div>
  );
};

export default reduxForm({
  form: 'receipt'
})(ReceiptForm);
