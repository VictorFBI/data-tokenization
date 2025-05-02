import {MaterialIcons} from "@expo/vector-icons";
import {Text, TouchableOpacity, View} from "react-native";
import {styles, iconStyle} from '@/src/styles/WalletButton'
import {WalletButtonProps} from "@/src/types/WalletButtonProps";

export const WalletButton = (button: WalletButtonProps) => {
    return <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={button.onPress}>
            <MaterialIcons name={button.iconName} size={iconStyle.size} color={iconStyle.color}/>
        </TouchableOpacity>
        <Text style={styles.text}>{button.buttonText}</Text>
    </View>;
}