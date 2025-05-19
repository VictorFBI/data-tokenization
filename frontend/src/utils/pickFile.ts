import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker'
import log from 'loglevel'

/**
 * Функция `pickFile` позволяет пользователю выбрать файл с помощью
 * библиотеки `react-native-document-picker`. Она возвращает информацию
 * о выбранном файле или `null`, если выбор был отменён или произошла ошибка.
 *
 * @returns {Promise<DocumentPickerResponse | null>} Объект с информацией о выбранном файле или `null`.
 */
export async function pickFile(): Promise<DocumentPickerResponse | null> {
  try {
    const result = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    })
    return result[0]
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      log.warn('File selection canceled')
    } else {
      log.warn('Error selecting file:', err)
    }
    return null
  }
}
