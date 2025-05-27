import React, { useEffect, useState } from 'react'
import { Tabs } from 'expo-router'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import TabBar from '@/src/navigation/TabBar'
import useLoadFonts from '@/src/utils/general/useLoadFonts'
import { initLanguage } from '@/src/utils/general/languageManager'
import { WalletConnectProvider } from '@/src/context/WalletConnectProvider'

/**
 * Компонент Layout отвечает за настройку и отображение вкладок приложения.
 *
 * @returns {JSX.Element} - Возвращает компонент Tabs с настройками экранов и пользовательской панелью вкладок.
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
      <Tabs
        screenOptions={{ tabBarShowLabel: false, headerShown: false }}
        tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
      >
        <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
        <Tabs.Screen name="wallet" options={{ title: 'Wallet' }} />
        <Tabs.Screen name="index" options={{ title: 'Market' }} />
        <Tabs.Screen name="auth" options={{ title: 'Authorization' }} />
      </Tabs>
    </WalletConnectProvider>
  )
}
