import { Tabs } from "expo-router";
import TabBar from "@/src/navigation/TabBar";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs/lib/typescript/src";
import loadFonts from "@/src/utils/loadFonts";

export default function Layout() {
    const fontsLoaded = loadFonts();
    if (!fontsLoaded) {
        return null;
    }

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
            }}
            tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
        >
            <Tabs.Screen name="profile" options={{ title: "Profile" }} />
            <Tabs.Screen name="wallet" options={{ title: "Wallet" }} />
            <Tabs.Screen name="index" options={{ title: "Market" }} />
        </Tabs>
    );
}
