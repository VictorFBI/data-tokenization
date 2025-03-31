import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: '#0e1625', alignItems: 'center', padding: 20 }}>
            <Image source={{ uri: 'https://placekitten.com/200/200' }} style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 10 }} />
            <Text style={{ fontSize: 22, color: '#fff' }}>George</Text>
            <TouchableOpacity style={{ backgroundColor: '#1c2a3a', padding: 15, marginTop: 20, borderRadius: 5 }}>
                <Text style={{ color: '#fff' }}>Change Account</Text>
            </TouchableOpacity>
        </View>
    );
}
