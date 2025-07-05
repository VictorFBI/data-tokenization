import { StyleSheet } from 'react-native'
import {
  DIVIDER_COLOR,
  TEXT_COLOR,
  THIRD_TEXT_COLOR,
} from '@/src/shared/constants/colors'

export const historyStyle = StyleSheet.create({
  dateText: {
    fontSize: 24,
    fontWeight: '500',
    color: THIRD_TEXT_COLOR,
    marginBottom: 2,
  },
  tokenRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  tokenOperationRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 4,
    alignItems: 'center',
  },
  tokenText: {
    fontSize: 16,
    color: TEXT_COLOR,
  },
  historyList: {
    flex: 1,
    marginBottom: 8,
    gap: 2,
  },
  historyListByDate: {
    gap: 0,
  },
  divider: {
    height: 1,
    backgroundColor: DIVIDER_COLOR,
    marginTop: 12,
    marginBottom: 8,
  },
})
