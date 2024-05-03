import React, { useEffect, useState } from 'react'
import { Field, Form, Formik } from 'formik'
import { Switch } from '@headlessui/react'
import { useDashXProvider } from '@dashx/react'

import Button from '../components/Button'
import Loader from '../components/Loader'
import ErrorBox from '../components/ErrorBox'
import SuccessBox from '../components/SuccessBox'
import ToggleSwitch from '../components/ToggleSwitch'


const Settings = () => {
  const [dashx] = useDashXProvider()
  const [preferences, setPreferences] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const fetchPreferences = async () => {
      setLoading(true)
      try {
        const preferences = await dashx.fetchStoredPreferences()
        setPreferences(preferences)
      } catch (error) {
        setError('Error fetching preferences.')
      }
      setLoading(false)
    }

    fetchPreferences()
  }, [dashx])

  const savePreferences = async (values) => {
    setError('')
    setSuccessMessage('')

    try {
      await dashx.saveStoredPreferences(values)
      setSuccessMessage('Preferences saved.')
    } catch (error) {
      setError('Error saving preferences.')
    }
  }

  const onSubmit = async (values) => {
    await savePreferences(values)
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      {error && <ErrorBox message={error} />}
      {successMessage && <SuccessBox message={successMessage} />}
      {loading ? (
        <Loader />
      ) : (
        <Formik
          initialValues={preferences}
          onSubmit={onSubmit}
        >
          {({ resetForm }) => (
            <Form>
              <ul className="mt-2 divide-y divide-gray-200">
                <Switch.Group as="li" className="py-4 flex items-center justify-between">
                  <div className="flex flex-col">
                    <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                      When someone creates a post
                    </Switch.Label>
                    <Switch.Description className="text-sm text-gray-500">
                      This will send a notification when someone creates a post
                    </Switch.Description>
                  </div>
                  <Field name="new-post" component={ToggleSwitch} type="button" />
                </Switch.Group>
                <Switch.Group as="li" className="py-4 flex items-center justify-between">
                  <div className="flex flex-col">
                    <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                      When someone bookmarks a post
                    </Switch.Label>
                    <Switch.Description className="text-sm text-gray-500">
                      This will send a notification when someone bookmarks a post
                    </Switch.Description>
                  </div>
                  <Field name="new-bookmark" component={ToggleSwitch} type="button" />
                </Switch.Group>
              </ul>
              <div className="mt-4 py-4 flex justify-end gap-3 sm:gap-0">
                <Button
                  type="button"
                  classes="justify-center rounded-md border border-transparent shadow-sm px-4 py-2 font-medium text-white hover:bg-gray-50 hover:text-gray-800 text-gray-800 bg-transparent border-gray-200 sm:ml-3 sm:w-auto sm:text-sm focus:outline-none"
                  onClick={resetForm}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  classes="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 font-medium text-white hover:bg-indigo-700 sm:ml-3 sm:w-auto sm:text-sm"
                  label="Save"
                  disabled={error}
                />
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  )
}

export default Settings
