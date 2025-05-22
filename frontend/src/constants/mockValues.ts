import { Token } from '@/src/types/Token'
import { HistoryItem } from '@/src/types/HistoryItem'
import { TokenOperation } from '@/src/types/TokenOperationEnum'

export const MOCK_TOKENS: Token[] = [
  { id: '1', name: 'sleep_2024_12', icon: 'bed' },
  { id: '2', name: 'fat_percent_2024_11', icon: 'pie-chart' },
  { id: '3', name: 'heart_rate_12', icon: 'favorite' },
  { id: '4', name: 'oxygen_saturation_rate', icon: 'air' },
  { id: '5', name: 'steps_in_january', icon: 'directions-walk' },
]

export const MOCK_HISTORY_DATA: HistoryItem[] = [
  {
    date: '2023-10-01',
    operation: TokenOperation.Purchase,
    tokenName: 'Bitcoin',
    tokenIcon: 'bed',
  },
  {
    date: '2025-01-02',
    operation: TokenOperation.Add,
    tokenName: 'Ethereum',
    tokenIcon: 'electric-bolt',
  },
  {
    date: '2023-10-03',
    operation: TokenOperation.Sell,
    tokenName: 'Cardano',
    tokenIcon: 'straighten',
  },
  {
    date: '2025-05-19',
    operation: TokenOperation.Add,
    tokenName: 'Litecoin',
    tokenIcon: 'directions-walk',
  },
  {
    date: '2025-05-19',
    operation: TokenOperation.Sell,
    tokenName: 'Ripple',
    tokenIcon: 'air',
  },
  {
    date: '2023-10-06',
    operation: TokenOperation.Purchase,
    tokenName: 'Polkadot',
    tokenIcon: 'favorite',
  },
  {
    date: '2023-10-07',
    operation: TokenOperation.Add,
    tokenName: 'Chainlink',
    tokenIcon: 'pie-chart',
  },
  {
    date: '2025-05-18',
    operation: TokenOperation.Sell,
    tokenName: 'Dogecoin',
    tokenIcon: 'circle',
  },
  {
    date: '2023-10-09',
    operation: TokenOperation.Purchase,
    tokenName: 'Solana',
    tokenIcon: 'bed',
  },
  {
    date: '2025-05-01',
    operation: TokenOperation.Add,
    tokenName: 'Avalanche',
    tokenIcon: 'electric-bolt',
  },
  {
    date: '2025-04-15',
    operation: TokenOperation.Sell,
    tokenName: 'Polygon',
    tokenIcon: 'straighten',
  },
]
