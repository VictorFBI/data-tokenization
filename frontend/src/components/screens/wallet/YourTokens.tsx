import { View } from 'react-native'
import { TokensData } from '@/src/components/tokens-data/TokensData'
import { TokensDataProps } from '@/src/types/TokensDataProps'
import { SearchTokensParams } from '@/src/types/SearchTokensProps'
import { SearchTokens } from '@/src/components/tokens-data/SearchTokens'
import { styles } from '@/src/styles/YourTokens'
import SimpleText from '@/src/components/default-elements-overridings/SimpleText'

export const YourTokensWithSearch = (
  props: TokensDataProps & SearchTokensParams,
) => (
  <View style={styles.container}>
    <SimpleText style={styles.title}>Your tokens</SimpleText>
    <SearchTokens onSearch={props.onSearch} onFilter={props.onFilter} />
    <TokensData tokens={props.tokens} onTokenPress={props.onTokenPress} />
  </View>
)
