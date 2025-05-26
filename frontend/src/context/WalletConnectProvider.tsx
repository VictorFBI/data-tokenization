// В вашем провайдере:
import 'react-native-get-random-values'
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import {
  initWalletConnect,
  getWalletConnectClient,
  WalletConnectClient,
} from '@/src/services/walletConnect'
import { SessionTypes } from '@walletconnect/types'
import log from 'loglevel'

log.setLevel(__DEV__ ? 'debug' : 'info')

type WalletConnectContextType = {
  connect: () => Promise<{
    uri?: string
    approval: () => Promise<SessionTypes.Struct>
  }>
  session: SessionTypes.Struct | null
  setSession: (session: SessionTypes.Struct | null) => void
  client: WalletConnectClient | null
}

const WalletConnectContext = createContext<
  WalletConnectContextType | undefined
>(undefined)

export const WalletConnectProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [session, setSession] = useState<SessionTypes.Struct | null>(null)
  const [client, setClient] = useState<WalletConnectClient | null>(null)

  useEffect(() => {
    let isMounted = true

    ;(async () => {
      const c = await initWalletConnect()
      if (!c) {
        log.error('WalletConnect client is not initialized')
        return
      }
      if (!isMounted) return

      if (isMounted) {
        setClient(c)

        const onSessionEvent = args => log.debug('Session event:', args)
        const onSessionUpdate = ({ params: { namespaces } }) =>
          log.debug('Session updated:', namespaces)
        const onSessionDelete = () => {
          setSession(null)
          log.debug('Session deleted')
        }

        c.on('session_event', onSessionEvent)
        c.on('session_update', onSessionUpdate)
        c.on('session_delete', onSessionDelete)

        // Cleanup on unmount
        return () => {
          isMounted = false
          c?.off('session_event', onSessionEvent)
          c?.off('session_update', onSessionUpdate)
          c?.off('session_delete', onSessionDelete)
        }
      }
    })()

    // Generic cleanup if effect body didn't return
    return () => {
      isMounted = false
    }
  }, [])

  const connect = async (): Promise<{
    uri?: string
    approval: () => Promise<SessionTypes.Struct>
  }> => {
    const c = getWalletConnectClient()
    const { uri, approval } = await c.connect({
      requiredNamespaces: {
        eip155: {
          methods: [
            'eth_sendTransaction',
            'personal_sign',
            'eth_signTypedData',
          ],
          chains: ['eip155:5'],
          events: ['accountsChanged', 'chainChanged'],
        },
      },
    })
    log.info('WalletConnect URI generated:', uri)
    return { uri, approval }
  }

  return (
    <WalletConnectContext.Provider
      value={{ connect, session, client, setSession }}
    >
      {children}
    </WalletConnectContext.Provider>
  )
}

export const useWalletConnect = (): WalletConnectContextType => {
  const context = useContext(WalletConnectContext)
  if (!context) {
    log.error('useWalletConnect used outside of provider')
    throw new Error(
      'useWalletConnect must be used within a WalletConnectProvider',
    )
  }
  return context
}
