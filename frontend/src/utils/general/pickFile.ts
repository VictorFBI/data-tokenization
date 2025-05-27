import * as DocumentPicker from 'expo-document-picker'
import log from 'loglevel'
import { DocumentPickerResponse } from 'react-native-document-picker'

/**
 * Функция `pickFile` позволяет пользователю выбрать файл с помощью
 * библиотеки `react-native-document-picker`. Она возвращает информацию
 * о выбранном файле или `null`, если выбор был отменён или произошла ошибка.
 *
 * @returns {Promise<DocumentPickerResponse | null>} Объект с информацией о выбранном файле или `null`.
 */
export async function pickFile(): Promise<DocumentPickerResponse | null> {
  try {
    const result = await DocumentPicker.getDocumentAsync({ type: '*/*' })

    // Если отмена — сразу возвращаем null
    if (result.canceled) {
      log.warn('File selection canceled')
      return null
    }

    // Берём первый ассет (обычно пользователь выбирает один файл)
    const asset = result.assets[0]

    // Мапим под интерфейс DocumentPickerResponse
    return {
      uri: asset.uri,
      name: asset.name,
      size: asset.size ?? 0,
      type: asset.mimeType ?? 'application/octet-stream',
      fileCopyUri: null,
    }
  } catch (err) {
    log.warn('Error selecting file:', err)
    return null
  }
}
