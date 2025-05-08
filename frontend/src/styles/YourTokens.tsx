import { StyleSheet } from 'react-native'
import { TAB_COLOR } from '@/src/constants/colors'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: TAB_COLOR,
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  title: {
    color: '#7596F3',
    fontSize: 24,
    fontWeight: '600',
  },
})
