import { StyleSheet } from 'react-native'
import { THIRD_TEXT_COLOR } from '@/src/constants/colors'

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
  formContainer: {
    gap: 12,
    paddingTop: 16,
    paddingBottom: 16,
  },
})
