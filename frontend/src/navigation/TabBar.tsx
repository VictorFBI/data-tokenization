import { MaterialIcons } from '@expo/vector-icons'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs/lib/typescript/src'
import { TouchableOpacity, View } from 'react-native'
import { iconStyle, styles } from '@/src/styles/TabBar'
import { BackgroundView } from '@/src/components/default-elements-overridings/BackgroundView'
import { MaterialIconName } from '@/src/types/MaterialIconName'

const tabIcons: Record<string, keyof typeof MaterialIcons.glyphMap> = {
  index: 'store',
  wallet: 'account-balance-wallet',
  profile: 'account-circle',
  auth: 'circle',
}

/**
 * Компонент TabBar отвечает за отображение нижней панели навигации.
 *
 * @param root0 - объект, содержащий параметры компонента.
 * @param root0.state - текущее состояние навигации, включая маршруты и активный индекс.
 * @param root0.navigation - объект навигации, предоставляющий методы для управления маршрутами.
 *
 * @returns {JSX.Element} - возвращает элемент TabBar с кнопками для навигации между экранами.
 */
function TabBar({ state, navigation }: BottomTabBarProps): JSX.Element {
  const getTouchableIcon = (
    route: { name: string },
    iconName: MaterialIconName,
    isFocused: boolean,
  ) => {
    return (
      <TouchableOpacity
        key={route.name}
        onPress={() => navigation.navigate(route.name as never)}
        style={styles.tabButton}
      >
        <MaterialIcons
          name={iconName}
          size={iconStyle.size}
          color={isFocused ? iconStyle.focusedColor : iconStyle.unfocusedColor}
        />
      </TouchableOpacity>
    )
  }

  const getTabs = () => {
    return state.routes
      .filter((route: { name: string }) => tabIcons[route.name])
      .map((route: { name: string }, index: number) => {
        const iconName = tabIcons[route.name]
        const isFocused = state.index === index

        return getTouchableIcon(route, iconName, isFocused)
      })
  }

  return (
    <BackgroundView style={{ flex: 0 }}>
      <View style={styles.tabBar}>{getTabs()}</View>
    </BackgroundView>
  )
}

export default TabBar
