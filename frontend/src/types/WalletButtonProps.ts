import {MaterialIconName} from "@/src/types/MaterialIconName";

export interface WalletButtonProps {
    iconName: MaterialIconName;
    buttonText: string;
    onPress: () => void;
}