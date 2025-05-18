import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker'
import log from 'loglevel'

/**
 *
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