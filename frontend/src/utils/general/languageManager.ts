import i18n, { changeLanguage } from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as Localization from 'expo-localization'
import AsyncStorage from '@react-native-async-storage/async-storage'

import en from '@/src/locals/en.json'
import ru from '@/src/locals/ru.json'

const LANGUAGE_KEY = 'app_language'

const resources = {
  en: { translation: en },
  ru: { translation: ru },
}

export const availableLanguages = Object.keys(resources)

/**
 * Инициализирует язык приложения.
 *
 * - Проверяет сохранённый язык в `AsyncStorage` по ключу `LANGUAGE_KEY`.
 * - Определяет язык устройства с помощью `expo-localization`.
 * - Устанавливает язык приложения, используя сохранённый язык, язык устройства
 *   (если он доступен в списке поддерживаемых языков), или язык по умолчанию ('en').
 * - Инициализирует библиотеку `i18next` с настройками локализации.
 *
 * @async
 * @returns {Promise<void>} Возвращает промис, который разрешается после завершения инициализации.
 */
export async function initLanguage() {
  const storedLang = await AsyncStorage.getItem(LANGUAGE_KEY)
  const deviceLang = Localization.getLocales()[0].languageCode || 'en'
  const lng =
    storedLang || (availableLanguages.includes(deviceLang) ? deviceLang : 'en')

  // eslint-disable-next-line import/no-named-as-default-member
  await i18n.use(initReactI18next).init({
    lng,
    fallbackLng: 'en',
    resources,
    interpolation: { escapeValue: false },
  })
}

/**
 * Меняет текущий язык приложения.
 *
 * - Определяет текущий язык приложения.
 * - Переключает язык между 'en' (английский) и 'ru' (русский).
 * - Сохраняет выбранный язык в `AsyncStorage` по ключу `LANGUAGE_KEY`.
 *
 * @async
 * @returns {Promise<void>} Возвращает промис, который разрешается после смены языка.
 */
export async function changeAppLanguage() {
  const lang = currentLanguage() === 'en' ? 'ru' : 'en'
  await changeLanguage(lang)
  await AsyncStorage.setItem(LANGUAGE_KEY, lang)
}

/**
 * Возвращает текущий язык приложения.
 *
 * @returns {string} Код текущего языка (например, 'en' или 'ru').
 */
export function currentLanguage() {
  return i18n.language
}
