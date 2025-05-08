import { MaterialIconName } from '@/src/types/MaterialIconName'
import { View } from 'react-native'
import { styles } from '@/src/styles/IconWrapper'
import { MaterialIcons } from '@expo/vector-icons'
import { ICON_COLOR } from '@/src/constants/colors'
import { ICON_SIZE } from '@/src/constants/sizes'

/**
 * MaterialIconWrapper - это компонент, который отображает иконку Material Icons в особенном стиле приложения.
 *
 * @param root0 - объект, содержащий свойства компонента.
 * @param root0.icon - название иконки, отображаемой в компоненте.
 *
 * @returns {JSX.Element} - возвращает элемент View с иконкой Material Icons.
 */
export function MaterialIconWrapper({
  icon,
}: {
  icon: MaterialIconName
}): JSX.Element {
  return (
    <View style={styles.iconWrapper}>
      <MaterialIcons name={icon} size={ICON_SIZE} color={ICON_COLOR} />
    </View>
  )
}
