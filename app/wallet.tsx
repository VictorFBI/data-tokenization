import {View, SafeAreaView, StyleSheet, TextInput, Text, FlatList} from 'react-native';
import BalanceView from '@/src/components/wallet/BalanceView';
import {WalletButton} from "@/src/components/wallet/WalletButton";
import {BackgroundView} from "@/src/components/default-elements-overridings/BackgroundView";
import {
    ICON_BG_COLOR,
    ICON_COLOR,
    MAIN_COLOR,
    TAB_COLOR,
    TEXT_COLOR,
    THIRD_TEXT_COLOR
} from "@/src/constants/colors";
import {MaterialIcons} from "@expo/vector-icons";
import {useState} from "react";
import SimpleText from "@/src/components/default-elements-overridings/SimpleText";
import MonoText from "@/src/components/default-elements-overridings/MonoText";
import {MOCK_TOKENS} from "@/src/constants/mock-values";
import {Token} from "@/src/types/Token";
import {WalletButtonProps} from "@/src/types/WalletButtonProps";

const WalletButtons = () => {
    const noFunc = () => {
    };
    const walletButtons: WalletButtonProps[] = [
        {iconName: 'add-circle-outline', buttonText: 'add', onPress: noFunc},
        {iconName: 'history', buttonText: 'history', onPress: noFunc},
    ];

    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10}}>
            {walletButtons.map((button) => (
                <WalletButton iconName={button.iconName} buttonText={button.buttonText} onPress={button.onPress}/>
            ))}
        </View>
    );
};

const SearchAndTokens = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const renderItem = ({item}: { item: Token }) => (
        <View style={styles.tokenContainer}>
            <View style={styles.tokenContent}>
                <View style={styles.iconWrapper}>
                    <MaterialIcons name={item.icon} size={20} color={ICON_COLOR}/>
                </View>
                <MonoText style={styles.tokenName}>{item.name}</MonoText>
            </View>
            <View style={styles.divider}/>
        </View>
    );

    return (
        <View style={{backgroundColor: TAB_COLOR, borderRadius: 16, padding: 16}}>
            <SimpleText style={styles.sectionTitle}>Your tokens</SimpleText>

            <View style={styles.searchBar}>
                <MaterialIcons name="search" size={20} color={ICON_COLOR}/>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search tokens"
                    placeholderTextColor={THIRD_TEXT_COLOR}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <View style={styles.iconsGroup}>
                    <MaterialIcons name="filter-list-alt" size={20} color={ICON_COLOR} style={styles.iconSpacing}/>
                    <MaterialIcons name="menu" size={20} color={ICON_COLOR}/>
                </View>
            </View>

            <FlatList
                data={MOCK_TOKENS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

export default function WalletScreen() {
    return (
        <BackgroundView>
            <SafeAreaView style={{flex: 1, padding: 20, marginHorizontal: 16}}>
                <BalanceView/>
                <WalletButtons/>
                <SearchAndTokens/>
            </SafeAreaView>
        </BackgroundView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:
            20,
        marginHorizontal:
            16
    }
    ,
    buttonsRow: {
        flexDirection: 'row',
        justifyContent:
            'space-around',
        marginBottom:
            24
    }
    ,
    sectionTitle: {
        color: '#7596F3',
        fontSize:
            24,
        fontWeight:
            '600',
        marginBottom:
            12
    }
    ,
    searchBar: {
        flexDirection: 'row',
        alignItems:
            'center',
        backgroundColor:
        MAIN_COLOR,
        borderRadius:
            6,
        padding:
            4,
        marginBottom:
            12,
    }
    ,
    searchInput: {
        flex: 1,
        color:
            '#E0E6ED',
        marginLeft:
            12,
        fontSize:
            16
    }
    ,
    iconsGroup: {
        flexDirection: 'row',
        alignItems:
            'center',
        marginLeft:
            8
    }
    ,
    iconSpacing: {
        marginRight: 12
    }
    ,
    tokenContainer: {
        marginBottom: 6
    }
    ,
    tokenContent: {
        flexDirection: 'row',
        alignItems:
            'center',
    }
    ,
    iconWrapper: {
        backgroundColor: ICON_BG_COLOR,
        borderRadius:
            8,
        padding:
            8,
        justifyContent:
            'center',
        alignItems:
            'center',
        marginRight:
            8
    }
    ,
    tokenName: {
        color: TEXT_COLOR,
        fontSize:
            16,
    }
    ,
    divider: {
        height: 1,
        backgroundColor:
            '#3A548E',
        marginTop:
            6
    }
});