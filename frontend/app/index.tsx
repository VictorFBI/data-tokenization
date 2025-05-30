import { BackgroundSafeAreaView } from '@/src/components/default-elements-overridings/BackgroundView'
import { MarketBalanceView } from '@/src/components/screens/wallet/BalanceView'
import { Token } from '@/src/types/Token'
import { useTokens } from '@/src/hooks/useTokens'
import { YourMarketTokens } from '@/src/components/screens/market/YourMarketTokens'

/**
 * Экран MarketScreen отображает баланс пользователя на рынке
 * и список токенов с возможностью поиска и фильтрации.
 *
 * @returns {JSX.Element} JSX-элемент, представляющий экран рынка.
 */
export default function MarketScreen(): JSX.Element {
  const { tokens, setFilterParams } = useTokens()

  const handleSearch = (query: string) => {
    setFilterParams(prev => ({ ...prev, search: query }))
  }

  const marketTokensProps = {
    tokens,
    onSearch: handleSearch,
    onFilter: () => {
      /* Реализуйте фильтрацию */
    },
    onTokenPress: (token: Token) => {
      void token
    },
  }
  const yourTokensProps = {
    tokens,
    onSearch: handleSearch,
    onFilter: () => {
      /* Реализуйте фильтрацию */
    },
    onTokenPress: (token: Token) => {
      void token
    },
  }
  return (
    <BackgroundSafeAreaView>
      <MarketBalanceView tokenNumber={tokens.length} />
      <YourMarketTokens
        marketTokensProps={marketTokensProps}
        yourTokensProps={yourTokensProps}
      />
    </BackgroundSafeAreaView>
  )
}
