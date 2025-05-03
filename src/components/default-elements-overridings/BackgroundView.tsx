import React from 'react';
import {SafeAreaView, View, ViewProps} from 'react-native';
import {BG_COLOR} from '@/src/constants/colors';

export function BackgroundView({children, style, ...props}: ViewProps) {
    return (
        <View style={[{backgroundColor: BG_COLOR, flex: 1}, style]} {...props}>
            {children}
        </View>
    );
}

export function BackgroundSafeAreaView({children, style, ...props}: ViewProps) {
    return (
        <View style={[{backgroundColor: BG_COLOR, flex: 1}, style]} {...props}>
            <SafeAreaView style={{flex: 1, marginHorizontal: 16}}>
                {children}
            </SafeAreaView>
        </View>
    );
}
