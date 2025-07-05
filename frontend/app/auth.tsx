import React from 'react'
import {
  View,
  Alert,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { useWalletConnect } from '@/src/context/WalletConnectProvider'
import { BackgroundSafeAreaView } from '@/src/components/default-elements-overridings/BackgroundView'
import MonoText from '@/src/components/default-elements-overridings/MonoText'
import {
  MAIN_COLOR,
  SECOND_TEXT_COLOR,
  TEXT_COLOR,
} from '@/src/constants/colors'

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
  const { connect, session } = useWalletConnect()
  const [uri, setUri] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (session) {
      Alert.alert('Wallet Connected', session.namespaces.eip155.accounts[0])
      setUri(null)
    }
  }, [session])

  const handleConnect = async () => {
    try {
      const newUri = await connect()
      setUri(newUri)
    } catch (err) {
      Alert.alert('Ошибка', 'Не удалось подключить кошелек')
    }
  }

  const handleLinking = async () => {
    if (uri) {
      try {
        await Linking.openURL(uri)
      } catch (error) {
        Alert.alert('Ошибка', 'Не удалось открыть ссылку')
      }
    } else {
      Alert.alert('Ошибка', 'Нет ссылки для открытия')
    }
  }

  return (
    <BackgroundSafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <MonoText style={styles.title}>Tokenator</MonoText>

        {uri ? (
          <>
            <TouchableOpacity onPress={handleLinking}>
              <MonoText style={styles.linkText}>Перейти по ссылке</MonoText>
            </TouchableOpacity>
            <View style={styles.qrWrapper}>
              <QRCode value={uri} size={200} />
            </View>
          </>
        ) : (
          <TouchableOpacity onPress={handleConnect}>
            <MonoText style={styles.linkText}>Подключить кошелёк</MonoText>
          </TouchableOpacity>
        )}
      </View>
    </BackgroundSafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 28,
    color: TEXT_COLOR,
    marginBottom: 24,
  },
  linkText: {
    fontSize: 28,
    color: SECOND_TEXT_COLOR,
    marginBottom: 24,
  },
  qrWrapper: {
    borderWidth: 8,
    borderColor: MAIN_COLOR,
    borderRadius: 8,
  },
  linkButton: {
    marginTop: 24,
  },
})
