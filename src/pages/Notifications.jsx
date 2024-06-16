import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDashXProvider } from '@dashx/react'
import { Form, Formik } from 'formik'

import api, { INTERNAL_SERVER_ERROR } from '../lib/api'
import Button from '../components/Button'
import ErrorBox from '../components/ErrorBox'
import Input from '../components/Input'
import SuccessBox from '../components/SuccessBox'
import { useCurrentUserContext } from '../contexts/CurrentUserContext'

const Notifications = () => {
  const location = useLocation()
  const dashx = useDashXProvider()
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const { user } = useCurrentUserContext()

  useEffect(() => {
    dashx.track('Page Viewed', { path: location.pathname })
  }, [dashx, location.pathname])

  const handleSubmit = async (formValues) => {
    try {
      const { data: { message } = {} } = await api.post('/notification/send', formValues)
      setSuccessMessage(message)
    } catch (error) {
      if (error.response.status >= 500) {
        setError(INTERNAL_SERVER_ERROR)
      } else {
        const errorMessage = error.response.data || error.message
        setError(errorMessage)
      }
    }
  }

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>

      <div className="mx-auto w-96 pt-12">
        {error && <ErrorBox message={error} />}
        {successMessage && <SuccessBox message={successMessage} />}
        <Formik
          initialValues={{
            body: `Hello ${user.email}`
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Input label="Body" type="text" name="body" />
              <Button type="submit" label="Submit" disabled={isSubmitting} />
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default Notifications
