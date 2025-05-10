import { Tabs } from 'expo-router'
import TabBar from '@/src/navigation/TabBar'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs/lib/typescript/src'
import useLoadFonts from '@/src/utils/useLoadFonts'

/**
 * Компонент Layout отвечает за настройку и отображение вкладок приложения.
 *
 * @returns {JSX.Element} - Возвращает компонент Tabs с настройками экранов и пользовательской панелью вкладок.
 */
export default function Layout() {
  const fontsLoaded = useLoadFonts()

  if (!fontsLoaded) {
    return null
  }

  return (
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
    </Tabs>
  )
}
