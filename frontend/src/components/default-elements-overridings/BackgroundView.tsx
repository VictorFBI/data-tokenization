import React from 'react'
import {
  SafeAreaView,
  StyleProp,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native'
import { BG_COLOR } from '@/src/constants/colors'

/**
 * BackgroundView - это View с наложением фонового цвета.
 *
 * @param root0 - объект, содержащий свойства компонента.
 * @param root0.children - дочерние элементы, которые будут отображаться внутри компонента.
 * @param root0.style - дополнительные стили, которые будут применены к компоненту.
 *
 * @returns {JSX.Element} - возвращает элемент View с наложением фонового цвета.
 */
export function BackgroundView({
  children,
  style,
  ...props
}: ViewProps): JSX.Element {
  return (
    <View style={[{ backgroundColor: BG_COLOR, flex: 1 }, style]} {...props}>
      {children}
    </View>
  )
}

interface BackgroundSafeAreaViewProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

/**
 * BackgroundSafeAreaView - это View с наложением фонового цвета и безопасной зоной.
 *
 * @param root0 - объект, содержащий свойства компонента.
 * @param root0.children - дочерние элементы, которые будут отображаться внутри компонента.
 * @param root0.style - дополнительные стили, которые будут применены к компоненту.
 *
 * @returns {JSX.Element} - возвращает элемент View с наложением фонового цвета и безопасной зоной.
 */
export function BackgroundSafeAreaView({
  children,
  style,
}: BackgroundSafeAreaViewProps): JSX.Element {
  return (
    <View style={[{ backgroundColor: BG_COLOR, flex: 1 }, style]}>
      <SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
        {children}
      </SafeAreaView>
    </View>
  )
}
