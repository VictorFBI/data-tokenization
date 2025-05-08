import {BackgroundSafeAreaView} from "@/src/components/default-elements-overridings/BackgroundView";
import {MarketBalanceView} from "@/src/components/screens/wallet/BalanceView";
import {Token} from "@/src/types/Token";
import {useTokens} from "@/src/hooks/useTokens";
import {YourTokensWithSearch} from "@/src/components/screens/wallet/YourTokens";
import {YourMarketTokens} from "@/src/components/screens/market/YourMarketTokens";

export default function MarketScreen() {
    const {tokens, setFilterParams, handleAddToken} = useTokens();

    const handleSearch = (query: string) => {
        setFilterParams(prev => ({...prev, search: query}));
    };

    return (
        <BackgroundSafeAreaView>
            <MarketBalanceView tokenNumber={3}/>
            <YourMarketTokens
                marketTokensProps={
                    {
                        tokens,
                        onSearch: handleSearch,
                        onFilter: () => {/* Реализуйте фильтрацию */
                        },
                        onTokenPress: (token: Token) => {
                        },
                    }
                }
                yourTokensProps={
                    {
                        tokens,
                        onSearch: handleSearch,
                        onFilter: () => {/* Реализуйте фильтрацию */
                        },
                        onTokenPress: (token: Token) => {
                        },
                    }
                }/>
        </BackgroundSafeAreaView>
    );
}
