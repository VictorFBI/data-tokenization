import { MaterialIconName } from '@/src/shared/components/template/MaterialIconName'
import { TokenOperation } from '@/src/screens/wallet/modals/TokenOperationEnum'

export type HistoryItem = {
  date: string
  operation: TokenOperation
  tokenName: string
  tokenIcon: MaterialIconName
}
