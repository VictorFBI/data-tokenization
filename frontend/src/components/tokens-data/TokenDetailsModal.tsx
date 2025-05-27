import React, { useEffect } from 'react'
import { View } from 'react-native'
import { BaseModalProps } from '@/src/types/BaseModalProps'
import { Token } from '@/src/types/Token'
import SimpleText from '@/src/components/default-elements-overridings/SimpleText'
import { MaterialIconWrapper } from '@/src/components/default-elements-overridings/MaterialIconWrapper'
import { BaseModal } from '@/src/components/modal/BaseModal'
import { ActionButton } from '@/src/components/modal/ActionButton'
import { styles } from '@/src/styles/BaseModal'
import { tokenDetailsStyles } from '@/src/styles/TokenDetailsModal'
import { useUpdateForm } from '@/src/hooks/useUpdateForm'
import { FormComponentInputProps } from '@/src/types/FormComponentProps'
import {
  tokenDescriptionForm,
  tokenIconForm,
  tokenMarketForm,
  tokenNameForm,
} from '@/src/utils/forms/getFormComponents'
import { FormList } from '@/src/components/form/FormList'
import { useTranslation } from 'react-i18next'
import log from 'loglevel'
import { useTokens } from '@/src/hooks/useTokens'

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
  const {
    tokenName,
    setTokenName,
    tokenDescription,
    setTokenDescription,
    tokenIcon,
    setTokenIcon,
    isListed,
    setIsListed,
    priceEth,
    setPriceEth,
    nullifyForm,
    makeForm,
  } = useUpdateForm()

  const { t } = useTranslation()
  const { handleUpdateToken } = useTokens()

  useEffect(() => {
    if (token) {
      setTokenName(token.name)
      setTokenIcon(token.icon)
      setTokenDescription(token.description)
    }
  }, [token, setTokenName, setTokenIcon, setTokenDescription])

  if (!token) {
    return null
  }

  const formFields: FormComponentInputProps[] = [
    tokenNameForm(t, tokenName, setTokenName),
    tokenIconForm(t, tokenIcon, setTokenIcon),
    tokenDescriptionForm(t, tokenDescription, setTokenDescription),
    tokenMarketForm(t, isListed, setIsListed, priceEth, setPriceEth),
  ]

  const handleSubmit = async () => {
    const formData = makeForm()
    if (!formData) {
      alert('bad request')
      // alert(t('walletScreen.add.badRequestAlert'))
      return
    }
    const result = await handleUpdateToken(formData)
    if (result) {
      log.info('Token updated successfully')
      nullifyForm()
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
