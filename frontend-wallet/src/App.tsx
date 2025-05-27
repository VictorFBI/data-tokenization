import { useState } from 'react'
import { useSyncProviders } from './hooks/useSyncProviders'
import "./App.css"
import * as ethUtil from 'ethereumjs-util'
import { encrypt, EthEncryptedData } from '@metamask/eth-sig-util'
import { Buffer } from 'buffer'

// Add type declaration for window.ethereum
declare global {
  interface Window {
    ethereum: any;
  }
}

// const ethUtil = require('ethereumjs-util');

const App = () => {
  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>()
  const [userAccount, setUserAccount] = useState<string>('')
  const providers = useSyncProviders()

  const [errorMessage, setErrorMessage] = useState('')
  const clearError = () => setErrorMessage('')
  const setError = (error: string) => setErrorMessage(error)
  const isError = !!errorMessage

  const formatAddress = (addr: string) => {
    const upperAfterLastTwo = addr.slice(0, 2) + addr.slice(2)
    return `${upperAfterLastTwo.substring(0, 5)}...${upperAfterLastTwo.substring(39)}`
  }

  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    try {
      const accounts = await providerWithInfo.provider.request({
        method: 'eth_requestAccounts'
      }) as string[]

      setSelectedWallet(providerWithInfo)
      setUserAccount(accounts?.[0])
    } catch (error) {
      console.error(error)
      const mmError: MMError = error as MMError
      setError(`Code: ${mmError.code} nError Message: ${mmError.message}`)
    }
  }


  const handleNewButtonClick = async () => {
    try {
      const userAddress = "0x81F8bAE5308e405106e74A111D305E83AEC68C79"
      // const publicKey = await window.ethereum.request({
      //   method: 'eth_getEncryptionPublicKey',
      //   params: [userAddress],
      // });

      // console.log('Public key:', publicKey);

      // const encryptedMessage = encrypt({
      //   publicKey,
      //   data: 'Hello world!',
      //   version: 'x25519-xsalsa20-poly1305',
      // });

      // console.log('Encrypted message:', JSON.stringify(encryptedMessage));


      const encryptedMessage = `{"version":"x25519-xsalsa20-poly1305","nonce":"bIU9Ugh0osEOaEbn5IKaE44xCyU3G8yY","ephemPublicKey":"tFG+qT2kcemhq9VBbwd3Ll1uWAXksQjFfEZLTNrtThA=","ciphertext":"nI5dzQtw1jmpRjcgafScHu02HJhvir3x8Apv/tqaJMSuYtqixl6CfqABvMR6GgC425FB9ekQclcmZU/f"}`

      console.log('Encrypted message:', encryptedMessage);

      const decryptedMessage = await window.ethereum.request({
        "method": "eth_decrypt",
        "params": [
          `0x${Buffer.from(encryptedMessage, "utf8").toString("hex")}`,
          userAddress
        ],
      });

      console.log('Decrypted message:', decryptedMessage);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="App">
      <button className="new-button" onClick={handleNewButtonClick}>
        Дешифровать сообщение
      </button>
      <div className="main-content">
        <h2>Wallets Detected:</h2>
        <div className="providers">
          {
            providers.length > 0 ? providers?.map((provider: EIP6963ProviderDetail) => (
              <button key={provider.info.uuid} onClick={() => handleConnect(provider)} >
                <img src={provider.info.icon} alt={provider.info.name} />
                <div>{provider.info.name}</div>
              </button>
            )) :
              <div>
                No Announced Wallet Providers
              </div>
          }
        </div>
        <hr />
        <h2>{userAccount ? "" : "No"} Wallet Selected</h2>
        {userAccount &&
          <div className="selectedWallet">
            <img src={selectedWallet?.info.icon} alt={selectedWallet?.info.name} />
            <div>{selectedWallet?.info.name}</div>
            <div>({formatAddress(userAccount)})</div>
          </div>
        }
        <div className="mmError" style={isError ? { backgroundColor: 'brown' } : {}}>
          {isError &&
            <div onClick={clearError}>
              <strong>Error:</strong> {errorMessage}
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default App