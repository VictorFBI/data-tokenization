import { Tabs } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

// Define the icons for each screen
const tabIcons: Record<string, keyof typeof MaterialIcons.glyphMap> = {
    index: "store",
    wallet: "account-balance-wallet",
    profile: "account-circle",
};

// Custom Bottom Tab Bar Component
function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    return (
        <View
            style={{
                flexDirection: "row",
                backgroundColor: "#1c2a3a",
                paddingVertical: 10,
                borderTopWidth: 1,
                borderTopColor: "#2a3b4d",
            }}
        >
            {state.routes.filter(route => tabIcons[route.name]).map((route, index) => {
                const iconName = tabIcons[route.name];

                const isFocused = state.index === index;

                return (
                    <TouchableOpacity
                        key={route.name}
                        onPress={() => navigation.navigate(route.name as never)}
                        style={{ flex: 1, alignItems: "center", padding: 5 }}
                    >
                        <MaterialIcons name={iconName} size={30} color={isFocused ? "#FFFFFF" : "#7596F3"} />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default function Layout() {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
            }}
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tabs.Screen name="profile" options={{ title: "Profile" }} />
            <Tabs.Screen name="wallet" options={{ title: "Wallet" }} />
            <Tabs.Screen name="index" options={{ title: "Market" }} />
        </Tabs>
    );
}
