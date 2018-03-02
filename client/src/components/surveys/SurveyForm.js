import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import validateEmails from '../../utils/validateEmail';
import formFields from './formFields';


class SurveyForm extends Component {
  renderFields() {
   return _.map(formFields, ( { label, name } ) => {
     return <Field key={name} component={SurveyField} type="text" label={label} name={name}/>
   });
  }
  render() {
    return (
      <div>
        <form 
          onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          { this.renderFields() }
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');
  
  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });


  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
