import { BalanceView } from '@/src/components/screens/wallet/BalanceView'
import { WalletButtons } from '@/src/components/screens/wallet/WalletButton'
import { BackgroundSafeAreaView } from '@/src/components/default-elements-overridings/BackgroundView'
import { Token } from '@/src/types/Token'
import { WalletButtonProps } from '@/src/types/WalletButtonProps'
import { useTokens } from '@/src/hooks/useTokens'
import { YourTokensWithSearch } from '@/src/components/screens/wallet/YourTokens'

/**
 * Экран WalletScreen отображает баланс пользователя и список токенов с возможностью поиска и фильтрации.
 *
 * @returns {JSX.Element} JSX-элемент, представляющий экран кошелька.
 */
export default function WalletScreen() {
  // TODO: добавить Modal для handleAddToken
  const { tokens, setFilterParams } = useTokens()

  const handleSearch = (query: string) => {
    setFilterParams((prev) => ({ ...prev, search: query }))
  }

  const noFunc = () => {}
  const walletButtons: WalletButtonProps[] = [
    { iconName: 'add-circle-outline', buttonText: 'add', onPress: noFunc },
    { iconName: 'history', buttonText: 'history', onPress: noFunc },
  ]

  return (
    <BackgroundSafeAreaView>
      <BalanceView tokenNumber={5} />
      <WalletButtons walletButtons={walletButtons} />
      <YourTokensWithSearch
        tokens={tokens}
        onSearch={handleSearch}
        onFilter={() => {
          /* Реализуйте фильтрацию */
        }}
        onTokenPress={(token: Token) => {
          void token
        }}
      />
    </BackgroundSafeAreaView>
  )
}
