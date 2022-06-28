import React, { useState } from 'react'

import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import Input from '../components/Input'
import Button from '../components/Button'
import AlertBox from '../components/AlertBox'
import SuccessBox from '../components/SuccessBox'
import { useCurrentUserContext } from '../contexts/CurrentUserContext'

import api from '../lib/api'

const Profile = () => {
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const { user, setUser, getJwtToken } = useCurrentUserContext()
  const { first_name, last_name, email } = user || {}
  const jwtToken = getJwtToken()

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
        setSuccessMessage(message)
        setTimeout(() => {
          setSuccessMessage('')
        }, 2000)
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.data
      setError(errorMessage)
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
        <div className="sm:w-full sm:max-w-md mt-6">
          {error && <AlertBox alertMessage={error} />}
          {successMessage && <SuccessBox successMessage={successMessage} />}
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
