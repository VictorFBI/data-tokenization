import { useCallback, useState } from 'react'
import { TextInput, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { ICON_COLOR, THIRD_TEXT_COLOR } from '@/src/constants/colors'
import { SearchTokensParams } from '@/src/types/SearchTokensProps'
import { styles } from '@/src/styles/SearchTokens'
import { useTranslation } from 'react-i18next'

/**
 * SearchTokens - это компонент, который отображает строку поиска и иконки для фильтрации и меню.
 *
 * @param props - объект, содержащий свойства компонента.
 * @param props.onSearch - функция, вызываемая при изменении текста в поле поиска.
 * @param props.onFilter - функция, вызываемая при нажатии на иконку фильтрации.
 *
 * @returns {JSX.Element} - возвращает элемент View со строкой поиска и иконками.
 */
export function SearchTokens(props: SearchTokensParams): JSX.Element {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query)
      props.onSearch(query)
    },
    [props],
  )

  return (
    <View style={styles.searchBar}>
      <MaterialIcons name="search" size={20} color={ICON_COLOR} />
      <TextInput
        style={styles.searchInput}
        placeholder={t('common.searchTokens')}
        placeholderTextColor={THIRD_TEXT_COLOR}
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <View style={styles.iconsGroup}>
        <MaterialIcons
          name="filter-list-alt"
          size={20}
          color={ICON_COLOR}
          style={styles.iconSpacing}
          onPress={props.onFilter}
        />
        <MaterialIcons name="menu" size={20} color={ICON_COLOR} />
      </View>
    </View>
  )
}
