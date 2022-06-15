import { useState } from 'react'

export const useLocalStorage = (key, initialValue) => {
  const { localStorage } = window

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

  const resetLocalStorage = (keys) => {
    keys.forEach((key) => {
      localStorage.removeItem(key)
    })
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

  return [ value, setValue, resetLocalStorage ]
}
