import React from 'react'
import { Text, TextProps } from 'react-native'
import { USUAL_FONT } from '@/src/shared/constants/fonts'

const SimpleText: React.FC<TextProps> = props => {
  return <Text {...props} style={[props.style, { fontFamily: USUAL_FONT }]} />
}

export default SimpleText
