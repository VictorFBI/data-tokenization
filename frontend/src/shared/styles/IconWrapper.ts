import { ICON_BG_COLOR } from '@/src/shared/constants/colors'
import { StyleSheet } from 'react-native'
import { ICON_SIZE } from '@/src/shared/constants/sizes'

export const styles = StyleSheet.create({
  iconWrapper: {
    backgroundColor: ICON_BG_COLOR,
    borderRadius: 4,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: ICON_SIZE + 8,
    height: ICON_SIZE + 8,
  },
})
