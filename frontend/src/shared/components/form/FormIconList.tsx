import { MaterialIconName } from '@/src/shared/components/template/MaterialIconName'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { MaterialIconWrapper } from '@/src/shared/components/template'
import React, { useState } from 'react'
import { ICON_SIZE } from '@/src/shared/constants/sizes'
import { findBestGapAndColumnSize } from '@/src/shared/components/form/findBestGapAndColumnSize'
import { CHOSEN_ICON_BG_COLOR } from '@/src/shared/constants/colors'

/**
 * `TouchableIconList` - это компонент, представляющий список иконок, которые можно нажимать.
 *
 * @param {Object} props - Свойства компонента.
 * @param {MaterialIconName[]} props.data - Массив данных с именами иконок.
 * @param {number} props.numColumns - Количество колонок для отображения иконок.
 * @param {number} props.gap - Расстояние между иконками.
 * @param {MaterialIconName | null} props.selectedIcon - Выбранная иконка или null, если иконка не выбрана.
 * @param {function(MaterialIconName): void} props.onIconPress - Функция-обработчик, вызываемая при нажатии на иконку.
 * @returns {JSX.Element} - Возвращает компонент `FlatList` с иконками.
 */
export function TouchableIconList(props: {
  data: MaterialIconName[]
  numColumns: number
  gap: number
  selectedIcon: MaterialIconName | null
  onIconPress: (icon: MaterialIconName) => void
}): JSX.Element {
  return (
    <FlatList
      data={props.data}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => props.onIconPress(item)}>
          <MaterialIconWrapper
            icon={item}
            style={
              props.selectedIcon === item ? styles.selectedIcon : undefined
            }
          />
        </TouchableOpacity>
      )}
      key={Math.floor(props.numColumns)}
      keyExtractor={(_, index) => index.toString()}
      numColumns={props.numColumns}
      {...(props.numColumns > 1 && {
        columnWrapperStyle: {
          gap: props.gap,
          marginBottom: 4,
        },
      })}
    />
  )
}

/**
 * Компонент списка иконок для формы.
 *
 * @param {Object} props - Свойства компонента.
 * @param {MaterialIconName[]} props.data - Массив данных с именами иконок.
 * @param {MaterialIconName | null} props.selectedIcon - Выбранная иконка или null, если иконка не выбрана.
 * @param {function(MaterialIconName): void} props.onIconPress - Функция-обработчик, вызываемая при нажатии на иконку.
 * @returns {JSX.Element} - Возвращает элемент списка иконок.
 */
export function FormIconList(props: {
  data: MaterialIconName[]
  selectedIcon: MaterialIconName | null
  onIconPress: (icon: MaterialIconName) => void
}): JSX.Element {
  const [columnNumber, setColumnNumber] = useState(0)
  const [gap, setGap] = useState(0)

  return (
    <View
      onLayout={event => {
        const { width } = event.nativeEvent.layout
        const minGap = 8
        const size = ICON_SIZE + 8
        const { bestColumnNumber, bestGap } = findBestGapAndColumnSize(
          minGap,
          size,
          width,
        )
        setColumnNumber(Math.floor(bestColumnNumber))
        setGap(bestGap)
      }}
      style={styles.iconList}
    >
      <TouchableIconList
        data={props.data}
        numColumns={columnNumber}
        gap={gap}
        selectedIcon={props.selectedIcon}
        onIconPress={props.onIconPress}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  iconList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    flexWrap: 'wrap',
  },
  selectedIcon: {
    backgroundColor: CHOSEN_ICON_BG_COLOR,
  },
})
