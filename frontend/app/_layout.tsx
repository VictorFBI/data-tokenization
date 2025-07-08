import { Tabs } from 'expo-router'
import TabBar from '@/src/navigation/TabBar'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs/lib/typescript/src'
import useLoadFonts from '@/src/screens/layout/useLoadFonts'
import { useEffect, useState } from 'react'
import { initLanguage } from '@/src/screens/layout/languageManager'
import { WalletConnectProvider } from '@/src/shared/context/WalletConnectProvider'
import 'react-native-get-random-values'

/**
 * Компонент Layout отвечает за настройку и отображение вкладок приложения.
 *
 * @returns {JSX.Element} - Возвращает компонент Tabs с настройками экранов и пользовательской панелью вкладок.
 */
export default function Layout() {
  const [isReady, setIsReady] = useState(false)
  useEffect(() => {
    initLanguage().then(() => setIsReady(true))
  }, [])

  const fontsLoaded = useLoadFonts()
  if (!fontsLoaded || !isReady) {
    return null
  }

  return (
    <WalletConnectProvider>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
        }}
        tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
      >
        <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
        <Tabs.Screen name="wallet" options={{ title: 'Wallet' }} />
        <Tabs.Screen name="index" options={{ title: 'Market' }} />
        {/*<Tabs.Screen name="auth" options={{ title: 'Authorization' }} />*/}
      </Tabs>
    </WalletConnectProvider>
  )
}
