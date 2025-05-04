import {MAIN_COLOR, TEXT_COLOR, THIRD_TEXT_COLOR} from "@/src/constants/colors";
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: 84,
    },
    button: {
        backgroundColor: MAIN_COLOR,
        paddingVertical: 8,
        paddingHorizontal: 26,
        borderRadius: 12,
        alignItems: 'center',
    },
    text: {
        color: THIRD_TEXT_COLOR,
        marginTop: 4,
    },
});

export const iconStyle = {
    color: TEXT_COLOR,
    size: 32,
}
