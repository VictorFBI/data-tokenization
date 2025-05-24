import SignClient from '@walletconnect/sign-client'

let client: SignClient | null = null

export const initWalletConnect = async () => {
  console.log('1')
  if (client) return client
  console.log('2')

  try {
    client = await SignClient.init({
      projectId: '1b5da1931dea46c628dfe7ad582448d9',
      metadata: {
        name: 'My App',
        description: 'React Native Expo + WalletConnect',
        url: 'https://github.com/VictorFBI/data-tokenization',
        icons: ['https://walletconnect.com/walletconnect-logo.png'],
      },
    })
    console.log('3')
  } catch (error) {
    console.error('Error initializing WalletConnect client:', error)
  }

  return client
}

export const getWalletConnectClient = () => {
  console.log('aaaa')
  console.log(client)
  if (!client) throw new Error('WalletConnect client is not initialized')
  console.log('bbb')
  return client
}
