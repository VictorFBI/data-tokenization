import { useTokens } from '@/src/shared/hooks/useTokens'
import React from 'react'
import log from 'loglevel'
import { BaseModal } from '@/src/shared/components/modal/BaseModal'
import { SimpleText } from '@/src/shared/components/template'
import { View } from 'react-native'
import { ActionButton } from '@/src/shared/components/modal/ActionButton'
import { useAddForm } from '@/src/screens/wallet/hooks/useAddForm'
import { useTranslation } from 'react-i18next'
import { styles } from '@/src/shared/styles/BaseModal'
import { FormComponentInputProps } from '@/src/shared/components/form/FormComponentProps'
import {
  tokenDescriptionForm,
  tokenFileForm,
  tokenIconForm,
  tokenNameForm,
} from '@/src/shared/components/form/getFormComponents'
import { FormList } from '@/src/shared/components/form/FormList'

/**
 * Компонент модального окна для добавления токена.
 *
 * @param props - Свойства компонента.
 * @param props.visible - Флаг, определяющий видимость модального окна.
 * @param props.onRequestClose - Функция, вызываемая при закрытии модального окна.
 * @returns {JSX.Element} - Возвращает элемент модального окна для добавления токена.
 */
export function AddTokenModal(props: {
  visible: boolean
  onRequestClose: () => void
}): JSX.Element {
  const { t } = useTranslation()

  const { handleAddToken } = useTokens()
  // TODO: исправить структуру, тут она сложная: при добавлении новых полей нужно будет сделать много приседаний
  const { form, actions } = useAddForm()

  const handleSubmit = async () => {
    const formData = actions.makeForm()
    if (!formData) {
      alert(t('walletScreen.add.badRequestAlert'))
      return
    }
    // TODO: fix naming
    const status = await handleAddToken(formData)
    if (status && status.status === 200) {
      log.info('Token added successfully')
      actions.nullifyForm()
      props.onRequestClose()
    } else {
      alert(t('walletScreen.add.failAlert'))
    }
  }

  const formFields: FormComponentInputProps[] = [
    tokenFileForm(t, form.tokenFile),
    tokenNameForm(t, form.tokenName),
    tokenIconForm(t, form.tokenIcon),
    tokenDescriptionForm(t, form.tokenDescription),
  ]

  return (
    <BaseModal visible={props.visible} onRequestClose={props.onRequestClose}>
      <SimpleText style={styles.modalTitle}>
        {t('walletScreen.add.header')}
      </SimpleText>
      <FormList data={formFields} />
      <View style={styles.buttonRow}>
        <ActionButton
          text={t('walletScreen.add.cancel')}
          onPress={props.onRequestClose}
        />
        <ActionButton text={t('walletScreen.add.add')} onPress={handleSubmit} />
      </View>
    </BaseModal>
  )
}
