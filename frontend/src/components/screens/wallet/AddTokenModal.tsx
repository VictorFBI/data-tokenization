import { useTokens } from '@/src/hooks/useTokens'
import React from 'react'
import { MaterialIconName } from '@/src/types/MaterialIconName'
import log from 'loglevel'
import { AttachFile } from '@/src/components/form/AttachFile'
import { FormTextInput } from '@/src/components/form/FormTextInput'
import { FormIconList } from '@/src/components/form/FormIconList'
import { BaseModal } from '@/src/components/modal/BaseModal'
import SimpleText from '@/src/components/default-elements-overridings/SimpleText'
import { FlatList, View } from 'react-native'
import { FormComponent } from '@/src/components/modal/FormComponent'
import { ActionButton } from '@/src/components/modal/ActionButton'
import { useAddForm } from '@/src/hooks/useAddForm'
import { styles } from '@/src/styles/WalletModal'
import { useTranslation } from 'react-i18next'

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
    const formData = makeForm()
    if (!formData) {
      alert(t('walletScreen.add.badRequestAlert'))
      return
    }
    const { status } = await handleAddToken(formData)
    if (status && status === 200) {
      log.info('Token added successfully')
      nullifyForm()
      props.onRequestClose()
    } else {
      alert(t('walletScreen.add.failAlert'))
    }
  }

  const icons: MaterialIconName[] = [
    'bed',
    'pie-chart',
    'favorite',
    'air',
    'directions-walk',
    'electric-bolt',
    'straighten',
    'circle',
  ]

  const formFields = [
    {
      title: t('walletScreen.add.form.file'),
      component: (
        <AttachFile tokenFile={tokenFile} setTokenFile={setTokenFile} />
      ),
    },
    {
      title: t('walletScreen.add.form.name'),
      component: (
        <FormTextInput
          value={tokenName}
          placeholder={'example_name'}
          onChangeText={setTokenName}
        />
      ),
    },
    {
      title: t('walletScreen.add.form.icon'),
      component: (
        <FormIconList
          data={icons}
          selectedIcon={tokenIcon}
          onIconPress={(icon: MaterialIconName) => setTokenIcon(icon)}
        />
      ),
    },
    {
      title: t('walletScreen.add.form.desc'),
      component: (
        <FormTextInput
          value={tokenDescription}
          placeholder={t('walletScreen.add.form.descPlaceholder')}
          onChangeText={setTokenDescription}
          multiline={true}
        />
      ),
    },
  ]

  return (
    <BaseModal visible={props.visible} onRequestClose={props.onRequestClose}>
      <SimpleText style={styles.modalTitle}>
        {t('walletScreen.add.header')}
      </SimpleText>
      <FlatList
        data={formFields}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <FormComponent title={item.title}>{item.component}</FormComponent>
        )}
        contentContainerStyle={{
          gap: 12,
          paddingTop: 16,
          paddingBottom: 16,
        }}
        style={{ flex: 1 }}
      />
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
