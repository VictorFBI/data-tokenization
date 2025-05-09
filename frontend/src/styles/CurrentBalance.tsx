import { StyleSheet } from 'react-native'
import { SECOND_TEXT_COLOR, TEXT_COLOR } from '@/src/constants/colors'

const styles = StyleSheet.create({
  currentBalance: {
    paddingHorizontal: 16,
    paddingVertical: 48,
    borderRadius: 20,
    marginBottom: 10,
  },
  currentMarketBalance: {
    backgroundColor: '#3D5AAE',
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
  },
  text: {
    color: SECOND_TEXT_COLOR,
    fontSize: 16,
  },
  monospacedText: {
    color: TEXT_COLOR,
    fontSize: 40,
    fontWeight: 'regular',
  },
})

export default styles
