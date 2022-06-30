import React, { useEffect, useState } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'

import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import jwtDecode from 'jwt-decode'

import FormHeader from '../components/FormHeader'
import AlertBox from '../components/AlertBox'
import SuccessBox from '../components/SuccessBox'
import Input from '../components/Input'
import Button from '../components/Button'

import api from '../lib/api'

const ResetPassword = () => {
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [params] = useSearchParams()
  const resetPasswordToken = params.get('token')

  useEffect(() => {
    if (resetPasswordToken) {
      const { exp } = jwtDecode(resetPasswordToken)

      if (exp < Math.trunc(Date.now() / 1000)) {
        setError('Your reset password link has expired.')
      }
    }
  }, [])

  const handleSubmit = async (values) => {
    setError('')
    setLoading(true)

    try {
      const requestBody = { token: params.get('token'), password: values.password }

      const { data: { message } = {}, status } = await api.post('/reset-password', requestBody)

      if (status === 200) {
        setSuccessMessage(message)
      }
    } catch (error) {
      const errorMessage =
        error?.message || error.response?.message || 'Something went wrong, please try later'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (!resetPasswordToken) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 m-auto">
      <FormHeader>Reset Password</FormHeader>
      <div className="sm:mx-auto sm:w-full mb-4 mt-4 sm:max-w-md rounded bg-white shadow shadow-md p-9">
        {successMessage && (
          <div className="text-center">
            <SuccessBox successMessage={successMessage} />
          </div>
        )}
        {error && (
          <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
            <AlertBox alertMessage={error} />
          </div>
        )}
        {!successMessage && !error && (
          <Formik
            initialValues={{
              password: ''
            }}
            validationSchema={Yup.object({
              password: Yup.string().required('New Password is required')
            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              await handleSubmit(values, resetForm)
              setSubmitting(false)
            }}
          >
            <Form>
              <Input label="New Password" type="password" name="password" />
              <Button type="submit" label="Submit" loading={loading} />
            </Form>
          </Formik>
        )}
        <div className="text-sm text-center pt-6">
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
