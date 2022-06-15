import React, { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import Button from '../Button'
import FormHeader from '../FormHeader'
import { loginFields } from '../../constants/formFields'
import Input from '../Input'
import AlertBox from '../AlertBox'

import logo from '../../assets/dashx-logo.svg'
import { useAuth } from '../contexts/CurrentUserProvider'

const classes = {
  pageBody: 'flex',
  formContainer: 'w-full max-w-lg m-auto bg-white rounded-lg border border-primaryBorder shadow-md py-10 px-8'
}

const LoginForm = () => {
  const [ error, setError ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const { login, user } = useAuth()

  const navigate = useNavigate()

  const handleLogin = async (formValues, resetForm) => {
    setError('')
    setLoading(true)

    const { email, password } = formValues
    const requestBody = { email, password }

    try {
      const { status } = await login(requestBody)
      if (status === 200) {
        navigate('/dashboard', { replace: true })
        resetForm()
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.data
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className={classes.pageBody}>
      <div className={classes.formContainer}>
        <FormHeader heading="Sign in" logo={logo} />
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
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            await handleLogin(values, resetForm)
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
            <Button type="submit" label="Login" loading={loading} />
            {error && (<AlertBox alertMessage={error} />)}
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default LoginForm
