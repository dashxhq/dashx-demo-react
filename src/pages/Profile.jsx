import React, { useState } from 'react'

import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import Button from '../components/Button'
import ErrorBox from '../components/ErrorBox'
import Input from '../components/Input'
import SuccessBox from '../components/SuccessBox'
import UploadAvatar from '../components/UploadAvatar'
import { useCurrentUserContext } from '../contexts/CurrentUserContext'

import api from '../lib/api'

const Profile = () => {
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const { user, setUser } = useCurrentUserContext()
  const { avatar, first_name, last_name, email } = user || {}

  const handleUpdate = async (formValues) => {
    setError('')
    setLoading(true)

    const { email, firstName, lastName, avatar } = formValues
    const requestBody = {
      first_name: firstName,
      last_name: lastName,
      email,
      avatar: {
        url: avatar.url
      }
    }

    try {
      const { data: { message, user } = {} } = await api.patch('/update-profile', requestBody)
      setUser(user)
      setSuccessMessage(message)
    } catch (error) {
      if (error.response.status >= 500) {
        setError('Something went wrong, please try again later.')
      } else {
        const errorMessage = error.response.data || error.message
        setError(errorMessage)
      }
    }

    setLoading(false)
  }

  return (
    <div className="min-h-full w-full pb-12">
      <div className="flex-col sm:flex">
        <h2 className="text-left sm:text-left text-2xl font-semibold text-gray-900">
          Edit Profile
        </h2>
        <div className="sm:w-full sm:max-w-2xl">
          {error && <ErrorBox message={error} />}
          {successMessage && <SuccessBox message={successMessage} />}
          <div className="py-8 pt-0 mb-0 mt-5">
            <Formik
              enableReinitialize={true}
              initialValues={{
                firstName: first_name,
                lastName: last_name,
                email,
                avatar: {
                  url: avatar.url
                }
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
              {({ setFieldValue, values, isSubmitting, setSubmitting }) => (
                <Form className="w-full flex flex-col sm:flex-row gap-6">
                  <div className="w-full sm:w-2/3">
                    <Input label="First Name" type="text" name="firstName" />
                    <Input label="Last Name" type="text" name="lastName" />
                    <Input label="Email" type="email" name="email" />
                    <Button
                      type="submit"
                      label="Update"
                      loading={loading}
                      disabled={isSubmitting}
                      message="Updating"
                    />
                  </div>
                  <div className="w-full sm:w-1/3">
                    <UploadAvatar
                      name="avatar.url"
                      label="Avatar"
                      file={values.avatar.url}
                      setFieldValue={setFieldValue}
                      setSubmitting={setSubmitting}
                      isSubmitting={isSubmitting}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
