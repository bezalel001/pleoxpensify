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
  const { handleSubmit, submitting } = props;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Field
          name="expenseComment"
          component={renderField}
          type="text"
          label="Comment"
          validate={required}
          className="comment-expense-input"
          autoComplete="off"
        />

        <div>
          <button type="submit" disabled={submitting}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'comment'
})(CommentForm);
