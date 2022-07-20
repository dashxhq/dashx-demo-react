import React from 'react'

import classNames from 'classnames'
import { Switch } from '@headlessui/react'

const ToggleSwitch = (props) => {
  const { field, form } = props

  const handleChange = () => {
    form.setFieldValue(field.name, { ...field.value, enabled: !field.value.enabled })
  }

  return (
    <Switch
      onChange={handleChange}
      checked={field.value?.enabled}
      className={classNames(
        field.value?.enabled ? 'bg-teal-500' : 'bg-gray-200',
        'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-50 focus:outline-none'
      )}
    >
        <span
          aria-hidden="true"
          className={classNames(
            field.value?.enabled ? 'translate-x-5' : 'translate-x-0',
            'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
          )}
        />
    </Switch>
  )
}

export default ToggleSwitch
