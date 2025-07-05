import React from 'react'
import { ViewStyle } from 'react-native'

export type FormComponentInputProps = {
  title: string
  component: React.ReactNode
}

export type FormComponentProps = {
  title: string
  children: React.ReactNode
  style?: ViewStyle
}
