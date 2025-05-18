import { MaterialIconName } from '@/src/types/MaterialIconName'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { MaterialIconWrapper } from '@/src/components/default-elements-overridings/MaterialIconWrapper'
import React, { useState } from 'react'
import { ICON_SIZE } from '@/src/constants/sizes'
import { findBestGapAndColumnSize } from '@/src/utils/findBestGapAndColumnSize'
import { CHOSEN_ICON_BG_COLOR } from '@/src/constants/colors'

/**
 *
 * @param props
 * @param props.data
 * @param props.numColumns
 * @param props.gap
 * @param props.selectedIcon
 * @param props.onIconPress
 */
export function TouchableIconList(props: {
  data: MaterialIconName[]
  numColumns: number
  gap: number
  selectedIcon: MaterialIconName | null
  onIconPress: (icon: MaterialIconName) => void
}) {
  console.log('aboba')
  console.log(props.selectedIcon)
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
 *
 * @param props
 * @param props.data
 * @param props.selectedIcon
 * @param props.onIconPress
 */
export function FormIconList(props: {
  data: MaterialIconName[]
  selectedIcon: MaterialIconName | null
  onIconPress: (icon: MaterialIconName) => void
}) {
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
