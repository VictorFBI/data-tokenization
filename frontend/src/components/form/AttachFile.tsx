import { DocumentPickerResponse } from 'react-native-document-picker'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { pickFile } from '@/src/utils/pickFile'
import { MaterialIcons } from '@expo/vector-icons'
import { MAIN_COLOR, TEXT_COLOR } from '@/src/constants/colors'
import MonoText from '@/src/components/default-elements-overridings/MonoText'
import React from 'react'

/**
 *
 * @param props
 * @param props.tokenFile
 * @param props.setTokenFile
 */
export function AttachFile(props: {
  tokenFile: DocumentPickerResponse | null
  setTokenFile: (file: DocumentPickerResponse | null) => void
}) {
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
          Choose file
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
