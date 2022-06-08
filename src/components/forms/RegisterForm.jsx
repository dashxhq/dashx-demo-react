import React, { useState } from 'react';
import { registerFields } from '../../constants/formFields';
import Input from '../Input';
import Button from '../Button';
import FormHeader from '../FormHeader';

import logo from '../../assets/dashx-logo.svg'
import dashx from '../../lib/dashx';

const classes = {
  pageBody: "h-full flex bg-gray-100",
  formContainer: "w-full max-w-lg m-auto bg-white rounded-lg border border-primaryBorder shadow-md py-10 px-8"
}

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: ""
}

const RegisterForm = () => {
  const [ registerFormState, setRegisterFormState ] = useState(initialState)
  
  const handleChange = ({ target: { name, value } }) => {
    setRegisterFormState({ ...registerFormState, [name]: value })
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    await dashx?.track('User Sign up', registerFormState)
    setRegisterFormState(initialState)
    const response = await dashx?.identify(registerFormState);
  }
  
  return (
    <div className={classes.pageBody}>
      <div className={classes.formContainer}>
        <FormHeader logo={logo} heading="Sign Up for an account" />
        <form onSubmit={handleSubmit}>
          {
            registerFields.map(({
              label,
              type,
              placeholder,
              name,
              required
            }, index) => (
              <Input
                key={index}
                label={label}
                type={type}
                name={name}
                placeholder={placeholder}
                handleChange={handleChange}
                value={registerFormState[name]}
                required={required}
              />
            ))
          }
          <Button type="submit" label="SIGN UP" />
        </form>
      </div>
    </div>
  )
}

export default RegisterForm;
