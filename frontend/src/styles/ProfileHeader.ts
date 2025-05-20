import { StyleSheet } from 'react-native'
import { MONO_FONT } from '@/src/constants/fonts'

export const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 32,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 27,
  },
  name: {
    fontSize: 27,
    color: '#fff',
  },
  nameInput: {
    fontSize: 27,
    fontFamily: MONO_FONT,
    color: '#fff',
    textAlign: 'center',
  },
})
