import React, { useState, useEffect } from 'react'

import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import Input from '../components/Input'
import Button from '../components/Button'
import ErrorBox from '../components/ErrorBox'
import SuccessBox from '../components/SuccessBox'
import { useCurrentUserContext } from '../contexts/CurrentUserContext'

import api from '../lib/api'

const Profile = () => {
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const { user, setUser } = useCurrentUserContext()
  const { first_name, last_name, email } = user || {}

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } = {} } = await api.get('/profile')
      setUser(user)
    }

    getProfile()
  }, [])

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
      const { data: { message, user } = {}, status } = await api.patch(
        '/update-profile',
        requestBody
      )
      if (status === 200) {
        setUser(user)
        setSuccessMessage(message)
        setTimeout(() => {
          setSuccessMessage('')
        }, 2000)
      }
    } catch (error) {
      if (error.response.status === 500) {
        setError('Something went wrong, please try again later.')
      } else {
        const errorMessage = error.response.data || error.message
        setError(errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-full w-full pb-12">
      <div className="flex-col sm:flex">
        <h2 className="text-left sm:text-left text-2xl font-semibold text-gray-900">
          Edit Profile
        </h2>
        <div className="sm:w-full sm:max-w-md">
          {error && <ErrorBox alertMessage={error} />}
          {successMessage && <SuccessBox successMessage={successMessage} />}
          <div className="py-8 pt-0 mb-0 mt-5">
            <Formik
              enableReinitialize={true}
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
                <Input label="First Name" type="text" name="firstName" />
                <Input label="Last Name" type="text" name="lastName" />
                <Input label="Email" type="email" name="email" />
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
