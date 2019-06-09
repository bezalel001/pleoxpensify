import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Alert, Button } from 'react-bootstrap';

import './style.scss';

const required = value =>
  value || typeof value === 'number' ? undefined : 'Required';

const renderField = ({
  input,
  label,
  type,
  className,
  autoComplete,
  meta: { touched, error, warning }
}) => (
  <div>
    <div>
      {touched &&
        ((error && <Alert variant="danger">{error}</Alert>) ||
          (warning && <Alert variant="warning">{warning}</Alert>))}
      <textarea
        {...input}
        placeholder={label}
        type={type}
        className={className}
        autoComplete={autoComplete}
      />
    </div>
  </div>
);
const CommentForm = props => {
  const { handleSubmit, submitting, reset } = props;
  return (
    <div className="comment">
      <form onSubmit={handleSubmit} className="comment__form">
        <Field
          name="expenseComment"
          component={renderField}
          type="text"
          label="Comment"
          validate={required}
          className="comment__form--input"
          autoComplete="off"
        />

        <div className="comment__form--btn">
          <Button
            disabled={submitting}
            type="submit"
            variant="info"
            className="comment__form--btn-submit"
          >
            Save
          </Button>
          <Button
            type="reset"
            variant="danger"
            onClick={reset}
            className="comment__form--btn-cancel"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'comment'
})(CommentForm);
