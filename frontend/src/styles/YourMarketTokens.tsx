import {StyleSheet} from "react-native";
import {MAIN_COLOR, TAB_COLOR, TEXT_COLOR, THIRD_TEXT_COLOR} from "@/src/constants/colors";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: TAB_COLOR,
        borderRadius: 16,
        padding: 16,
        gap: 12,
    },
    tabContainer: {
        backgroundColor: TAB_COLOR,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between', // Равномерное распределение
        gap: 8,
    },
    tabButton: {
        backgroundColor: MAIN_COLOR,
        borderRadius: 8,
        padding: 8,
        alignItems: 'center',
        flex: 1,
        width: '50%',
    },
    tabText: {
        color: THIRD_TEXT_COLOR,
        fontSize: 20,
        fontWeight: '600',
    },
    activeTabText: {
        color: TEXT_COLOR,
    },
    title: {
        color: '#7596F3',
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 12
    },
});