import { TokenOperation } from '@/src/screens/wallet/modals/TokenOperationEnum'

export const tokenOperationToLocalePath: Record<TokenOperation, string> = {
  [TokenOperation.Add]: 'walletScreen.history.tokenOperation.add',
  [TokenOperation.Purchase]: 'walletScreen.history.tokenOperation.purchase',
  [TokenOperation.Sell]: 'walletScreen.history.tokenOperation.sell',
}
