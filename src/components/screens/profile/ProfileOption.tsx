import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {DIVIDER_COLOR, ICON_BG_COLOR, ICON_COLOR, TAB_COLOR, TEXT_COLOR} from "@/src/constants/colors";
import {MaterialIconName} from "@/src/types/MaterialIconName";
import {MaterialIconWrapper} from "@/src/components/default-elements-overridings/MaterialIconWrapper";

export interface OptionProps {
    icon: MaterialIconName;
    label: string;
    value?: string;
    onPress?: () => void;
}

interface OptionsProps {
    options: OptionProps[];
}

export default function Options({ options }: OptionsProps) {
    return (
        <View style={styles.card}>
            {options.map((option, index) => (
                <ProfileOption
                    key={index}
                    icon={option.icon}
                    label={option.label}
                    value={option.value}
                    onPress={option.onPress}
                />
            ))}
        </View>
    );
}

function ProfileOption({icon, label, value, onPress}: OptionProps) {
    return (
        <TouchableOpacity style={styles.option} onPress={onPress}>
            <MaterialIconWrapper icon={icon}/>
            <Text style={styles.label}>{label}</Text>
            {value && <Text style={styles.value}>{value}</Text>}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: TAB_COLOR,
        padding: 16,
        borderRadius: 16,
        gap: 8,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: TAB_COLOR,
    },
    iconContainer: {
        padding: 4,
        borderRadius: 4,
        color: DIVIDER_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ICON_BG_COLOR,
    },
    label: {
        flex: 1,
        color: TEXT_COLOR,
        fontSize: 16,
        marginLeft: 10,
        fontFamily: 'monospace',
    },
    value: {
        fontSize: 16,
        color: '#929EB5',
        fontFamily: 'monospace',
    },
});
