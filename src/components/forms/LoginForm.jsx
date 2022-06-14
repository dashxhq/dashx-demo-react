import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import Button from '../Button'
import FormHeader from '../FormHeader'
import { loginFields } from '../../constants/formFields'
import Input from '../Input'
import AlertBox from '../AlertBox'

import logo from '../../assets/dashx-logo.svg'

const classes = {
  pageBody: 'flex h-screen',
  formContainer: 'w-full max-w-lg m-auto bg-white rounded-lg border border-primaryBorder shadow-md py-10 px-8'
}

const LoginForm = () => {
  // const [ success, setSuccess ] = useState('')
  const [ error, setError ] = useState('')

  return (
    <div className={classes.pageBody}>
      <div className={classes.formContainer}>
        {error && (<AlertBox alertMessage={error} setError={setError} />)}
        <FormHeader heading="Sign up for an account" logo={logo} />
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={
            Yup.object({
              email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
              password: Yup.string().required('Password is required')
            })
          }
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(false)
          }}
        >
          <Form>
            {loginFields.map((fieldProps) => (
              <Input
                key={fieldProps?.label}
                label={fieldProps?.label}
                {...fieldProps}
              />
            ))}
            <Button type="submit" label="Sign Up" />
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default LoginForm
