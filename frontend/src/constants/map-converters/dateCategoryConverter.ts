import { DateCategory } from '@/src/types/DateCategoryEnum'

export const dateCategoryToLocalePath: Record<DateCategory, string> = {
  [DateCategory.Later]: 'walletScreen.history.dateCategory.later',
  [DateCategory.Today]: 'walletScreen.history.dateCategory.today',
  [DateCategory.Yesterday]: 'walletScreen.history.dateCategory.yesterday',
  [DateCategory.LastWeek]: 'walletScreen.history.dateCategory.lastWeek',
  [DateCategory.LastMonth]: 'walletScreen.history.dateCategory.lastMonth',
  [DateCategory.Earlier]: 'walletScreen.history.dateCategory.earlier',
}
