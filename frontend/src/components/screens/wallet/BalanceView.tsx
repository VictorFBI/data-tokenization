import {LinearGradient} from "expo-linear-gradient";
import SimpleText from "@/src/components/default-elements-overridings/SimpleText";
import MonoText from "@/src/components/default-elements-overridings/MonoText";
import styles from "@/src/styles/CurrentBalance";
import {MAIN_COLOR, SECOND_MAIN_COLOR} from "@/src/constants/colors";
import {BalanceViewProps} from "@/src/types/BalanceViewProps";

function GradientBalanceView({title, value, style}: {title: string; value: string; style: any}) {
    return (
        <LinearGradient colors={[MAIN_COLOR, SECOND_MAIN_COLOR]} style={style}>
            <SimpleText style={styles.text}>{title}</SimpleText>
            <MonoText style={styles.monospacedText}>{value}</MonoText>
        </LinearGradient>
    );
}

function BalanceView({tokenNumber}: BalanceViewProps) {
    return (
        <GradientBalanceView
            title="Current balance"
            value={`${tokenNumber} tokens`}
            style={styles.currentBalance}
        />
    );
}

function MarketBalanceView({tokenNumber}: BalanceViewProps) {
    return (
        <GradientBalanceView
            title="Currently on market you have"
            value={`${tokenNumber} tokens`}
            style={styles.currentMarketBalance}
        />
    );
}

export {BalanceView, MarketBalanceView};