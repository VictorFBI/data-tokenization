import { StyleSheet } from 'react-native'
import { BG_COLOR, TAB_COLOR, TEXT_COLOR } from '@/src/constants/colors'

export const tokenDetailsStyles = StyleSheet.create({
  modalTitleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  safeArea: { flex: 1, backgroundColor: BG_COLOR },
  container: {
    flex: 1,
    margin: 16,
    borderRadius: 16,
    backgroundColor: TAB_COLOR,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: { fontSize: 20, fontWeight: '600', color: TEXT_COLOR },
  closeButton: { padding: 8 },
  closeText: { fontSize: 24, color: TEXT_COLOR },
  content: { padding: 16 },
  fieldTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 12,
    color: TEXT_COLOR,
  },
  fieldValue: { fontSize: 14, marginTop: 4, color: TEXT_COLOR },
})
