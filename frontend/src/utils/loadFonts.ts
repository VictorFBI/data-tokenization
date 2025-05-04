import {useFonts} from "expo-font";

export default function loadFonts() {
    const [fontsLoaded] = useFonts({
        'Roboto': require('@/assets/fonts/Roboto.ttf'),
        'RobotoMono': require('@/assets/fonts/RobotoMono.ttf'),
    });
    return fontsLoaded;
}