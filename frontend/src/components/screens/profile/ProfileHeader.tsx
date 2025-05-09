import { Image, StyleSheet, View } from 'react-native'
import MonoText from '@/src/components/default-elements-overridings/MonoText'
import React from 'react'

/**
 * Компонент ProfileHeader отвечает за отображение заголовка профиля пользователя. А именно фото и имя.
 *
 * @returns {JSX.Element} - возвращает элемент View, представляющий заголовок профиля.
 */
export function ProfileHeader(): JSX.Element {
  return (
    <View style={styles.header}>
      <Image
        source={{ uri: 'https://picsum.photos/id/237/200/300' }}
        style={styles.avatar}
      />
      <MonoText style={styles.name}>George</MonoText>
    </View>
  )
}

const styles = StyleSheet.create({
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
    fontWeight: 'regular',
  },
})
