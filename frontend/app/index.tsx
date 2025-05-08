import {BackgroundSafeAreaView} from "@/src/components/default-elements-overridings/BackgroundView";
import {BalanceView, MarketBalanceView} from "@/src/components/screens/wallet/BalanceView";
import {SearchAndTokens} from "@/src/components/screens/wallet/SearchAndTokens";
import {Token} from "@/src/types/Token";
import {useTokens} from "@/src/hooks/useTokens";
import {WalletButtonProps} from "@/src/types/WalletButtonProps";

export default function MarketScreen() {
    const {tokens, setFilterParams, handleAddToken} = useTokens();

    const handleSearch = (query: string) => {
        setFilterParams(prev => ({...prev, search: query}));
    };

    const noFunc = () => {};
    const walletButtons: WalletButtonProps[] = [
        {iconName: 'add-circle-outline', buttonText: 'add', onPress: noFunc},
        {iconName: 'history', buttonText: 'history', onPress: noFunc},
    ];

    return (
        <BackgroundSafeAreaView>
            <MarketBalanceView tokenNumber={3}/>
            <SearchAndTokens
                tokens={tokens}
                onSearch={handleSearch}
                onFilter={() => {/* Реализуйте фильтрацию */}}
                onTokenPress={(token: Token) => {}}
            />
        </BackgroundSafeAreaView>
    );
}
