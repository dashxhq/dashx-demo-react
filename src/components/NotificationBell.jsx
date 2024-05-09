import React, { Fragment, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { BellIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'
import { usePopper } from 'react-popper'

const CONNECTION_STATUS = {
  [ReadyState.CONNECTING]: 'Connecting',
  [ReadyState.OPEN]: 'Open',
  [ReadyState.CLOSING]: 'Closing',
  [ReadyState.CLOSED]: 'Closed',
  [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
};

const NotificationBell = () => {
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end'
  })
  const [isAppInboxOpen, setIsAppInboxOpen] = useState(false)
  const { readyState } = useWebSocket(process.env.REACT_APP_SOCKET_BASE_URL);

  console.log(CONNECTION_STATUS[readyState])

  return (
    <>
      <BellIcon
        aria-hidden="true"
        className="h-6 w-6"
        onClick={() =>  setIsAppInboxOpen(!isAppInboxOpen)}
        ref={setReferenceElement}
      />

      {isAppInboxOpen && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          className="bg-gray-800 rounded-xl text-white w-96 h-96"
        >
          <div className="flex justify-between items-center border-y-2 border-white px-4 py-4">
            <p>Notifications</p>
            <XIcon height={20} width={20} onClick={() =>  setIsAppInboxOpen(false)} />
          </div>
        </div>
      )}
    </>
  )

}

export default NotificationBell
