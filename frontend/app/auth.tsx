import React, { useState } from 'react'
import { Button, View } from 'react-native'
import { useWalletConnect } from '@/src/shared/context/WalletConnectProvider'
import {
  BackgroundSafeAreaView,
  SimpleText,
} from '@/src/shared/components/template'
import QRCode from 'react-native-qrcode-svg'
import log from 'loglevel'

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
  const { session, setSession, connect } = useWalletConnect()
  const [uri, setUri] = useState<string | null>(null)
  const [waitingApproval, setWaitingApproval] = useState(false)

  const handleConnect = async () => {
    try {
      const { uri, approval } = await connect()
      if (uri) {
        setUri(uri)
        setWaitingApproval(true)

        // Ожидаем, что пользователь отсканирует QR и подтвердит
        const session = await approval()
        setSession(session)
        setWaitingApproval(false)
      }
    } catch (error) {
      log.error('Ошибка подключения:', error)
      setWaitingApproval(false)
    }
  }

  return (
    <BackgroundSafeAreaView style={{ padding: 20 }}>
      {session ? (
        <SimpleText>
          Connected to: {session?.namespaces?.eip155?.accounts[0]}
        </SimpleText>
      ) : (
        <View>
          <Button title="Connect Wallet" onPress={handleConnect} />
          {uri && (
            <View style={{ marginTop: 20 }}>
              <SimpleText>Scan this with your wallet app:</SimpleText>
              <QRCode value={uri} size={200} />
              {waitingApproval && (
                <SimpleText style={{ marginTop: 10 }}>
                  Waiting for wallet approval...
                </SimpleText>
              )}
            </View>
          )}
        </View>
      )}
    </BackgroundSafeAreaView>
  )
}
