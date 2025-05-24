import React from 'react'
import { Text, Button } from 'react-native'
import { useWalletConnect } from '@/src/context/WalletConnectProvider'
import { BackgroundSafeAreaView } from '@/src/components/default-elements-overridings/BackgroundView'
import SimpleText from '@/src/components/default-elements-overridings/SimpleText'

/**
 *
 */
export default function ConnectScreen() {
  const { connect, session } = useWalletConnect()

  return (
    <BackgroundSafeAreaView style={{ padding: 20 }}>
      {session ? (
        <>
          <SimpleText>
            Connected to: {session?.namespaces?.eip155?.accounts[0]}
          </SimpleText>
        </>
      ) : (
        <Button title="Connect Wallet" onPress={connect} />
      )}
    </BackgroundSafeAreaView>
  )
}
