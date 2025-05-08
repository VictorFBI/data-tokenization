import {useCallback, useState} from "react";
import {TextInput, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {ICON_COLOR, THIRD_TEXT_COLOR} from "@/src/constants/colors";
import {SearchTokensParams} from "@/src/types/SearchTokensProps";
import {styles} from "@/src/styles/SearchTokens";

export function SearchTokens(props: SearchTokensParams) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query);
        props.onSearch(query);
    }, [props.onSearch]);

    return (
        <View style={styles.searchBar}>
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
        </View>
    );
}
