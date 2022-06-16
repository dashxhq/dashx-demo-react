import { useState } from 'react'

const { localStorage } = window

export const useLocalStorage = (key, initialValue) => {
  const getValue = () => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error, 'localStorageError')
      return initialValue
    }
  }

  const [ value, setStoredValue ] = useState(getValue())

  const setValue = (value) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value))
      }
    } catch (error) {
      console.log(error)
    }
    setStoredValue(value)
  }

  return [ value, setValue ]
}

export const resetLocalStorage = (keys) => {
  keys.forEach((key) => {
    localStorage.removeItem(key)
  })
}
