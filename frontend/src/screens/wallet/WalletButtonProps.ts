import { MaterialIconName } from '@/src/shared/components/template/MaterialIconName'

export interface WalletButtonProps {
  iconName: MaterialIconName
  buttonText: string
  onPress: () => void
}
