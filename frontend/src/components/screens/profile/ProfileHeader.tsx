import { Image, TextInput, TouchableOpacity, View } from 'react-native'
import MonoText from '@/src/components/default-elements-overridings/MonoText'
import React, { useState } from 'react'
import { launchImageLibrary } from 'react-native-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { styles } from '@/src/styles/ProfileHeader'

/**
 * Компонент ProfileHeader отвечает за отображение заголовка профиля пользователя.
 *
 * @returns {JSX.Element} - Возвращает элемент View, представляющий заголовок профиля.
 */
export function ProfileHeader(): JSX.Element {
  return (
    <View style={styles.header}>
      <ProfileAvatar />
      <NameEditor />
    </View>
  )
}

/**
 * Компонент ProfileAvatar отвечает за отображение и выбор фото профиля пользователя.
 *
 * @returns {JSX.Element} - Возвращает элемент для отображения и изменения фото профиля.
 */
function ProfileAvatar(): JSX.Element {
  const [avatarUri, setAvatarUri] = React.useState<string | null>(null)

  const handleSelectImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    })

    if (result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri || null
      setAvatarUri(uri)
      await AsyncStorage.setItem('profileAvatar', uri || '')
    }
  }

  React.useEffect(() => {
    const loadAvatar = async () => {
      const savedUri = await AsyncStorage.getItem('profileAvatar')
      if (savedUri) {
        setAvatarUri(savedUri)
      }
    }
    loadAvatar()
  }, [])

  return (
    <TouchableOpacity onPress={handleSelectImage}>
      <Image
        source={{
          uri: avatarUri || 'https://picsum.photos/id/237/200/300',
        }}
        style={styles.avatar}
      />
    </TouchableOpacity>
  )
}

/**
 * Компонент NameEditor отвечает за редактирование имени пользователя.
 *
 * @returns {JSX.Element} - Возвращает элемент для отображения и редактирования имени.
 */
function NameEditor(): JSX.Element {
  const [isEditingName, setIsEditingName] = useState<boolean>(false)
  const [name, setName] = useState<string>('George')

  React.useEffect(() => {
    const loadName = async () => {
      const savedName = await AsyncStorage.getItem('profileName')
      if (savedName) {
        setName(savedName)
      }
    }
    loadName()
  }, [])

  const handleNameChange = async (newName: string) => {
    setName(newName)
    await AsyncStorage.setItem('profileName', newName)
  }

  return isEditingName ? (
    <TextInput
      style={styles.nameInput}
      value={name}
      onChangeText={handleNameChange}
      maxLength={20}
      onBlur={() => setIsEditingName(false)}
      autoFocus
    />
  ) : (
    <TouchableOpacity onPress={() => setIsEditingName(true)}>
      <MonoText style={styles.name}>{name}</MonoText>
    </TouchableOpacity>
  )
}
