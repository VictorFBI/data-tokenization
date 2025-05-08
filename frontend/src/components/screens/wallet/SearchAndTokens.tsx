import {Token} from "@/src/types/Token";
import {useCallback, useState} from "react";
import {StyleSheet, TextInput, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {ICON_COLOR, MAIN_COLOR, TAB_COLOR, THIRD_TEXT_COLOR} from "@/src/constants/colors";
import SimpleText from "@/src/components/default-elements-overridings/SimpleText";
import {TokensData} from "@/src/components/tokens-data/TokensData";
import {TokensDataProps} from "@/src/types/TokensDataProps";

interface SearchFilteredTokensParams {
    onSearch: (query: string) => void;
    onFilter: () => void;
}

function SearchFilteredTokens(props: SearchFilteredTokensParams) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query);
        props.onSearch(query);
    }, [props.onSearch]);

    return <View style={styles.searchBar}>
        <MaterialIcons name="search" size={20} color={ICON_COLOR}/>
        <TextInput
            style={styles.searchInput}
            placeholder="Search tokens"
            placeholderTextColor={THIRD_TEXT_COLOR}
            value={searchQuery}
            onChangeText={handleSearch}
        />
        <View style={styles.iconsGroup}>
            <MaterialIcons name="filter-list-alt" size={20} color={ICON_COLOR} style={styles.iconSpacing}
                           onPress={props.onFilter}/>
            <MaterialIcons name="menu" size={20} color={ICON_COLOR}/>
        </View>
    </View>;
}

export const SearchAndTokens = ({
                                    tokens,
                                    onTokenPress,
                                    onSearch,
                                    onFilter
                                }: TokensDataProps & SearchFilteredTokensParams
) => {
    return (
        <View style={styles.container}>
            <SimpleText style={styles.sectionTitle}>Your tokens</SimpleText>
            <SearchFilteredTokens onSearch={onSearch} onFilter={onFilter}/>
            <TokensData tokens={tokens} onTokenPress={onTokenPress}/>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: TAB_COLOR,
        borderRadius: 16,
        padding: 16,
    },
    sectionTitle: {
        color: '#7596F3',
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 12
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:
        MAIN_COLOR,
        borderRadius: 6,
        padding: 4,
        marginBottom: 12,
    },
    searchInput: {
        flex: 1,
        color: '#E0E6ED',
        marginLeft: 12,
        fontSize: 16
    },
    iconsGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8
    },
    iconSpacing: {
        marginRight: 12
    },
});