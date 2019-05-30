import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import ReceiptsDropzone from './receipts-dropzone';

import './style.scss';

const FILE_FIELD_NAME = 'files';

const ReceiptForm = props => {
  const { handleSubmit, reset } = props;
  return (
    <div>
      <form onSubmit={handleSubmit} className="form-group">
        <div>
          <Field name={FILE_FIELD_NAME} component={ReceiptsDropzone} />
        </div>
        <div className="btn">
          <button type="submit" className="btn__submit">
            <ion-icon name="checkbox-outline" />
          </button>
          <button type="button" className="btn__cancel" onClick={reset}>
            <ion-icon name="close" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'receipt'
})(ReceiptForm);
