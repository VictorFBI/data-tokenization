import {MaterialIconName} from "@/src/types/MaterialIconName";
import {View} from "react-native";
import {styles} from "@/src/styles/IconWrapper";
import {MaterialIcons} from "@expo/vector-icons";
import {ICON_COLOR} from "@/src/constants/colors";
import {ICON_SIZE} from "@/src/constants/sizes";

export function MaterialIconWrapper({icon}: { icon: MaterialIconName }) {
    return <View style={styles.iconWrapper}>
        <MaterialIcons name={icon} size={ICON_SIZE} color={ICON_COLOR}/>
    </View>;
}