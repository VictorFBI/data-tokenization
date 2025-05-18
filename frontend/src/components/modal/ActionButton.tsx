import { TouchableOpacity, ViewStyle, StyleSheet } from 'react-native'
import SimpleText from '@/src/components/default-elements-overridings/SimpleText'
import { ACTION_BUTTON_COLOR, TEXT_COLOR } from '@/src/constants/colors'

/**
 *
 * @param root0
 * @param root0.text
 * @param root0.onPress
 * @param root0.style
 */
export function ActionButton({
  text,
  onPress,
  style,
}: {
  text: string
  onPress: () => void
  style?: ViewStyle
}) {
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
