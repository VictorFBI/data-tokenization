import { BaseModalChildrenProps } from '@/src/shared/components/modal/BaseModalProps'
import { Modal, SafeAreaView, StyleSheet, View } from 'react-native'
import { BG_COLOR, TAB_COLOR } from '@/src/shared/constants/colors'
import React from 'react'

export const BaseModal = ({
  visible,
  onRequestClose,
  children,
}: BaseModalChildrenProps) => {
  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: BG_COLOR }}>
        <View style={styles.modalContainer}>{children}</View>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    backgroundColor: TAB_COLOR,
  },
})
