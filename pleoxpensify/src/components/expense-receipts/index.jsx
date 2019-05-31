import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import Button from 'react-bootstrap/Button';

import ReceiptsDropzone from './receipts-dropzone';

import './style.scss';

const FILE_FIELD_NAME = 'files';

const ReceiptForm = props => {
  const { handleSubmit, reset } = props;
  return (
    <div className="receipt-form">
      <form onSubmit={handleSubmit}>
        <div>
          <Field name={FILE_FIELD_NAME} component={ReceiptsDropzone} />
        </div>
        <div className="receipt-form__btn">
          <Button
            type="submit"
            className="receipt-form__btn--submit"
            variant="info"
          >
            Save
          </Button>
          <Button
            type="reset"
            className="receipt-form__btn--cancel"
            onClick={reset}
            variant="danger"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'receipt'
})(ReceiptForm);
