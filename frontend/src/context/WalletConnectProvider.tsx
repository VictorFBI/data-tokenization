import 'react-native-get-random-values'
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { Linking, Platform } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import {
  initWalletConnect,
  getWalletConnectClient,
} from '@/src/services/walletConnect'
import { SessionTypes, ISignClient } from '@walletconnect/types'

type WalletConnectContextType = {
  connect: () => Promise<SessionTypes.Struct>
  session: SessionTypes.Struct | null
  client: ISignClient | null
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
  const [client, setClient] = useState<ISignClient | null>(null)

  useEffect(() => {
    const setup = async () => {
      const c = await initWalletConnect()
      setClient(c)

      if (!c) {
        console.error('WalletConnect client is not initialized')
        return
      }

      c.on('session_event', args => {
        console.log('Session event:', args)
      })

      c.on('session_update', ({ topic, params }) => {
        const { namespaces } = params
        console.log('Session updated:', namespaces)
      })

      c.on('session_delete', () => {
        setSession(null)
        console.log('Session deleted')
      })
    }

    setup()
  }, [])

  const connect = async (): Promise<SessionTypes.Struct> => {
    const c = getWalletConnectClient()

    const { uri, approval } = await c.connect({
      requiredNamespaces: {
        eip155: {
          methods: [
            'eth_sendTransaction',
            'personal_sign',
            'eth_signTypedData',
          ],
          chains: ['eip155:1'], // Ethereum mainnet
          events: ['accountsChanged', 'chainChanged'],
        },
      },
    })

    if (uri) {
      const walletUniversalLink = `https://metamask.app.link/wc?uri=${encodeURIComponent(uri)}`
      if (Platform.OS === 'ios') {
        await Linking.openURL(walletUniversalLink)
      } else {
        await WebBrowser.openBrowserAsync(walletUniversalLink)
      }
    }

    const session = await approval()
    setSession(session)
    return session
  }

  return (
    <WalletConnectContext.Provider value={{ connect, session, client }}>
      {children}
    </WalletConnectContext.Provider>
  )
}

export const useWalletConnect = (): WalletConnectContextType => {
  const context = useContext(WalletConnectContext)
  if (!context) {
    throw new Error(
      'useWalletConnect must be used within a WalletConnectProvider',
    )
  }
  return context
}
