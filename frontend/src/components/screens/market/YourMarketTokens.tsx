import { View, TouchableOpacity } from 'react-native'
import { TokensData } from '@/src/components/tokens-data/TokensData'
import { TokensDataProps } from '@/src/types/TokensDataProps'
import { SearchTokensParams } from '@/src/types/SearchTokensProps'
import { SearchTokens } from '@/src/components/tokens-data/SearchTokens'
import SimpleText from '@/src/components/default-elements-overridings/SimpleText'
import { useState } from 'react'
import { Token } from '@/src/types/Token'
import { styles } from '@/src/styles/YourMarketTokens'
import { useTranslation } from 'react-i18next'

type TabType = 'yourTokens' | 'market'

type TokensScreenProps = {
  yourTokensProps: TokensDataProps & SearchTokensParams
  marketTokensProps: TokensDataProps & SearchTokensParams
}

/**
 * Компонент TokensWithSearch отвечает за отображение списка токенов с возможностью поиска и фильтрации.
 *
 * @param props - объект, содержащий свойства компонента.
 * @param props.onSearch – функция, вызываемая при изменении текста в поле поиска.
 * @param props.onFilter – функция, вызываемая при нажатии на иконку фильтрации.
 * @param props.tokens – массив токенов, которые необходимо отобразить.
 * @param props.onTokenPress – функция-обработчик, вызываемая при нажатии на токен.
 *
 * @returns {JSX.Element} - возвращает элемент, содержащий поле поиска и список токенов.
 */
function TokensWithSearch(props: {
  onSearch: (query: string) => void
  onFilter: () => void
  tokens: Token[]
  onTokenPress: (token: Token) => void
}): JSX.Element {
  return (
    <>
      <SearchTokens onSearch={props.onSearch} onFilter={props.onFilter} />
      <TokensData tokens={props.tokens} onTokenPress={props.onTokenPress} />
    </>
  )
}

export const YourMarketTokens = ({
  yourTokensProps,
  marketTokensProps,
}: TokensScreenProps) => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<TabType>('yourTokens')

  const tabContentMap = {
    market: (
      <TokensWithSearch
        onSearch={marketTokensProps.onSearch}
        onFilter={marketTokensProps.onFilter}
        tokens={marketTokensProps.tokens}
        onTokenPress={marketTokensProps.onTokenPress}
      />
    ),
    yourTokens: (
      <TokensWithSearch
        onSearch={yourTokensProps.onSearch}
        onFilter={yourTokensProps.onFilter}
        tokens={yourTokensProps.tokens}
        onTokenPress={yourTokensProps.onTokenPress}
      />
    ),
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TabButton
          isActive={activeTab === 'yourTokens'}
          onPress={() => setActiveTab('yourTokens')}
          label={t('marketScreen.yourTokens')}
        />
        <TabButton
          isActive={activeTab === 'market'}
          onPress={() => setActiveTab('market')}
          label={t('marketScreen.market')}
        />
      </View>

      {tabContentMap[activeTab]}
    </View>
  )
}

type TabButtonProps = {
  isActive: boolean
  onPress: () => void
  label: string
}

const TabButton = ({ isActive, onPress, label }: TabButtonProps) => {
  return (
    <TouchableOpacity style={[styles.tabButton]} onPress={onPress}>
      <SimpleText style={[styles.tabText, isActive && styles.activeTabText]}>
        {label}
      </SimpleText>
    </TouchableOpacity>
  )
}
