import React from 'react';
import { Field, reduxForm } from 'redux-form';

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
      <input
        {...input}
        placeholder={label}
        type={type}
        className={className}
        autoComplete={autoComplete}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
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
          <button
            type="submit"
            disabled={submitting}
            className="comment__form--btn-submit"
          >
            <ion-icon name="checkbox-outline" />
          </button>
          <button
            type="button"
            className="comment__form--btn-cancel"
            onClick={reset}
          >
            <ion-icon name="close" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'comment'
})(CommentForm);
