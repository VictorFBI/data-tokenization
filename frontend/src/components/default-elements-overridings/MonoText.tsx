import React from 'react';
import { Text, TextProps } from 'react-native';
import { MONO_FONT } from '@/src/constants/fonts';

const MonoText: React.FC<TextProps> = (props) => {
    return <Text {...props} style={[props.style, { fontFamily: MONO_FONT }]} />;
};

export default MonoText;