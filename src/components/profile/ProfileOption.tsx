import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {ICON_BG_COLOR, ICON_COLOR, TAB_COLOR} from "@/src/constants/colors";
import {MaterialIconName} from "@/src/types/MaterialIconName";

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
            <View style={styles.iconContainer}>
                <MaterialIcons name={icon} size={22} color={ICON_COLOR}/>
            </View>
            <Text style={styles.label}>{label}</Text>
            {value && <Text style={styles.value}>{value}</Text>}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: TAB_COLOR,
        padding: 8,
        borderRadius: 16,
        marginBottom: 12,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 8,
        backgroundColor: TAB_COLOR,
    },
    iconContainer: {
        width: 30,
        borderRadius: 4,
        color: '#3A548E',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ICON_BG_COLOR,
        height: 30,
    },
    label: {
        flex: 1,
        color: '#E0E6ED',
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
