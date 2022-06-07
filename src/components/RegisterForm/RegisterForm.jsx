import React, { useState } from 'react';
import { registerFields } from '../../constants/formFields';
import Input from '../Input';
import Button from '../Button';
import FormHeader from './FormHeader';

import logo from '../../assets/dashx-logo.svg'

const RegisterForm = () => {
  const [ registerFormState, setRegisterFormState ] = useState({})
  
  const handleChange = ({ target: { name, value } }) => {
    setRegisterFormState({ ...registerFormState, [name]: value })
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
  }
  
  return (
    <div>
      <FormHeader logo={logo} heading="Sign Up for an account" />
      <form>
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
        <Button type="submit" label="SUBMIT" handleSubmit={handleSubmit} />
      </form>
    </div>
  )
}

export default RegisterForm;
