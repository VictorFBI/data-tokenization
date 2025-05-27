import { useTokens } from '@/src/hooks/useTokens'
import React from 'react'
import log from 'loglevel'
import { BaseModal } from '@/src/components/modal/BaseModal'
import SimpleText from '@/src/components/default-elements-overridings/SimpleText'
import { View } from 'react-native'
import { ActionButton } from '@/src/components/modal/ActionButton'
import { useAddForm } from '@/src/hooks/useAddForm'
import { useTranslation } from 'react-i18next'
import { styles } from '@/src/styles/BaseModal'
import { FormComponentInputProps } from '@/src/types/FormComponentProps'
import {
  tokenDescriptionForm,
  tokenFileForm,
  tokenIconForm,
  tokenNameForm,
} from '@/src/utils/forms/getFormComponents'
import { FormList } from '@/src/components/form/FormList'

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
  // TODO: исправить структуру, тут она сложная: при добавлении новых полей нужно будет сделать много приседаний∆
  const {
    tokenName,
    setTokenName,
    tokenDescription,
    setTokenDescription,
    tokenIcon,
    setTokenIcon,
    tokenFile,
    setTokenFile,
    nullifyForm,
    makeForm,
  } = useAddForm()

  const handleSubmit = async () => {
    log.info('before making form')
    const formData = await makeForm()
    log.info('after making form')
    if (!formData) {
      alert(t('walletScreen.add.badRequestAlert'))
      return
    }
    log.info('before awaiting token promise add')
    const promise = await handleAddToken(formData)
    log.info(promise)
    log.info('awaiting token promise add')
    if (promise && promise.status && promise.status === 200) {
      log.info('Token added successfully')
      nullifyForm()
      props.onRequestClose()
    } else {
      log.info('Token adding failed')
      alert(t('walletScreen.add.failAlert'))
    }
  }

  const formFields: FormComponentInputProps[] = [
    tokenFileForm(t, tokenFile, setTokenFile),
    tokenNameForm(t, tokenName, setTokenName),
    tokenIconForm(t, tokenIcon, setTokenIcon),
    tokenDescriptionForm(t, tokenDescription, setTokenDescription),
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
