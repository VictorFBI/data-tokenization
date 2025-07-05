import { HistoryItem } from '@/src/screens/wallet/modals/HistoryItem'
import {
  isThisMonth,
  isThisWeek,
  isToday,
  isYesterday,
  subMonths,
} from 'date-fns'
import { DateCategory } from '@/src/screens/wallet/modals/DateCategoryEnum'

/**
 * Функция `groupByDateCategory` группирует элементы массива `data` по категориям дат.
 * Категории включают: "Сегодня", "Вчера", "На прошлой неделе", "В прошлом месяце", "Ранее" и "Позже".
 * Элементы сортируются по убыванию даты перед группировкой.
 *
 * @param data - Массив объектов типа `HistoryItem`, содержащих информацию с датами.
 * @returns Объект, где ключи - это категории дат, а значения - массивы элементов, относящихся к этим категориям.
 */
export function groupByDateCategory(
  data: HistoryItem[],
): Record<DateCategory, HistoryItem[]> {
  const now = new Date()

  return data
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .reduce(
      (groups, item) => {
        const itemDate = new Date(item.date)

        let category: DateCategory = DateCategory.Later
        if (isToday(itemDate)) {
          category = DateCategory.Today
        } else if (isYesterday(itemDate)) {
          category = DateCategory.Yesterday
        } else if (isThisWeek(itemDate)) {
          category = DateCategory.LastWeek
        } else if (isThisMonth(itemDate)) {
          category = DateCategory.LastMonth
        } else if (itemDate < subMonths(now, 1)) {
          category = DateCategory.Earlier
        }

        if (!groups[category]) {
          groups[category] = []
        }
        groups[category].push(item)

        return groups
      },
      {} as Record<DateCategory, HistoryItem[]>,
    )
}
