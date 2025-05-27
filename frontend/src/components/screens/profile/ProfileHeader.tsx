import { Alert, Image, TextInput, TouchableOpacity, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { MediaType } from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { styles } from '@/src/styles/ProfileHeader'
import MonoText from '@/src/components/default-elements-overridings/MonoText'

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
  const [avatarUri, setAvatarUri] = useState<string | null>(null)

  // Запрашиваем право на доступ к фотоальбому
  const askPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert(
        'Разрешение не получено',
        'Чтобы выбрать фото профиля, разрешите доступ к фотоальбому',
      )
      return false
    }
    return true
  }

  const handleSelectImage = async () => {
    if (!(await askPermission())) return

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images' as MediaType,
      quality: 1,
      allowsEditing: true, // обрезка
      aspect: [1, 1], // квадратная область
    })

    if (result.canceled) {
      // Пользователь отменил выбор
      console.warn('File selection canceled')
      return
    }

    const asset = result.assets[0]
    // Успешно выбрали
    setAvatarUri(asset.uri)
    await AsyncStorage.setItem('profileAvatar', asset.uri)
  }

  useEffect(() => {
    ;(async () => {
      const savedUri = await AsyncStorage.getItem('profileAvatar')
      if (savedUri) setAvatarUri(savedUri)
    })()
  }, [])

  return (
    <TouchableOpacity onPress={handleSelectImage}>
      <Image
        source={{
          uri: avatarUri ?? 'https://picsum.photos/id/237/200/300',
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
