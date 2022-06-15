import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { useNavigate } from 'react-router-dom'
import Button from '../Button'
import FormHeader from '../FormHeader'
import { registerFields } from '../../constants/formFields'
import Input from '../Input'
import AlertBox from '../AlertBox'

import logo from '../../assets/dashx-logo.svg'
import { useAuth } from '../contexts/CurrentUserProvider'

const classes = {
  pageBody: 'flex',
  formContainer: 'w-full max-w-lg m-auto bg-white rounded-lg border border-primaryBorder shadow-md py-10 px-8'
}

const RegisterForm = () => {
  const [ error, setError ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const navigate = useNavigate()
  const { register } = useAuth()

  const onSubmitForm = async (formValues, resetForm) => {
    setError('')
    setLoading(true)

    const { email, firstName, lastName, password } = formValues
    const requestBody = {
      first_name: firstName,
      last_name: lastName,
      email,
      password
    }

    try {
      const { status } = await register(requestBody)
      if (status === 201) {
        navigate('/dashboard', { replace: true })
        resetForm()
      }
    } catch (error) {
      const errorMessage = error.response.data.message
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={classes.pageBody}>
      <div className={classes.formContainer}>
        <FormHeader heading="Sign up for an account" logo={logo} />
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: ''
          }}
          validationSchema={
            Yup.object({
              firstName: Yup.string()
                .required('First Name is required'),
              lastName: Yup.string()
                .required('Last Name is required'),
              email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
              password: Yup.string()
                .required('Password is required')
            })
          }
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            await onSubmitForm(values, resetForm)
            setSubmitting(false)
          }}
        >
          <Form>
            {registerFields.map((fieldProps) => (
              <Input
                key={fieldProps?.label}
                label={fieldProps?.label}
                {...fieldProps}
              />
            ))}
            <Button type="submit" label="Submit" loading={loading} />
            {error && (
              <AlertBox alertMessage={error} />
            )}
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default RegisterForm
