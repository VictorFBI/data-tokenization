import RNFS from 'react-native-fs'
import { useState } from 'react'
import { MaterialIconName } from '@/src/types/MaterialIconName'
import { DocumentPickerResponse } from 'react-native-document-picker'
import { useWalletConnect } from '@/src/context/WalletConnectProvider'
import log from 'loglevel'

export const useAddForm = () => {
  const { session, client } = useWalletConnect()

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
    // 1) проверяем сессию
    const currentSession = session
    if (!currentSession || !client) {
      log.warn('No WalletConnect session')
      return null
    }

    // 2) проверяем обязательные поля
    if (!tokenName || !tokenFile || !tokenIcon) {
      log.warn('Form is incomplete')
      return
    }

    // 3) достаём ETH-адрес
    const account = currentSession.namespaces.eip155.accounts[0]
    const [, , ethAddress] = account.split(':')
    log.info(ethAddress)
    const pubKey = await client.request({
      topic: session.topic,
      chainId: 'eip155:1',
      request: {
        method: 'eth_getEncryptionPublicKey',
        params: [ethAddress],
      },
    })
    log.info('Encryption pubkey:', pubKey)

    // 4) читаем файл через RNFS и получаем бинарную строку
    let binaryStr: string
    try {
      const path = tokenFile.uri.replace(/^file:\/\//, '')
      const exists = await RNFS.exists(path)
      if (!exists) throw new Error('RNFS path not exists')
      binaryStr = await RNFS.readFile(path, 'ascii')
      log.info('Read via RNFS:', path)
    } catch (e) {
      log.warn('RNFS failed, falling back to XHR:', e)

      try {
        const xhr = await new Promise<XMLHttpRequest>((resolve, reject) => {
          const req = new XMLHttpRequest()
          req.open('GET', tokenFile.uri)
          req.responseType = 'arraybuffer'
          req.onload = () => resolve(req)
          req.onerror = () => reject(new Error('XHR load error'))
          req.send()
        })
        const arrayBuffer = xhr.response as ArrayBuffer
        const bytes = new Uint8Array(arrayBuffer)
        let str = ''
        for (let i = 0; i < bytes.byteLength; i++) {
          str += String.fromCharCode(bytes[i])
        }
        binaryStr = str
        log.info('Read via XHR:', tokenFile.uri)
      } catch (err) {
        log.error('Both RNFS and XHR failed to read file:', err)
        return
      }
    }

    // 5) собираем FormData
    const formData = new FormData()
    formData.append('user_id', '12345')
    formData.append('name', tokenName)
    formData.append('type', tokenIcon)
    formData.append('eth_public_key', ethAddress)
    formData.append('description', tokenDescription)
    // вместо объекта file — строка с «сырыми» байтами
    formData.append('fileData', binaryStr)

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
