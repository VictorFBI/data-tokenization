import { StyleSheet, TextInput } from 'react-native'
import { hexToRgba } from '@/src/utils/hexToRgba'
import { MAIN_COLOR, TEXT_COLOR } from '@/src/constants/colors'
import React from 'react'
import { MONO_FONT } from '@/src/constants/fonts'

/**
 * `FormTextInput` - это компонент текстового поля ввода, который позволяет пользователю вводить текст.
 *
 * @param {Object} props - Свойства, передаваемые в компонент.
 * @param {string} props.value - Текущее значение текстового поля.
 * @param {string} props.placeholder - Текст-заполнитель, отображаемый, когда поле пустое.
 * @param {(function|string)} props.onChangeText - Функция для обработки изменения текста, вызываемая при вводе.
 * @param {boolean} [props.multiline=false] - Необязательный параметр. Определяет, поддерживает ли поле ввод текста в несколько строк.
 * @returns {JSX.Element} - Возвращает компонент `TextInput`, стилизованный для приложения.
 */
export function FormTextInput(props: {
  value: string
  placeholder: string
  onChangeText: (value: ((prevState: string) => string) | string) => void
  multiline?: boolean
}): JSX.Element {
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
