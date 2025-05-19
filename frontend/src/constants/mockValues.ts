import { Token } from '@/src/types/Token'
import { HistoryItem } from '@/src/types/HistoryItem'

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
    operation: 'purchase',
    tokenName: 'Bitcoin',
    tokenIcon: 'bed',
  },
  {
    date: '2025-01-02',
    operation: 'add',
    tokenName: 'Ethereum',
    tokenIcon: 'electric-bolt',
  },
  {
    date: '2023-10-03',
    operation: 'sell',
    tokenName: 'Cardano',
    tokenIcon: 'straighten',
  },
  {
    date: '2025-05-19',
    operation: 'add',
    tokenName: 'Litecoin',
    tokenIcon: 'directions-walk',
  },
  {
    date: '2025-05-19',
    operation: 'sell',
    tokenName: 'Ripple',
    tokenIcon: 'air',
  },
  {
    date: '2023-10-06',
    operation: 'purchase',
    tokenName: 'Polkadot',
    tokenIcon: 'favorite',
  },
  {
    date: '2023-10-07',
    operation: 'add',
    tokenName: 'Chainlink',
    tokenIcon: 'pie-chart',
  },
  {
    date: '2025-05-18',
    operation: 'sell',
    tokenName: 'Dogecoin',
    tokenIcon: 'circle',
  },
  {
    date: '2023-10-09',
    operation: 'purchase',
    tokenName: 'Solana',
    tokenIcon: 'bed',
  },
  {
    date: '2025-05-01',
    operation: 'add',
    tokenName: 'Avalanche',
    tokenIcon: 'electric-bolt',
  },
  {
    date: '2025-04-15',
    operation: 'sell',
    tokenName: 'Polygon',
    tokenIcon: 'straighten',
  },
]
