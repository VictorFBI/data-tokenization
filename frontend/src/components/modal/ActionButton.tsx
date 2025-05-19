import { TouchableOpacity, ViewStyle, StyleSheet } from 'react-native'
import SimpleText from '@/src/components/default-elements-overridings/SimpleText'
import { ACTION_BUTTON_COLOR, TEXT_COLOR } from '@/src/constants/colors'

/**
 * Компонент `ActionButton` представляет собой кнопку с текстом и обработчиком нажатия.
 * @param text.text
 * @param text - текст, отображаемый на кнопке
 * @param onPress - функция, вызываемая при нажатии на кнопку
 * @param style - дополнительные стили для кнопки
 * @param text.onPress
 * @param text.style
 * @returns {JSX.Element} - возвращает элемент TouchableOpacity с текстом кнопки
 */
export function ActionButton({
  text,
  onPress,
  style,
}: {
  text: string
  onPress: () => void
  style?: ViewStyle
}): JSX.Element {
  return (
    <TouchableOpacity style={[styles.actionButton, style]} onPress={onPress}>
      <SimpleText style={styles.actionButtonText}>{text}</SimpleText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  actionButton: {
    backgroundColor: ACTION_BUTTON_COLOR,
    borderRadius: 8,
    paddingVertical: 12,
    flex: 1,
    alignItems: 'center',
  },
  actionButtonText: {
    color: TEXT_COLOR,
    fontSize: 16,
  },
})
