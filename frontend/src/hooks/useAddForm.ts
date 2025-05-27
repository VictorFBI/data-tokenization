import { useState } from 'react'
import { MaterialIconName } from '@/src/types/MaterialIconName'
import { DocumentPickerResponse } from 'react-native-document-picker'
import { useWalletConnect } from '@/src/context/WalletConnectProvider'
import log from 'loglevel'

export const useAddForm = () => {
  // 1) Берём из контекста то, что нам нужно
  const { session, connect } = useWalletConnect()

  const [tokenName, setTokenName] = useState('')
  const [tokenDescription, setTokenDescription] = useState('')
  const [tokenIcon, setTokenIcon] = useState<MaterialIconName | null>(null)
  const [tokenFile, setTokenFile] = useState<DocumentPickerResponse | null>(
    null,
  )

  const nullifyForm = () => {
    setTokenName('')
    setTokenDescription('')
    setTokenIcon(null)
    setTokenFile(null)
  }

  const makeForm = async () => {
    // 2) Если ещё не подключены — запрашиваем
    log.info('1')
    let currentSession = session
    log.info('2')
    log.info('currentSession', currentSession)
    if (!currentSession) {
      log.info('3')
      const { approval } = await connect()
      log.info('4')
      currentSession = await approval()
    }
    log.info('5')

    // 3) Извлекаем адрес из сессии
    const account = currentSession.namespaces.eip155.accounts[0] // например "eip155:5:0x1234..."
    log.info('6')
    const [, , ethAddress] = account.split(':') // берём только "0x1234..."
    log.info('7')

    if (!tokenName || !tokenFile || !tokenIcon) {
      return
    }

    const formData = new FormData()
    formData.append('user_id', '12345')
    formData.append('name', tokenName)
    formData.append('file', {
      uri: tokenFile.uri,
      name: tokenFile.name,
      type: tokenFile.type || 'application/octet-stream',
    } as never)
    formData.append('type', tokenIcon)
    formData.append('eth_public_key', ethAddress)
    formData.append('tokenIcon', tokenIcon)
    formData.append('tokenDescription', tokenDescription)
    return formData
  }

  return {
    tokenName,
    setTokenName,
    tokenDescription,
    setTokenDescription,
    tokenIcon,
    setTokenIcon,
    tokenFile,
    setTokenFile,
    nullifyForm,
    makeForm,
  }
}
