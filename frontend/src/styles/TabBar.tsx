import {StyleSheet} from 'react-native';
import {TAB_BAR_ICON_COLOR, TAB_BAR_ICON_FOCUSED_COLOR} from "@/src/constants/colors";

export const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        bottom: 20,
        marginHorizontal: 60,
        backgroundColor: '#283962',
        borderRadius: 24,
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        padding: 8,
    },
    tabButton: {
        padding: 10
    },
});

export const iconStyle = {
    size: 30,
    focusedColor: TAB_BAR_ICON_FOCUSED_COLOR,
    unfocusedColor: TAB_BAR_ICON_COLOR,
}