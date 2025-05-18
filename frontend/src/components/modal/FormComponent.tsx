import { FormComponentProps } from '@/src/types/FormComponentProps'
import { View, StyleSheet } from 'react-native'
import SimpleText from '@/src/components/default-elements-overridings/SimpleText'
import React from 'react'
import { TEXT_COLOR } from '@/src/constants/colors'

/**
 *
 * @param root0
 * @param root0.title
 * @param root0.children
 * @param root0.style
 */
export function FormComponent({ title, children, style }: FormComponentProps) {
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
