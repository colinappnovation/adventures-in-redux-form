import React from 'react'
import { Button, TextField, FormControl, InputLabel, Select, FormHelperText } from '@material-ui/core'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { load as LoadObjective} from './objective'

import { DatePicker } from '@material-ui/pickers'

const data = {
    title: "Objective loaded",
    status: "Pending Approval"
}

const validate = values => {
    const errors = {}
    const requiredFields = [
      'title',
      'deadline',
      'description',
      'status'
    ]
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required'
      }      
    }) 
    return errors
  }


const renderDatePicker = ({
    inputFormat,
    dateParser,
    label,
    input,
    meta: { touched, invalid, error },
    dateFormatter,
    ...custom
}) => (
    <DatePicker 
        error={touched && invalid}
        format={inputFormat}
        helperText={touched && error}
        label={label}
        onChange={val => input.onChange(dateParser(val))}
        value={input.value}
        {...custom} 
        {...input} />
)

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

const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
        return
    } else {
        return <FormHelperText>{touched && error}</FormHelperText>
    }
}

const renderSelectField = ({
    input,
    label,
    meta: { touched, error },
    children,
    ...custom
}) => (
        <FormControl error={touched && error}>
            <InputLabel htmlFor="age-native-simple">Status</InputLabel>
            <Select
                native
                {...input}
                {...custom}
                inputProps={{
                    name: 'status',
                    id: 'age-native-simple'
                }}
            >
                {children}
            </Select>
            {renderFromHelper({ touched, error })}
        </FormControl>
    )


let ObjectiveForm = props => {
    const { handleSubmit, load, pristine, submitting } = props
    return (
        <form onSubmit={handleSubmit(val => console.log(val))}>

        <div>
        <button type="button" onClick={() => load(data)}>Load Account</button>
      </div>

               <div>
                <h1>Create a new Performance Objective</h1>
                <p></p>
                <div>
                    <Field
                        name="status"
                        component={renderSelectField}
                        label="Status"
                    >
                        <option />
                        <option value={'Pending Approval'}>Pending Approval</option>
                        <option value={'In Progress'}>In Progress</option>
                        <option value={'Completed'}>Completed</option>
                    </Field>
                </div>
               <div>
                <Field
                    name="title"
                    component={renderTextField}
                    label="Title"
                    helperText="Use a descriptive title but not too long"
                />
                {/* <Field
                    name="deadline"
                    component={renderTextField}
                    helperText="Set the deadline for your objective"
                    type="date"
                /> */}
                </div>
                <div>
                <Field name="deadline" component={renderDatePicker} />
                </div>
                <div>
                    <Field
                        name="description"
                        component={renderTextField}
                        helperText="Provide a description for your new objective"
                        multiline
                        rows="4"
                        variant="outlined"
                    />
                </div>
                <div>
                    <Button type="submit" disabled={pristine || submitting}>Add Objective</Button>
                </div>
            </div>
        </form>
    )
}

// Decorate with reduxForm()
ObjectiveForm = reduxForm({
    form: 'ObjectiveForm',
    validate,
    enableReinitialize: true
})(ObjectiveForm)


// You have to connect() to any reducers that you wish to connect to yourself
ObjectiveForm = connect(
    state => ({
      initialValues: state.objective.data, // pull initial values from account reducer
    }),
    { load: LoadObjective }, // bind account loading action creator
  )(ObjectiveForm);


export default ObjectiveForm