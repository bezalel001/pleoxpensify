import React from 'react';
import { Field, reduxForm } from 'redux-form';

const required = value =>
  value || typeof value === 'number' ? undefined : 'Required';

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <div>
      <input {...input} placeholder={label} type={type} />
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
