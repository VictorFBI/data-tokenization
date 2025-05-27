import React from 'react'
import { View, Button, Alert } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { useWalletConnect } from '@/src/context/WalletConnectProvider'
import SimpleText from '@/src/components/default-elements-overridings/SimpleText'
import { BackgroundSafeAreaView } from '@/src/components/default-elements-overridings/BackgroundView'

/**
 * Компонент экрана подключения кошелька.
 *
 * Этот компонент позволяет пользователю подключить свой криптокошелек
 * с использованием WalletConnect. Если кошелек уже подключен, отображается
 * информация о подключенном аккаунте. В противном случае пользователь может
 * инициировать процесс подключения, включая отображение QR-кода для сканирования.
 *
 * @component
 * @returns {JSX.Element} JSX-элемент, представляющий экран подключения кошелька.
 */
export default function ConnectScreen() {
  const { connect, session, disconnect } = useWalletConnect()
  const [uri, setUri] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  // Notify user on successful connection
  React.useEffect(() => {
    if (session) {
      Alert.alert('Wallet Connected', session.namespaces.eip155.accounts[0])
      setUri(null)
    }
  }, [session])

  const handleConnect = async () => {
    try {
      setError(null)
      const newUri = await connect()
      console.log('WalletConnect URI:', newUri)
      setUri(newUri)
    } catch (err: any) {
      console.error('Connection failed:', err)
      setError(err.message)
      Alert.alert('Ошибка', 'Не удалось подключить кошелек')
    }
  }

  const handleDisconnect = async () => {
    await disconnect()
    Alert.alert('Disconnected')
  }

  return (
    <BackgroundSafeAreaView style={{ flex: 1, padding: 20 }}>
      {session ? (
        <View>
          <SimpleText style={{ marginBottom: 20 }}>
            Connected: {session.namespaces.eip155.accounts[0]}
          </SimpleText>
          <Button title="Disconnect" onPress={handleDisconnect} />
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Button title="Connect Wallet" onPress={handleConnect} />
          {error && (
            <SimpleText style={{ color: 'red', marginTop: 10 }}>
              {error}
            </SimpleText>
          )}
          {uri && (
            <View style={{ marginTop: 20, alignItems: 'center' }}>
              <SimpleText style={{ marginBottom: 10 }}>
                Scan QR to connect:
              </SimpleText>
              <SimpleText style={{ fontSize: 12, paddingHorizontal: 10 }}>
                {uri}
              </SimpleText>
              <QRCode value={uri} size={200} />
            </View>
          )}
        </View>
      )}
    </BackgroundSafeAreaView>
  )
}
