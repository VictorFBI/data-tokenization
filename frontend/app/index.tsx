import React, { useEffect, useState } from 'react'
import { BackgroundSafeAreaView } from '@/src/components/default-elements-overridings/BackgroundView'
import { MarketBalanceView } from '@/src/components/screens/wallet/BalanceView'
import { YourMarketTokens } from '@/src/components/screens/market/YourMarketTokens'
import { Token } from '@/src/types/Token'
import { useTokens } from '@/src/hooks/useTokens'
import { FilterModal } from '@/src/components/tokens-data/FilterModal'
import { useTranslation } from 'react-i18next'

/**
 * Экран MarketScreen отображает баланс пользователя на рынке
 * и список токенов с возможностью поиска и фильтрации.
 *
 * @returns {JSX.Element} JSX-элемент, представляющий экран рынка.
 */
export default function MarketScreen(): JSX.Element {
  const { isLoading, filterParams, setFilterParams, refreshTokens } =
    useTokens()

  const tokens: Token[] = []
  const [isFilterVisible, setFilterVisible] = useState(false)

  // При монтировании или изменении фильтров перезагружаем
  useEffect(() => {
    refreshTokens()
  }, [refreshTokens, filterParams])

  const handleSearch = (query: string) => {
    setFilterParams(prev => ({ ...prev, search: query }))
  }

  const openFilter = () => {
    setFilterVisible(true)
  }

  const closeFilter = () => {
    setFilterVisible(false)
  }

  const handleTokenPress = (token: Token) => {
    // тут можно открыть детали рынка или форму покупки/продажи
    console.log('Market token pressed', token)
  }

  const marketTokensProps = {
    tokens,
    isLoading,
    onSearch: handleSearch,
    onFilter: openFilter,
    onTokenPress: handleTokenPress,
  }

  const yourTokensProps = {
    tokens: tokens.filter(t => /* своя логика «ваших токенов» */ true),
    isLoading,
    onSearch: handleSearch,
    onFilter: openFilter,
    onTokenPress: handleTokenPress,
  }

  return (
    <BackgroundSafeAreaView>
      <MarketBalanceView tokenNumber={tokens.length} isLoading={isLoading} />

      <YourMarketTokens
        marketTokensProps={marketTokensProps}
        yourTokensProps={yourTokensProps}
      />

      <FilterModal
        visible={isFilterVisible}
        onRequestClose={closeFilter}
        filterProps={filterParams}
        setFilterProps={setFilterParams}
      />
    </BackgroundSafeAreaView>
  )
}
