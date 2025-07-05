import { Token } from '@/src/shared/types/Token'
import { useCallback } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { styles } from '@/src/shared/styles/TokensData'
import { TokensDataProps } from '@/src/shared/components/tokens-data/TokensDataProps'
import { MonoText, MaterialIconWrapper } from '@/src/shared/components/template'

/**
 * Компонент TokensData отвечает за отображение списка токенов с возможностью обработки нажатий на них.
 *
 * @param root0 - объект, содержащий свойства компонента.
 * @param root0.tokens - массив токенов, которые необходимо отобразить.
 * @param root0.onTokenPress - функция-обработчик, вызываемая при нажатии на токен.
 *
 * @returns {JSX.Element} - возвращает элемент FlatList, отображающий список токенов.
 */
export function TokensData({
  tokens,
  onTokenPress,
}: TokensDataProps): JSX.Element {
  const renderItem = useCallback(
    ({ item }: { item: Token }) => (
      <View style={styles.tokenContainer}>
        <TouchableOpacity
          style={styles.tokenContent}
          onPress={() => onTokenPress(item)}
        >
          <MaterialIconWrapper icon={item.icon} />
          <MonoText style={styles.tokenName}>{item.name}</MonoText>
        </TouchableOpacity>
        <View style={styles.divider} />
      </View>
    ),
    [onTokenPress],
  )

  return (
    <FlatList
      data={tokens}
      extraData={tokens}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  )
}
