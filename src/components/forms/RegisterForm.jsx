import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import Button from '../Button'
import FormHeader from '../FormHeader'
import { registerFields } from '../../constants/formFields'
import Input from '../Input'
import parseError from '../../lib/parseError'
import AlertBox from '../AlertBox'
import InfoBox from '../InfoBox'

import dashx from '../../lib/dashx'
import logo from '../../assets/dashx-logo.svg'

const classes = {
  pageBody: 'flex h-screen',
  formContainer: 'w-full max-w-lg m-auto bg-white rounded-lg border border-primaryBorder shadow-md py-10 px-8'
}

const RegisterForm = () => {
  const [ success, setSuccess ] = useState('')
  const [ error, setError ] = useState('')

  const onSubmitForm = async (formValues, resetForm) => {
    try {
      const response = await dashx?.identify(formValues)
      if (response) {
        resetForm()
      }
    } catch (error) {
      const errorMessage = parseError(error)
      setError(errorMessage)
    }
  }

  return (
    <div className={classes.pageBody}>
      <div className={classes.formContainer}>
        {error && (<AlertBox alertMessage={error} setError={setError} />)}
        <FormHeader heading="Sign up for an account" logo={logo} />
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
          }}
          validationSchema={
            Yup.object({
              firstName: Yup.string()
                .required('First Name is required'),
              lastName: Yup.string()
                .required('Last Name is required'),
              email: Yup.string()
                .email('Invalid email address')
                .required('Email is required')
            })
          }
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            await onSubmitForm(values, resetForm)
            setSubmitting(false)
          }}
        >
          <Form>
            {registerFields.map((fieldProps, index) => (
              <Input
                key={index}
                label={fieldProps?.label}
                {...fieldProps}
              />
            ))}
            {!success && (<InfoBox infoMessage="Please add your country code as prefix" />)}
            <Button type="submit" label="Sign Up" />
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default RegisterForm
