import log from 'loglevel'
// eslint-disable-next-line import/no-named-as-default
import SignClient from '@walletconnect/sign-client'

log.setLevel(__DEV__ ? 'debug' : 'info')

// Тип клиента — то, что возвращает SignClient.init()
export type WalletConnectClient = Awaited<ReturnType<typeof SignClient.init>>

let client: WalletConnectClient | null = null

/**
 * Инициализация WalletConnect client.
 * Для конфигурируемости загружает projectId из переменной окружения.
 * Убедитесь, что в .env прописано:
 *   WALLETCONNECT_PROJECT_ID=your_project_id_here
 */
export const initWalletConnect =
  async (): Promise<WalletConnectClient | null> => {
    if (client) {
      log.debug('WalletConnect client already initialized')
      return client
    }

    try {
      log.debug('Initializing WalletConnect client')
      log.debug(process.env.EXPO_PUBLIC_WALLETCONNECT_PROJECT_ID)
      client = await SignClient.init({
        projectId: process.env.EXPO_PUBLIC_WALLETCONNECT_PROJECT_ID,
        metadata: {
          name: 'My App',
          description: 'React Native Expo + WalletConnect',
          url: 'https://github.com/VictorFBI/data-tokenization',
          icons: ['https://walletconnect.com/walletconnect-logo.png'],
        },
      })
      log.debug('WalletConnect client initialized')
    } catch (error) {
      log.error('Error initializing WalletConnect client:', error)
    }

    return client
  }

export const getWalletConnectClient = (): WalletConnectClient => {
  if (!client) {
    log.error('WalletConnect client is not initialized')
    throw new Error('WalletConnect client is not initialized')
  }
  return client
}
