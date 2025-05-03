import {LinearGradient} from "expo-linear-gradient";
import SimpleText from "@/src/components/default-elements-overridings/SimpleText";
import MonoText from "@/src/components/default-elements-overridings/MonoText";
import styles from "@/src/styles/CurrentBalance";
import {MAIN_COLOR, SECOND_MAIN_COLOR} from "@/src/constants/colors";

export default function BalanceView() {
    return <LinearGradient
        colors={[MAIN_COLOR, SECOND_MAIN_COLOR]}
        style={styles.currentBalance}
    >
        <SimpleText style={styles.text}>Current balance</SimpleText>
        <MonoText style={styles.monospacedText}>5 tokens</MonoText>
    </LinearGradient>;
}