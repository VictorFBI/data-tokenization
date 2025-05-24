import 'react-native-get-random-values'
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import log from 'loglevel'
import {
  initWalletConnect,
  getWalletConnectClient,
  WalletConnectClient,
} from '@/src/services/walletConnect'
import { SessionTypes } from '@walletconnect/types'

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
    ;(async () => {
      const c = await initWalletConnect()
      setClient(c)

      if (!c) {
        log.error('WalletConnect client is not initialized')
        return
      }

      c.on('session_event', args => {
        log.debug('Session event:', args)
      })

      c.on('session_update', ({ params: { namespaces } }) => {
        log.debug('Session updated:', namespaces)
      })

      c.on('session_delete', () => {
        setSession(null)
        log.debug('Session deleted')
      })
    })()
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
          chains: ['eip155:1'],
          events: ['accountsChanged', 'chainChanged'],
        },
      },
    })
    log.info('WalletConnect URI generated')
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
