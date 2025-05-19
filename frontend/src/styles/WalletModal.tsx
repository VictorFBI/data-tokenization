import { StyleSheet } from 'react-native'
import {
  DIVIDER_COLOR,
  TEXT_COLOR,
  THIRD_TEXT_COLOR,
} from '@/src/constants/colors'

export const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 24,
    fontWeight: '500',
    color: THIRD_TEXT_COLOR,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    paddingTop: 12,
  },
})

export const historyStyle = StyleSheet.create({
  dateText: {
    fontSize: 24,
    fontWeight: '500',
    color: THIRD_TEXT_COLOR,
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
    gap: 4,
  },
  divider: {
    height: 1,
    backgroundColor: DIVIDER_COLOR,
    marginTop: 6,
  },
})
