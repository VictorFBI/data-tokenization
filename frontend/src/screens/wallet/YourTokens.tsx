import { View } from 'react-native'
import { TokensData } from '@/src/shared/components/tokens-data/TokensData'
import { TokensDataProps } from '@/src/shared/components/tokens-data/TokensDataProps'
import { SearchTokensParams } from '@/src/shared/components/tokens-data/SearchTokensProps'
import { SearchTokens } from '@/src/shared/components/tokens-data/SearchTokens'
import { styles } from '@/src/shared/styles/YourTokens'
import { SimpleText } from '@/src/shared/components/template'
import { useTranslation } from 'react-i18next'

export const YourTokensWithSearch = (
  props: TokensDataProps & SearchTokensParams,
) => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <SimpleText style={styles.title}>
        {t('walletScreen.yourTokens')}
      </SimpleText>
      <SearchTokens onSearch={props.onSearch} onFilter={props.onFilter} />
      <TokensData tokens={props.tokens} onTokenPress={props.onTokenPress} />
    </View>
  )
}
