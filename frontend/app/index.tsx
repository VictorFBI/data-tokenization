import { BackgroundSafeAreaView } from '@/src/shared/components/template'
import { Token } from '@/src/shared/types/Token'
import { useTokens } from '@/src/shared/hooks/useTokens'
import { YourMarketTokens } from '@/src/screens/market/YourMarketTokens'
import { MarketBalanceView } from '@/src/screens/market/MarketBalanceView'

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
