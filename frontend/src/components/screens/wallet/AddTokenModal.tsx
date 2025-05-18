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
import { styles } from '@/src/styles/AddTokenModal'

/**
 * Компонент модального окна для добавления токена.
 *
 * @param props.visible - Флаг, определяющий видимость модального окна.
 * @param props.onRequestClose - Функция, вызываемая при закрытии модального окна.
 * @param props
 */
export function AddTokenModal(props: {
  visible: boolean
  onRequestClose: () => void
}) {
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
      alert('Please provide name, file and icon')
      return
    }
    const { status } = await handleAddToken(formData)
    if (status && status === 200) {
      log.info('Token added successfully')
      nullifyForm()
      props.onRequestClose()
    } else {
      alert('Failed to add token')
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
      title: 'Tokenized file',
      component: (
        <AttachFile tokenFile={tokenFile} setTokenFile={setTokenFile} />
      ),
    },
    {
      title: 'Name',
      component: (
        <FormTextInput
          value={tokenName}
          placeholder={'example_name'}
          onChangeText={setTokenName}
        />
      ),
    },
    {
      title: 'Icon',
      component: (
        <FormIconList
          data={icons}
          selectedIcon={tokenIcon}
          onIconPress={(icon: MaterialIconName) => setTokenIcon(icon)}
        />
      ),
    },
    {
      title: 'Description',
      component: (
        <FormTextInput
          value={tokenDescription}
          placeholder={'Tell something about tour token'}
          onChangeText={setTokenDescription}
          multiline={true}
        />
      ),
    },
  ]

  return (
    <BaseModal visible={props.visible} onRequestClose={props.onRequestClose}>
      <SimpleText style={styles.modalTitle}>Add Token</SimpleText>
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
        <ActionButton text="Cancel" onPress={props.onRequestClose} />
        <ActionButton text="Add" onPress={handleSubmit} />
      </View>
    </BaseModal>
  )
}
