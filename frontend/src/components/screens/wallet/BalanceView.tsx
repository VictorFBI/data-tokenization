import { LinearGradient } from 'expo-linear-gradient'
import SimpleText from '@/src/components/default-elements-overridings/SimpleText'
import MonoText from '@/src/components/default-elements-overridings/MonoText'
import styles from '@/src/styles/CurrentBalance'
import { MAIN_COLOR, SECOND_MAIN_COLOR } from '@/src/constants/colors'
import { BalanceViewProps } from '@/src/types/BalanceViewProps'
import { StyleProp, ViewStyle } from 'react-native'

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
function GradientBalanceView({
  title,
  value,
  style,
}: {
  title: string
  value: string
  style: StyleProp<ViewStyle>
}) {
  return (
    <LinearGradient colors={[MAIN_COLOR, SECOND_MAIN_COLOR]} style={style}>
      <SimpleText style={styles.text}>{title}</SimpleText>
      <MonoText style={styles.monospacedText}>{value}</MonoText>
    </LinearGradient>
  )
}

/**
 * BalanceView - это функциональный компонент, который отображает текущий баланс пользователя.
 *
 * @param root0 - Объект, содержащий свойства компонента.
 * @param root0.tokenNumber - Количество токенов, отображаемое как текущий баланс.
 *
 * @returns {JSX.Element} - JSX-элемент, представляющий компонент текущего баланса.
 */
function BalanceView({ tokenNumber }: BalanceViewProps) {
  return (
    <GradientBalanceView
      title="Current balance"
      value={`${tokenNumber} tokens`}
      style={styles.currentBalance}
    />
  )
}

/**
 * MarketBalanceView - это функциональный компонент, который отображает баланс пользователя, доступный на рынке.
 *
 * @param root0 - Объект, содержащий свойства компонента.
 * @param root0.tokenNumber - Количество токенов, отображаемое как рыночный баланс.
 *
 * @returns {JSX.Element} - JSX-элемент, представляющий компонент рыночного баланса.
 */
function MarketBalanceView({ tokenNumber }: BalanceViewProps) {
  return (
    <GradientBalanceView
      title="Currently on market you have"
      value={`${tokenNumber} tokens`}
      style={styles.currentMarketBalance}
    />
  )
}

export { BalanceView, MarketBalanceView }
