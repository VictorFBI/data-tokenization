import { View, Text } from 'react-native';

export default function WalletScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: '#0e1625', padding: 20 }}>
            <Text style={{ fontSize: 24, color: '#fff' }}>Current balance: 5 tokens</Text>
        </View>
    );
}
