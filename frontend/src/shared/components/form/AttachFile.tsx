import { DocumentPickerResponse } from 'react-native-document-picker'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { pickFile } from '@/src/shared/components/form/pickFile'
import { MaterialIcons } from '@expo/vector-icons'
import { MAIN_COLOR, TEXT_COLOR } from '@/src/shared/constants/colors'
import { MonoText } from '@/src/shared/components/template'
import React from 'react'
import { useTranslation } from 'react-i18next'

/**
 * AttachFile - это компонент, который позволяет пользователю прикрепить файл к сообщению.
 *
 * @param props - объект, содержащий свойства компонента.
 * @param props.tokenFile - выбранный файл.
 * @param props.setTokenFile - функция для установки выбранного файла.
 * @returns {JSX.Element} - возвращает элемент TouchableOpacity с иконкой и текст��м.
 */
export function AttachFile(props: {
  tokenFile: DocumentPickerResponse | null
  setTokenFile: (file: DocumentPickerResponse | null) => void
}): JSX.Element {
  const { t } = useTranslation()
  return (
    <TouchableOpacity
      style={styles.fileButton}
      onPress={async () => {
        const file = await pickFile()
        if (file) {
          props.setTokenFile(file)
        }
      }}
    >
      <MaterialIcons name={'attach-file'} size={20} color={TEXT_COLOR} />
      {props.tokenFile ? (
        <MonoText style={{ color: TEXT_COLOR, fontSize: 16 }}>
          {props.tokenFile.name}
        </MonoText>
      ) : (
        <MonoText style={{ color: TEXT_COLOR, fontSize: 16, opacity: 0.5 }}>
          {t('form.attachFilePlaceholder')}
        </MonoText>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  fileButton: {
    backgroundColor: MAIN_COLOR,
    borderRadius: 6,
    padding: 8,
    flexDirection: 'row',
    gap: 4,
  },
})
