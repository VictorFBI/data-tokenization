import { StyleProp, ViewStyle } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { MAIN_COLOR, SECOND_MAIN_COLOR } from '@/src/shared/constants/colors'
import { SimpleText, MonoText } from '@/src/shared/components/template'
import styles from '@/src/shared/styles/CurrentBalance'

/**
 * GradientBalanceView - это функциональный компонент, который отображает баланс с градиентным фоном.
 *
 * @param root0 - Объект, содержащий свойства компонента.
 * @param root0.title - Заголовок, отображаемый в компоненте баланса.
 * @param root0.value - Значение, отображаемое в компоненте баланса.
 * @param root0.style - Стиль, применяемый к контейнеру с градиентом.
 *
 * @returns {JSX.Element} - JSX-элемент, представляющий компонент с градиентным балансом.
 */
export function GradientBalanceView({
  title,
  value,
  style,
}: {
  title: string
  value: string
  style: StyleProp<ViewStyle>
}): JSX.Element {
  return (
    <LinearGradient colors={[MAIN_COLOR, SECOND_MAIN_COLOR]} style={style}>
      <SimpleText style={styles.text}>{title}</SimpleText>
      <MonoText style={styles.monospacedText}>{value}</MonoText>
    </LinearGradient>
  )
}
