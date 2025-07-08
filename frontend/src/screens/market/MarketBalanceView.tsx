import { BalanceViewProps } from '@/src/shared/components/balance-view/BalanceViewProps'
import { useTranslation } from 'react-i18next'
import { GradientBalanceView } from '@/src/shared/components/balance-view/GradientBalanceView'
import styles from '@/src/shared/styles/CurrentBalance'

/**
 * MarketBalanceView - это функциональный компонент, который отображает баланс пользователя, доступный на рынке.
 *
 * @param root0 - Объект, содержащий свойства компонента.
 * @param root0.tokenNumber - Количество токенов, отображаемое как рыночный баланс.
 *
 * @returns {JSX.Element} - JSX-элемент, представляющий компонент рыночного баланса.
 */
function MarketBalanceView({ tokenNumber }: BalanceViewProps): JSX.Element {
  const { t } = useTranslation()
  return (
    <GradientBalanceView
      title={t('marketScreen.currentMarketBalance')}
      value={`${tokenNumber} ` + t('common.tokens')}
      style={styles.currentMarketBalance}
    />
  )
}

export { MarketBalanceView }
