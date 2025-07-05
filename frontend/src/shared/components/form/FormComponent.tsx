import { FormComponentProps } from '@/src/shared/components/form/FormComponentProps'
import { View, StyleSheet } from 'react-native'
import { SimpleText } from '@/src/shared/components/template'
import React from 'react'
import { TEXT_COLOR } from '@/src/shared/constants/colors'

/**
 * FormComponent - это компонент, который отображает заголовок формы и её содержимое.
 *
 * @param props - объект, содержащий свойства компонента.
 * @param props.title - заголовок формы.
 * @param props.children - дочерние элементы, которые будут отображаться внутри формы.
 * @param props.style - дополнительные стили для контейнера формы.
 * @returns {JSX.Element} - возвращает элемент View с заголовком и дочерними элементами.
 */
export function FormComponent({
  title,
  children,
  style,
}: FormComponentProps): JSX.Element {
  return (
    <View style={[styles.container, style]}>
      <SimpleText style={styles.title}>{title}</SimpleText>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  title: {
    color: TEXT_COLOR,
    fontSize: 16,
  },
})
