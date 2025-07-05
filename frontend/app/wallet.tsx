import React, { useState } from 'react'
import { WalletBalanceView } from '@/src/screens/wallet/WalletBalanceView'
import { WalletButtons } from '@/src/screens/wallet/WalletButton'
import { BackgroundSafeAreaView } from '@/src/shared/components/template'
import { Token } from '@/src/shared/types/Token'
import { WalletButtonProps } from '@/src/screens/wallet/WalletButtonProps'
import { useTokens } from '@/src/shared/hooks/useTokens'
import { YourTokensWithSearch } from '@/src/screens/wallet/YourTokens'
import { AddTokenModal } from '@/src/screens/wallet/modals/AddTokenModal'
import { HistoryModal } from '@/src/screens/wallet/modals/HistoryModal'
import { useTranslation } from 'react-i18next'
import { TokenDetailsModal } from '@/src/screens/wallet/TokenDetailsModal'

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
  const [selectedToken, setSelectedToken] = useState<Token | null>(null)
  const [isDetailsModalVisible, setDetailsModalVisible] = useState(false)

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
      <WalletBalanceView tokenNumber={tokens.length} />
      <WalletButtons walletButtons={walletButtons} />
      <YourTokensWithSearch
        tokens={tokens}
        onSearch={handleSearch}
        onFilter={() => {}}
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
    </BackgroundSafeAreaView>
  )
}
