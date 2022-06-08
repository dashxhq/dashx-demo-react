import React, { useState } from 'react';
import { loginFields } from '../../constants/formFields';
import Input from '../Input';
import Button from '../Button';
import FormHeader from '../FormHeader';

import logo from '../../assets/dashx-logo.svg'

const classes = {
  pageBody: "h-full flex bg-gray-100",
  formContainer: "w-full max-w-lg m-auto bg-white rounded-lg border border-primaryBorder shadow-md py-10 px-8"
}

const LoginForm = () => {
  const [ loginFormState, setLoginFormState ] = useState({})
  
  const handleChange = ({ target: { name, value } }) => {
    setLoginFormState({ ...loginFormState, [name]: value })
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO
  }
  
  return (
    <div className={classes.pageBody}>
      <div className={classes.formContainer}>
        <FormHeader logo={logo} heading="Sign In" />
        <form>
          {
            loginFields.map(({
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
                value={loginFormState[name]}
                required={required}
              />
            ))
          }
          <Button type="submit" label="SIGN IN" handleSubmit={handleSubmit} />
        </form>
      </div>
    </div>
    
  )
}

export default LoginForm;
