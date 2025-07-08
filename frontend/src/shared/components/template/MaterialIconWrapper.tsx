import { MaterialIconName } from '@/src/shared/components/template/MaterialIconName'
import { View, ViewStyle } from 'react-native'
import { styles } from '@/src/shared/styles/IconWrapper'
import { MaterialIcons } from '@expo/vector-icons'
import { ICON_COLOR } from '@/src/shared/constants/colors'
import { ICON_SIZE } from '@/src/shared/constants/sizes'

/**
 * MaterialIconWrapper - это компонент, который отображает иконку Material Icons в особенном стиле приложения.
 *
 * @param root0 - объект, содержащий свойства компонента.
 * @param root0.icon - название иконки, отображаемой в компоненте.
 *
 * @param root0.style
 * @returns {JSX.Element} - возвращает элемент View с иконкой Material Icons.
 */
export function MaterialIconWrapper({
  icon,
  style,
}: {
  icon: MaterialIconName
  style?: ViewStyle
}): JSX.Element {
  return (
    <View style={[styles.iconWrapper, style]}>
      <MaterialIcons name={icon} size={ICON_SIZE} color={ICON_COLOR} />
    </View>
  )
}
