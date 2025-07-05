import styles from '@/src/shared/styles/CurrentBalance'
import { BalanceViewProps } from '@/src/shared/components/balance-view/BalanceViewProps'
import { useTranslation } from 'react-i18next'
import { GradientBalanceView } from '@/src/shared/components/balance-view/GradientBalanceView'

/**
 * BalanceView - это функциональный компонент, который отображает текущий баланс пользователя.
 *
 * @param root0 - Объект, содержащий свойства компонента.
 * @param root0.tokenNumber - Количество токенов, отображаемое как текущий баланс.
 *
 * @returns {JSX.Element} - JSX-элемент, представляющий компонент текущего баланса.
 */
function WalletBalanceView({ tokenNumber }: BalanceViewProps): JSX.Element {
  const { t } = useTranslation()
  return (
    <GradientBalanceView
      title={t('walletScreen.currentBalance')}
      value={`${tokenNumber} ` + t('common.tokens')}
      style={styles.currentBalance}
    />
  )
}

export { WalletBalanceView }
