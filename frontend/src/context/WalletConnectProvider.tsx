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
      if (!c || !isMounted) {
        log.error('WalletConnect client is not initialized')
        return
      }
      setClient(c)

      c.on('session_event', args => log.debug('Session event:', args))
      c.on('session_update', ({ params: { namespaces } }) =>
        log.info('Session updated:', namespaces),
      )
      c.on('session_delete', () => {
        setSession(null)
        log.info('Session deleted')
      })
    })()

    return () => {
      isMounted = false
    }
  }, [])

  const connect = async (): Promise<{
    uri?: string
    approval: () => Promise<SessionTypes.Struct>
  }> => {
    if (!client) throw new Error('WalletConnect client is not ready')
    const { uri, approval } = await client.connect({
      requiredNamespaces: {
        eip155: {
          methods: [
            'eth_sendTransaction',
            'personal_sign',
            'eth_signTypedData',
          ],
          chains: ['eip155:1', 'eip155:5', 'eip155:11155111'],
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
