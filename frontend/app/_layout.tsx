import React, { useEffect, useState } from 'react'
import { Tabs } from 'expo-router'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { Modal, View } from 'react-native'
import TabBar from '@/src/navigation/TabBar'
import useLoadFonts from '@/src/utils/general/useLoadFonts'
import { initLanguage } from '@/src/utils/general/languageManager'
import {
  WalletConnectProvider,
  useWalletConnect,
} from '@/src/context/WalletConnectProvider'
import ConnectScreen from '@/app/auth' // убедитесь, что путь верный

/**
 *
 */
export default function Layout() {
  const [isReady, setIsReady] = useState(false)
  const fontsLoaded = useLoadFonts()

  useEffect(() => {
    initLanguage().then(() => setIsReady(true))
  }, [])

  if (!fontsLoaded || !isReady) return null

  return (
    <WalletConnectProvider>
      <MainApp />
    </WalletConnectProvider>
  )
}

/**
 *
 */
function MainApp() {
  const { session } = useWalletConnect()

  return (
    <View style={{ flex: 1 }}>
      {/* Основные вкладки приложения */}
      <Tabs
        screenOptions={{ tabBarShowLabel: false, headerShown: false }}
        tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
      >
        <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
        <Tabs.Screen name="wallet" options={{ title: 'Wallet' }} />
        <Tabs.Screen name="index" options={{ title: 'Market' }} />
        {/* Убираем экран auth из табов */}
      </Tabs>

      {/* Если кошелёк не подключён, показываем модалку */}
      {!session && (
        <Modal
          visible={true}
          animationType="slide"
          transparent={false}
          presentationStyle="fullScreen"
        >
          <ConnectScreen />
        </Modal>
      )}
    </View>
  )
}
