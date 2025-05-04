import React from 'react';
import {SafeAreaView, StyleProp, View, ViewProps, ViewStyle} from 'react-native';
import {BG_COLOR} from '@/src/constants/colors';

export function BackgroundView({children, style, ...props}: ViewProps) {
    return (
        <View style={[{backgroundColor: BG_COLOR, flex: 1}, style]} {...props}>
            {children}
        </View>
    );
}

interface BackgroundSafeAreaViewProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

export function BackgroundSafeAreaView({children, style}: BackgroundSafeAreaViewProps) {
    return (
        <View style={[{backgroundColor: BG_COLOR, flex: 1}, style]}>
            <SafeAreaView style={{flex: 1, marginHorizontal: 16}}>
                {children}
            </SafeAreaView>
        </View>
    );
}