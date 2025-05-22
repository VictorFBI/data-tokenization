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

/**
 * Экран WalletScreen отображает баланс пользователя и список токенов с возможностью поиска и фильтрации.
 *
 * @returns {JSX.Element} JSX-элемент, представляющий экран кошелька.
 */
export default function WalletScreen() {
  const { t } = useTranslation()
  const { tokens, setFilterParams } = useTokens()
  const [isAddModalVisible, setAddModalVisible] = useState(false)
  const [isHistoryModalVisible, setHistoryModalVisible] = useState(false)

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
        onFilter={() => {}}
        onTokenPress={(token: Token) => {}}
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
    </BackgroundSafeAreaView>
  )
}
