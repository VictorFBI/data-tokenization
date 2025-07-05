import React from 'react'
import { ScrollView, View } from 'react-native'
import Options, { OptionProps } from '@/src/screens/profile/ProfileOption'
import { BackgroundSafeAreaView } from '@/src/shared/components/template'
import { ProfileHeader } from '@/src/screens/profile/ProfileHeader'
import { changeAppLanguage } from '@/src/screens/layout/languageManager'
import { useTranslation } from 'react-i18next'

/**
 * Экран ProfileScreen отображает настройки профиля пользователя.
 * Содержит заголовок профиля и список опций.
 *
 * @returns {JSX.Element} JSX-элемент, представляющий экран профиля.
 */
export default function ProfileScreen() {
  const { t } = useTranslation()
  // Todo: change somehow
  const profileSettingsOptions: OptionProps[] = [
    {
      icon: 'notifications-none',
      label: t('profileScreen.notifications'),
      value: t('common.On'),
    },
    {
      icon: 'key',
      label: t('profileScreen.changeAccount'),
    },
    {
      icon: 'language',
      label: t('profileScreen.language'),
      value: t('language'),
      onPress() {
        changeAppLanguage()
      },
    },
  ]

  const sendFeedbackOption: OptionProps[] = [
    {
      icon: 'feedback',
      label: t('profileScreen.sendFeedback'),
    },
  ]

  return (
    <BackgroundSafeAreaView>
      <ScrollView>
        <ProfileHeader />
        <View style={{ gap: 16 }}>
          <Options options={profileSettingsOptions} />
          <Options options={sendFeedbackOption} />
        </View>
      </ScrollView>
    </BackgroundSafeAreaView>
  )
}
