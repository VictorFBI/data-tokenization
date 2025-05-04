import {Token} from "@/src/types/Token";
import {useCallback} from "react";
import {FlatList, TouchableOpacity, View} from "react-native";
import MonoText from "@/src/components/default-elements-overridings/MonoText";
import {styles} from "@/src/styles/TokensData";
import {TokensDataProps} from "@/src/types/TokensDataProps";
import {MaterialIconWrapper} from "@/src/components/default-elements-overridings/MaterialIconWrapper";

export function TokensData({tokens, onTokenPress}: TokensDataProps) {
    const renderItem = useCallback(({item}: { item: Token }) => (
        <View style={styles.tokenContainer}>
            <TouchableOpacity style={styles.tokenContent} onPress={() => onTokenPress(item)}>
                <MaterialIconWrapper icon={item.icon}/>
                <MonoText style={styles.tokenName}>{item.name}</MonoText>
            </TouchableOpacity>
            <View style={styles.divider}/>
        </View>
    ), [onTokenPress]);

    return (
        <FlatList
            data={tokens}
            extraData={tokens}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    );
}

