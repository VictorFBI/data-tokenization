import React, { useEffect } from 'react'
import { View } from 'react-native'
import { BaseModalProps } from '@/src/shared/components/modal/BaseModalProps'
import { Token } from '@/src/shared/types/Token'
import {
  SimpleText,
  MaterialIconWrapper,
} from '@/src/shared/components/template'
import { BaseModal } from '@/src/shared/components/modal/BaseModal'
import { ActionButton } from '@/src/shared/components/modal/ActionButton'
import { styles } from '@/src/shared/styles/BaseModal'
import { tokenDetailsStyles } from '@/src/shared/styles/TokenDetailsModal'
import { useUpdateForm } from '@/src/screens/wallet/hooks/useUpdateForm'
import { FormComponentInputProps } from '@/src/shared/components/form/FormComponentProps'
import {
  tokenDescriptionForm,
  tokenIconForm,
  tokenMarketForm,
  tokenNameForm,
} from '@/src/shared/components/form/getFormComponents'
import { FormList } from '@/src/shared/components/form/FormList'
import { useTranslation } from 'react-i18next'
import log from 'loglevel'
import { useTokens } from '@/src/shared/hooks/useTokens'

interface TokenDetailsModalProps extends BaseModalProps {
  token: Token | null
}

/**
 * TokenDetailsModal component displays a modal with token details and allows editing.
 *
 * @param {Object} props - The props object.
 * @param {boolean} props.visible - Determines whether the modal is visible.
 * @param {() => void} props.onRequestClose - Callback function to close the modal.
 * @param {Token | null} props.token - The token object containing details to display and edit.
 * @returns {JSX.Element | null} The rendered modal component or null if no token is provided.
 */
export function TokenDetailsModal({
  visible,
  onRequestClose,
  token,
}: TokenDetailsModalProps): JSX.Element | null {
  const { form, actions } = useUpdateForm()

  const { t } = useTranslation()
  const { handleUpdateToken } = useTokens()

  useEffect(() => {
    if (token) {
      form.tokenName.onChange(token.name)
      form.tokenIcon.onChange(token.icon)
      form.tokenDescription.onChange(token.description)
    }
  }, [token, form.tokenName, form.tokenIcon, form.tokenDescription])

  if (!token) {
    return null
  }

  const formFields: FormComponentInputProps[] = [
    tokenNameForm(t, form.tokenName),
    tokenIconForm(t, form.tokenIcon),
    tokenDescriptionForm(t, form.tokenDescription),
    tokenMarketForm(t, form.isListed, form.priceEth),
  ]

  const handleSubmit = async () => {
    const formData = actions.makeForm()
    if (!formData) {
      alert('bad request')
      // alert(t('walletScreen.add.badRequestAlert'))
      return
    }
    const promise = await handleUpdateToken(formData)
    if (promise && promise.status && promise.status === 200) {
      log.info('Token updated successfully')
      actions.nullifyForm()
      onRequestClose()
    } else {
      alert('fail to update token')
      // alert(t('walletScreen.add.failAlert'))
    }
  }

  return (
    <BaseModal visible={visible} onRequestClose={onRequestClose}>
      <View style={tokenDetailsStyles.modalTitleRow}>
        <MaterialIconWrapper icon={token.icon} />
        <SimpleText style={styles.modalTitle}>{token.name}</SimpleText>
      </View>
      <FormList data={formFields} />
      <View style={styles.buttonRow}>
        <ActionButton text={t('tokenDetails.close')} onPress={onRequestClose} />
        <ActionButton text={t('tokenDetails.save')} onPress={handleSubmit} />
      </View>
    </BaseModal>
  )
}
