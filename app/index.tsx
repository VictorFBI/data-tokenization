import { View, Text, FlatList } from 'react-native';

const tokens = [
    { id: '1', name: 'sleep_2024_12', status: 'on market' },
    { id: '2', name: 'fat_percent_2024_11', status: 'on market' },
    { id: '3', name: 'heart_rate_12', status: 'on market' },
    { id: '4', name: 'oxygen_saturation_rate', status: 'not on market' },
    { id: '5', name: 'steps_in_january', status: 'not on market' }
];

export default function MarketScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: '#0e1625', padding: 20 }}>
            <Text style={{ fontSize: 24, color: '#fff', marginBottom: 10 }}>
                Currently on market you have 3 tokens
            </Text>
            <FlatList
                data={tokens}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ padding: 10, backgroundColor: '#1c2a3a', marginBottom: 5, borderRadius: 5 }}>
                        <Text style={{ color: '#fff' }}>{item.name}</Text>
                        <Text style={{ color: item.status === 'on market' ? '#3DD598' : '#D9534F' }}>{item.status}</Text>
                    </View>
                )}
            />
        </View>
    );
}
