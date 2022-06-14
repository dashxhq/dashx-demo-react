const parseError = (errorObj) => {
  const { extensions: { fieldErrors } = {} } = errorObj[0] || {}
  return fieldErrors.join('')
}

export default parseError
