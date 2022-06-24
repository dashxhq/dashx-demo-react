import React, { useState } from 'react'

import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import Input from '../components/Input'
import Button from '../components/Button'
import AlertBox from '../components/AlertBox'
import SuccessBox from '../components/SuccessBox'
import { useAuth } from '../contexts/CurrentUserProvider'

import api from '../lib/api'

import { updateFormFields } from '../constants/formFields'

const classes = {
  pageBody: 'min-h-full w-full pb-12',
  formContainer: 'flex-col sm:flex'
}

const Profile = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)
  const { user, setUser } = useAuth()
  const { first_name, last_name, email } = user || {}
  const jwtToken = localStorage.getItem('jwtToken')

  const handleUpdate = async (formValues) => {
    setError('')
    setLoading(true)

    const { email, firstName, lastName } = formValues
    const requestBody = {
      first_name: firstName,
      last_name: lastName,
      email
    }

    try {
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`
        }
      }
      const { data: { message, user } = {}, status } = await api.patch(
        '/update-profile',
        requestBody,
        headers
      )
      if (status === 200) {
        setUser(user)
      }
      setSuccess(true)
      setSuccessMessage(message)
      setTimeout(() => {
        setSuccess(false)
      }, 2000)
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.data
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={classes.pageBody}>
      <div className={classes.formContainer}>
        <h2 className="text-left sm:text-left text-2xl font-semibold text-gray-900">
          Edit Profile
        </h2>
        {error && <AlertBox alertMessage={error} />}
        {success && <SuccessBox successMessage={successMessage} />}
        <div className="sm:w-full sm:max-w-md mt-8">
          <div className="py-8 pt-0 mb-0">
            <Formik
              initialValues={{
                firstName: first_name,
                lastName: last_name,
                email
              }}
              validationSchema={Yup.object({
                firstName: Yup.string().required('First Name is required'),
                lastName: Yup.string().required('Last Name is required'),
                email: Yup.string().email('Invalid email address').required('Email is required')
              })}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                await handleUpdate(values, resetForm)
                setSubmitting(false)
              }}
            >
              <Form>
                {updateFormFields.map((fieldProps) => (
                  <Input key={fieldProps?.label} label={fieldProps?.label} {...fieldProps} />
                ))}
                <Button type="submit" label="Update" loading={loading} message="Updating" />
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
