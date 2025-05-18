import { StyleSheet, TextInput } from 'react-native'
import { hexToRgba } from '@/src/utils/hexToRgba'
import {
  MAIN_COLOR,
  TEXT_COLOR,
  THIRD_TEXT_COLOR,
} from '@/src/constants/colors'
import React from 'react'
import { MONO_FONT } from '@/src/constants/fonts'

/**
 *
 * @param props
 * @param props.value
 * @param props.placeholder
 * @param props.onChangeText
 * @param props.multiline
 */
export function FormTextInput(props: {
  value: string
  placeholder: string
  onChangeText: (value: ((prevState: string) => string) | string) => void
  multiline?: boolean
}) {
  return (
    <TextInput
      style={styles.input}
      placeholder={props.placeholder}
      placeholderTextColor={hexToRgba(TEXT_COLOR, 0.5)}
      value={props.value}
      onChangeText={props.onChangeText}
      multiline={props.multiline}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: MAIN_COLOR,
    borderRadius: 6,
    padding: 8,
    color: TEXT_COLOR,
    fontFamily: MONO_FONT,
    fontSize: 16,
  },
})
