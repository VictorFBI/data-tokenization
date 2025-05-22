import { MaterialIconName } from '@/src/types/MaterialIconName'
import { TokenOperation } from '@/src/types/TokenOperationEnum'

export type HistoryItem = {
  date: string
  operation: TokenOperation
  tokenName: string
  tokenIcon: MaterialIconName
}
