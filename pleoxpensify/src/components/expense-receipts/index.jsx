import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import ReceiptsDropzone from './receipts-dropzone';
// import { addReceiptToExpense } from '../../state/expenses/actions';

const FILE_FIELD_NAME = 'files';

const ReceiptForm = props => {
  const { handleSubmit, reset } = props;
  return (
    <div>
      <form onSubmit={handleSubmit} className="form-group">
        <div>
          <label htmlFor={FILE_FIELD_NAME}>Files</label>
          <Field name={FILE_FIELD_NAME} component={ReceiptsDropzone} />
        </div>
        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'receipt'
})(ReceiptForm);
