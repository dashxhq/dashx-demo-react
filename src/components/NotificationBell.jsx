import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import useWebSocket from 'react-use-websocket'
import { BellIcon } from '@heroicons/react/outline'
import { useDashXProvider } from '@dashx/react'
import { usePopper } from 'react-popper'
import { XIcon } from '@heroicons/react/solid'

const MessageType = {
  Subscribe: 'SUBSCRIBE',
  InAppNotification: 'IN_APP_NOTIFICIATION',
  Invalid: 'INVALID',
};

const NotificationBell = () => {
  let dashx = useDashXProvider()
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end'
  })
  const [isAppInboxOpen, setIsAppInboxOpen] = useState(false)
  const [connectWebsocket, setConnectWebsocket] = useState(false)

  let { sendJsonMessage } = useWebSocket("ws://localhost:8082/websocket", {
    queryParams: {
      'publicKey': dashx.publicKey,
      'targetEnvironment': dashx.targetEnvironment
    },
    shouldReconnect: (_) => true,
    onReconnectStop: (numAttempts) => console.error({ numAttempts }),
    onError: errorEvent => console.error({ errorEvent }),
    onClose: closeEvent => console.log({ closeEvent }),
    onMessage: messageEvent => {
      let message = {}
      try {
        message = JSON.parse(messageEvent.data)
      } catch(e) {
        console.error(e)
      }

      switch (message.type) {
        case MessageType.Subscribe:
          break;
        case MessageType.InAppNotification:
          toast(message.data.body)
          break;
        case MessageType.Invalid:
          console.error(message.data.message)
          break;
        default:
          console.error('Unknown message type');
      }
    },
    onOpen: (_) => {
      sendJsonMessage({
        type: MessageType.Subscribe,
        data: {
          accountUid: JSON.parse(window.localStorage.getItem('dashx-sdk'))['accountUid']
        }
      })
    },
  }, connectWebsocket);

  useEffect(() => {
    // Ensure the webook connection request is made ONLY once
    setConnectWebsocket(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Toaster
        position='top-right'
        toastOptions={{
          className: 'bg-gray-800 text-white'
        }}
      />

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
