import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import jwt from 'jwt-decode'
import FormHeader from '../FormHeader'
import logo from '../../assets/dashx-logo.svg'
import { updateFormFields } from '../../constants/formFields'
import Input from '../Input'
import Button from '../Button'
import AlertBox from '../AlertBox'
import { useAuth } from '../contexts/CurrentUserProvider'
import { useLocalStorage } from '../hooks/useLocalStorage'

const classes = {
  pageBody: 'flex h-screen',
  formContainer: 'w-full max-w-lg m-auto bg-white rounded-lg border border-primaryBorder shadow-md py-10 px-8'
}

const UpdateProfileForm = () => {
  const [ error, setError ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const { update } = useAuth()
  const [ value ] = useLocalStorage('jwt')
  // eslint-disable-next-line camelcase
  const { first_name, last_name, email } = jwt(value)

  const handleUpdate = async (formValues) => {
    setError('')
    const { email, firstName, lastName } = formValues
    const requestBody = {
      first_name: firstName,
      last_name: lastName,
      email
    }
    setLoading(true)
    try {
      const { data } = await update(requestBody)
      console.log(data, 'updateData')
    } catch (error) {
      console.log(error, 'updateError')
      const errorMessage = error.response?.data?.message || error.response?.data
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={classes.pageBody}>
      <div className={classes.formContainer}>
        <FormHeader heading="Update Profile" logo={logo} />
        <Formik
          initialValues={{ firstName: first_name, lastName: last_name, email }}
          validationSchema={
            Yup.object({
              firstName: Yup.string()
                .required('First Name is required'),
              lastName: Yup.string()
                .required('Last Name is required'),
              email: Yup.string()
                .email('Invalid email address')
                .required('Email is required')
            })
          }
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            await handleUpdate(values, resetForm)
            setSubmitting(false)
          }}
        >
          <Form>
            {updateFormFields.map((fieldProps) => (
              <Input
                key={fieldProps?.label}
                label={fieldProps?.label}
                {...fieldProps}
              />
            ))}
            <Button type="submit" label="Update" loading={loading} />
            {error && (<AlertBox alertMessage={error} />)}
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default UpdateProfileForm
