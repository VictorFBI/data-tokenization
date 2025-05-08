import { StyleSheet } from 'react-native'
import { MAIN_COLOR } from '@/src/constants/colors'

export const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: MAIN_COLOR,
    borderRadius: 6,
    padding: 4,
  },
  searchInput: {
    flex: 1,
    color: '#E0E6ED',
    marginLeft: 12,
    fontSize: 16,
  },
  iconsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  iconSpacing: {
    marginRight: 12,
  },
})
