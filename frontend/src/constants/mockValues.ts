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
    date: '2025-04-04',
    operation: TokenOperation.Add,
    tokenName: '123123',
    tokenIcon: 'circle',
  },
  {
    date: '2025-05-25',
    operation: TokenOperation.Add,
    tokenName: 'Some',
    tokenIcon: 'pie-chart',
  },
  {
    date: '2025-05-12',
    operation: TokenOperation.Add,
    tokenName: 'test1',
    tokenIcon: 'air',
  },
  {
    date: '2025-05-12',
    operation: TokenOperation.Sell,
    tokenName: 'test1',
    tokenIcon: 'air',
  },
  {
    date: '2025-05-12',
    operation: TokenOperation.Purchase,
    tokenName: 'Asdasdasd',
    tokenIcon: 'electric-bolt',
  },
  {
    date: '2025-05-28',
    operation: TokenOperation.Add,
    tokenName: 'NewToken',
    tokenIcon: 'electric-bolt',
  },
  {
    date: '2025-05-28',
    operation: TokenOperation.Add,
    tokenName: 'My_steps',
    tokenIcon: 'directions-walk',
  },
]
