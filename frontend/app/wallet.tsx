import React, { useState } from 'react'
import { BalanceView } from '@/src/components/screens/wallet/BalanceView'
import { WalletButtons } from '@/src/components/screens/wallet/WalletButton'
import { BackgroundSafeAreaView } from '@/src/components/default-elements-overridings/BackgroundView'
import { Token } from '@/src/types/Token'
import { WalletButtonProps } from '@/src/types/WalletButtonProps'
import { useTokens } from '@/src/hooks/useTokens'
import { YourTokensWithSearch } from '@/src/components/screens/wallet/YourTokens'
import { AddTokenModal } from '@/src/components/screens/wallet/AddTokenModal'
import { HistoryModal } from '@/src/components/screens/wallet/HistoryModal'
import { useTranslation } from 'react-i18next'
import { TokenDetailsModal } from '@/src/components/tokens-data/TokenDetailsModal'
import { FilterModal } from '@/src/components/tokens-data/FilterModal'

/**
 * Экран WalletScreen отображает баланс пользователя и список токенов с возможностью поиска и фильтрации.
 *
 * @returns {JSX.Element} JSX-элемент, представляющий экран кошелька.
 */
export default function WalletScreen() {
  const { t } = useTranslation()
  const { tokens, filterParams, setFilterParams } = useTokens()
  const [isAddModalVisible, setAddModalVisible] = useState(false)
  const [isHistoryModalVisible, setHistoryModalVisible] = useState(false)
  const [selectedToken, setSelectedToken] = useState<Token | null>(null)
  const [isDetailsModalVisible, setDetailsModalVisible] = useState(false)
  const [isFilterVisible, setFilterVisible] = useState(false)

  const handleSearch = (query: string) => {
    setFilterParams(prev => ({ ...prev, search: query }))
  }

  const walletButtons: WalletButtonProps[] = [
    {
      iconName: 'add-circle-outline',
      buttonText: t('walletScreen.add.button'),
      onPress: () => {
        setAddModalVisible(true)
      },
    },
    {
      iconName: 'history',
      buttonText: t('walletScreen.history.button'),
      onPress: () => {
        setHistoryModalVisible(true)
      },
    },
  ]

  return (
    <BackgroundSafeAreaView>
      <BalanceView tokenNumber={tokens.length} />
      <WalletButtons walletButtons={walletButtons} />
      <YourTokensWithSearch
        tokens={tokens}
        onSearch={handleSearch}
        onFilter={() => {
          setFilterVisible(!isFilterVisible)
        }}
        onTokenPress={(token: Token) => {
          setSelectedToken(token)
          setDetailsModalVisible(true)
        }}
      />
      <AddTokenModal
        visible={isAddModalVisible}
        onRequestClose={() => {
          setAddModalVisible(false)
        }}
      />
      <HistoryModal
        visible={isHistoryModalVisible}
        onRequestClose={() => {
          setHistoryModalVisible(false)
        }}
      />
      <TokenDetailsModal
        visible={isDetailsModalVisible}
        token={selectedToken}
        onRequestClose={() => setDetailsModalVisible(false)}
      />
      <FilterModal
        visible={isFilterVisible}
        onRequestClose={() => setFilterVisible(false)}
        filterProps={filterParams}
        setFilterProps={setFilterParams}
      />
    </BackgroundSafeAreaView>
  )
}
