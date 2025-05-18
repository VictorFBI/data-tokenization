import React, { useState } from 'react'
import { BalanceView } from '@/src/components/screens/wallet/BalanceView'
import { WalletButtons } from '@/src/components/screens/wallet/WalletButton'
import { BackgroundSafeAreaView } from '@/src/components/default-elements-overridings/BackgroundView'
import { Token } from '@/src/types/Token'
import { WalletButtonProps } from '@/src/types/WalletButtonProps'
import { useTokens } from '@/src/hooks/useTokens'
import { YourTokensWithSearch } from '@/src/components/screens/wallet/YourTokens'
import { AddTokenModal } from '@/src/components/screens/wallet/AddTokenModal'

/**
 * Экран WalletScreen отображает баланс пользователя и список токенов с возможностью поиска и фильтрации.
 *
 * @returns {JSX.Element} JSX-элемент, представляющий экран кошелька.
 */
export default function WalletScreen() {
  const { tokens, setFilterParams } = useTokens()
  const [isAddModalVisible, setAddModalVisible] = useState(false)

  const handleSearch = (query: string) => {
    setFilterParams(prev => ({ ...prev, search: query }))
  }

  const handleAddPress = () => {
    setAddModalVisible(true)
  }
  const handleClose = () => {
    setAddModalVisible(false)
  }

  const walletButtons: WalletButtonProps[] = [
    {
      iconName: 'add-circle-outline',
      buttonText: 'add',
      onPress: handleAddPress,
    },
    {
      iconName: 'history',
      buttonText: 'history',
      onPress: () => {},
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
      <AddTokenModal visible={isAddModalVisible} onRequestClose={handleClose} />
    </BackgroundSafeAreaView>
  )
}
