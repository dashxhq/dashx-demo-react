import React, { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'

import Button from '../components/Button'

import dashx from '../lib/dashx'

const initialPreferences = {
  notifyPost: { enabled: false },
  notifyBookmark: { enabled: false }
}

const Settings = () => {
  const [preferences, setPreferences] = useState(initialPreferences)
  const { notifyBookmark, notifyPost } = preferences

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  useEffect(() => {
    const demo = async () => {
      console.log(await dashx.fetchStoredPreferences())
    }

    demo()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      <div>
        <ul role="list" className="mt-2 divide-y divide-gray-200">
          <Switch.Group as="li" className="py-4 flex items-center justify-between">
            <div className="flex flex-col">
              <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                When someone creates a post
              </Switch.Label>
              <Switch.Description className="text-sm text-gray-500">
                This will send a notification when someone creates a post
              </Switch.Description>
            </div>
            <Switch
              checked={notifyPost.enabled}
              onChange={() =>
                setPreferences(({ notifyPost }) => ({
                  ...preferences,
                  notifyPost: { enabled: !notifyPost.enabled }
                }))
              }
              className={classNames(
                notifyPost.enabled ? 'bg-teal-500' : 'bg-gray-200',
                'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none'
              )}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  notifyPost.enabled ? 'translate-x-5' : 'translate-x-0',
                  'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                )}
              />
            </Switch>
          </Switch.Group>
          <Switch.Group as="li" className="py-4 flex items-center justify-between">
            <div className="flex flex-col">
              <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                When someone bookmarks my post
              </Switch.Label>
              <Switch.Description className="text-sm text-gray-500">
                This will send a notification when someone bookmarks a post
              </Switch.Description>
            </div>
            <Switch
              checked={notifyBookmark.enabled}
              onChange={() =>
                setPreferences(({ notifyBookmark }) => ({
                  ...preferences,
                  notifyBookmark: { enabled: !notifyBookmark.enabled }
                }))
              }
              className={classNames(
                notifyBookmark.enabled ? 'bg-teal-500' : 'bg-gray-200',
                'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200'
              )}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  notifyBookmark.enabled ? 'translate-x-5' : 'translate-x-0',
                  'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                )}
              />
            </Switch>
          </Switch.Group>
        </ul>
      </div>
      <div className="mt-4 py-4 flex justify-end gap-3 sm:gap-0">
        <Button
          type="button"
          classes="justify-center rounded-md border border-transparent shadow-sm px-4 py-2 font-medium text-white hover:bg-gray-50 hover:text-gray-800 text-gray-800 bg-transparent border-gray-200 sm:ml-3 sm:w-auto sm:text-sm focus:outline-none"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          classes="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 font-medium text-white hover:bg-indigo-700 sm:ml-3 sm:w-auto sm:text-sm"
          label="Save"
          disabled={!notifyPost.enabled && !notifyBookmark.enabled}
        />
      </div>
    </div>
  )
}

export default Settings
