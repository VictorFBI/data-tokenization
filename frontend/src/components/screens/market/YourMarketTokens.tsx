import { View, TouchableOpacity, StyleSheet } from "react-native";
import { TokensData } from "@/src/components/tokens-data/TokensData";
import { TokensDataProps } from "@/src/types/TokensDataProps";
import { SearchTokensParams } from "@/src/types/SearchTokensProps";
import { SearchTokens } from "@/src/components/tokens-data/SearchTokens";
import SimpleText from "@/src/components/default-elements-overridings/SimpleText";
import { useState } from "react";
import { Token } from "@/src/types/Token";
import { styles } from "@/src/styles/YourMarketTokens";

type TabType = 'yourTokens' | 'market';

type TokensScreenProps = {
    yourTokensProps: TokensDataProps & SearchTokensParams;
    marketTokensProps: TokensDataProps & SearchTokensParams;
};

function TokensWithSearch(props: {
    onSearch: (query: string) => void,
    onFilter: () => void,
    tokens: Token[],
    onTokenPress: (token: Token) => void,
}) {
    return (
        <>
            <SearchTokens
                onSearch={props.onSearch}
                onFilter={props.onFilter}
            />
            <TokensData
                tokens={props.tokens}
                onTokenPress={props.onTokenPress}
            />
        </>
    );
}

export const YourMarketTokens = ({
                                     yourTokensProps,
                                     marketTokensProps
                                 }: TokensScreenProps) => {
    const [activeTab, setActiveTab] = useState<TabType>('yourTokens');

    const tabContentMap = {
        market: (
            <TokensWithSearch
                onSearch={marketTokensProps.onSearch}
                onFilter={marketTokensProps.onFilter}
                tokens={marketTokensProps.tokens}
                onTokenPress={marketTokensProps.onTokenPress}
            />
        ),
        yourTokens: (
            <TokensWithSearch
                onSearch={yourTokensProps.onSearch}
                onFilter={yourTokensProps.onFilter}
                tokens={yourTokensProps.tokens}
                onTokenPress={yourTokensProps.onTokenPress}
            />
        ),
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[
                        styles.tabButton,
                    ]}
                    onPress={() => setActiveTab('yourTokens')}
                >
                    <SimpleText style={[styles.tabText, activeTab === 'yourTokens' && styles.activeTabText]}>
                        Your Tokens
                    </SimpleText>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.tabButton,
                    ]}
                    onPress={() => setActiveTab('market')}
                >
                    <SimpleText style={[styles.tabText, activeTab === 'market' && styles.activeTabText]}>
                        Market
                    </SimpleText>
                </TouchableOpacity>
            </View>

            {tabContentMap[activeTab]}
        </View>
    );
};