import { StyleSheet } from 'react-native'
import { DIVIDER_COLOR, TEXT_COLOR } from '@/src/shared/constants/colors'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginHorizontal: 16,
  },
  tokenContainer: {
    marginBottom: 6,
  },
  tokenContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tokenName: {
    color: TEXT_COLOR,
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: DIVIDER_COLOR,
    marginTop: 6,
  },
})
