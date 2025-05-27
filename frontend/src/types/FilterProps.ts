import { MaterialIconName } from '@/src/types/MaterialIconName'

export type FilterProps = {
  search?: string
  sort: 'asc' | 'desc' | null
  userID?: string
  startDate: Date | null
  endDate: Date | null
  icon: MaterialIconName | null
}
