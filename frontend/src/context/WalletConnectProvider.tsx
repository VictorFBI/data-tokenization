import 'react-native-get-random-values'
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { SignClient } from '@walletconnect/sign-client'
import log from 'loglevel'
import { SessionTypes } from '@walletconnect/types'

log.setLevel(__DEV__ ? 'debug' : 'info')

type WalletConnectContextType = {
  /**
   * Initiates a WalletConnect session and returns a URI for QR code display.
   */
  connect: () => Promise<string>
  session: SessionTypes.Struct | null
  disconnect: () => Promise<void>
  client: Awaited<ReturnType<typeof SignClient.init>> | null
}

const WalletConnectContext = createContext<
  WalletConnectContextType | undefined
>(undefined)

export const WalletConnectProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [client, setClient] = useState<Awaited<
    ReturnType<typeof SignClient.init>
  > | null>(null)
  const [session, setSession] = useState<SessionTypes.Struct | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const projectId = process.env.EXPO_PUBLIC_WALLETCONNECT_PROJECT_ID!
        const signClient = await SignClient.init({
          projectId,
          relayUrl: 'wss://relay.walletconnect.com',
          metadata: {
            name: 'Tokenator',
            description: 'React Native Expo + WalletConnect',
            url: 'https://github.com/VictorFBI/data-tokenization',
            icons: ['https://walletconnect.com/walletconnect-logo.png'],
          },
          logger: 'info',
        })

        setClient(signClient)

        // Restore existing session
        const existing = signClient.session.values
        if (existing.length) {
          setSession(existing[0])
        }

        // Listen for session deletion
        signClient.on('session_delete', () => {
          log.info('Session deleted')
          setSession(null)
        })
      } catch (err) {
        log.error('WalletConnect init error:', err)
      }
    })()
  }, [])

  const connect = async (): Promise<string> => {
    if (!client) throw new Error('WalletConnect client not ready')

    const requiredNamespaces = {
      eip155: {
        chains: ['eip155:1'],
        methods: ['eth_sendTransaction', 'personal_sign', 'eth_signTypedData'],
        events: ['accountsChanged', 'chainChanged'],
      },
    }

    // Create pairing, get URI and approval function
    const { uri, approval } = await client.connect({ requiredNamespaces })
    if (!uri) throw new Error('No URI returned for WalletConnect')

    // Await session approval and update state
    approval()
      .then(sess => {
        setSession(sess)
      })
      .catch(err => {
        log.error('Session approval error:', err)
      })

    // Return URI for QR code
    return uri
  }

  const disconnect = async () => {
    if (!client || !session) return
    await client.disconnect({
      topic: session.topic,
      reason: { code: 6000, message: 'User disconnected' },
    })
    setSession(null)
  }

  return (
    <WalletConnectContext.Provider
      value={{ connect, session, disconnect, client }}
    >
      {children}
    </WalletConnectContext.Provider>
  )
}

export const useWalletConnect = (): WalletConnectContextType => {
  const context = useContext(WalletConnectContext)
  if (!context)
    throw new Error(
      'useWalletConnect must be used within WalletConnectProvider',
    )
  return context
}
