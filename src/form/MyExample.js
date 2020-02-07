import React, { Fragment } from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField'
import asyncValidate from './asyncValidate'

const renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  )

  const validate = values => {
    const errors = {}
    const requiredFields = [
      'firstName',
      'lastName'
    ]
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required'
      }
    })    
    return errors
  }

  let MaterialUiForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props
    return (
      <Fragment>
      <h1>My Form</h1>
      <form onSubmit={handleSubmit(val => console.log(val))}>
          <div>
        <Field
          name="firstName"
          component={renderTextField}
          label="First Name"
        />
      </div>
      <div>
        <Field
          name="lastName"
          component={renderTextField}
          label="Last Name"
        />
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
      </form>
      </Fragment>
    )
    }

    MaterialUiForm = reduxForm({
        form: 'MaterialUiForm', // a unique identifier for this form
        validate,
        asyncValidate
    })(MaterialUiForm)

    export default MaterialUiForm
      