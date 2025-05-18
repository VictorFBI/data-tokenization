import React, { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { BalanceView } from '@/src/components/screens/wallet/BalanceView'
import { WalletButtons } from '@/src/components/screens/wallet/WalletButton'
import { BackgroundSafeAreaView } from '@/src/components/default-elements-overridings/BackgroundView'
import { Token } from '@/src/types/Token'
import { WalletButtonProps } from '@/src/types/WalletButtonProps'
import { useTokens } from '@/src/hooks/useTokens'
import { YourTokensWithSearch } from '@/src/components/screens/wallet/YourTokens'
import { THIRD_TEXT_COLOR } from '@/src/constants/colors'
import SimpleText from '@/src/components/default-elements-overridings/SimpleText'
import { DocumentPickerResponse } from 'react-native-document-picker'
import log from 'loglevel'
import { MaterialIconWrapper } from '@/src/components/default-elements-overridings/MaterialIconWrapper'
import { ICON_SIZE } from '@/src/constants/sizes'
import { MaterialIconName } from '@/src/types/MaterialIconName'
import { ActionButton } from '@/src/components/modal/ActionButton'
import { FormComponent } from '@/src/components/modal/FormComponent'
import { BaseModal } from '@/src/components/modal/BaseModal'
import { AttachFile } from '@/src/components/form/AttachFile'
import { findBestGapAndColumnSize } from '@/src/utils/findBestGapAndColumnSize'
import { FormTextInput } from '@/src/components/form/FormTextInput'

/**
 *
 * @param props
 * @param props.data
 * @param props.numColumns
 * @param props.gap
 */
function IconList(props: {
  data: MaterialIconName[]
  numColumns: number
  gap: number
}) {
  return (
    <FlatList
      data={props.data}
      renderItem={({ item }) => <MaterialIconWrapper icon={item} />}
      key={Math.floor(props.numColumns)}
      keyExtractor={(_, index) => index.toString()}
      numColumns={props.numColumns}
      {...(props.numColumns > 1 && {
        columnWrapperStyle: {
          gap: props.gap,
          marginBottom: 4,
        },
      })}
    />
  )
}

/**
 *
 * @param props
 * @param props.data
 */
function IconListWithSameGap(props: { data: MaterialIconName[] }) {
  const [columnNumber, setColumnNumber] = useState(0)
  const [gap, setGap] = useState(0)
  return (
    <View
      onLayout={event => {
        const { width } = event.nativeEvent.layout
        const minGap = 8
        const size = ICON_SIZE + 8 // TODO: use size from constants
        const { bestColumnNumber, bestGap } = findBestGapAndColumnSize(
          minGap,
          size,
          width,
        )
        setColumnNumber(Math.floor(bestColumnNumber))
        setGap(bestGap)
      }}
      style={styles.iconList}
    >
      <IconList data={props.data} numColumns={columnNumber} gap={gap} />
    </View>
  )
}

/**
 *
 * @param props
 * @param props.visible
 * @param props.onRequestClose
 * @param props.data
 * @param props.keyExtractor
 * @param props.renderItem
 * @param props.onPress
 * @param props.onPress1
 */
function AddTokenModel(props: {
  visible: boolean
  onRequestClose: () => void
}) {
  const { handleAddToken } = useTokens()
  const [tokenName, setTokenName] = useState('')
  const [tokenDescription, setTokenDescription] = useState('')
  const [tokenIcon, setTokenIcon] = useState('')
  const [tokenFile, setTokenFile] = useState<DocumentPickerResponse | null>(
    null,
  )

  const uploadTokenToServer = async () => {
    if (!tokenFile || !tokenIcon || !tokenName) return

    const formData = new FormData()

    formData.append('tokenName', tokenName)

    formData.append('tokenFile', {
      uri: tokenFile.uri,
      name: tokenFile.name,
      type: tokenFile.type || 'application/octet-stream',
    } as never)

    formData.append('tokenIcon', tokenIcon)

    try {
      const response = await fetch('https://your-backend.com/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })

      const data = await response.json()
      log.info('Upload successful:', data)

      handleAddToken({ name: tokenName })
      setTokenName('')
      setTokenFile(null)
      setTokenIcon('')
    } catch (error) {
      log.error('Upload error:', error)
    }
  }

  const handleSubmit = () => {
    if (tokenName && tokenFile && tokenIcon) {
      uploadTokenToServer()
    } else {
      alert('Please provide name, file and icon')
    }
    props.onRequestClose()
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
      component: <IconListWithSameGap data={icons} />,
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

/**
 * Экран WalletScreen отображает баланс пользователя и список токенов с возможностью поиска и фильтрации.
 *
 * @returns {JSX.Element} JSX-элемент, представляющий экран кошелька.
 */
export default function WalletScreen() {
  const { tokens, setFilterParams } = useTokens()
  const [isAddModalVisible, setAddModalVisible] = useState(false)

  const handleSearch = (query: string) => {
    setFilterParams(prev => ({ ...prev, search: query }))
  }

  const handleAddPress = () => {
    setAddModalVisible(true)
  }
  const handleClose = () => {
    setAddModalVisible(false)
  }

  const walletButtons: WalletButtonProps[] = [
    {
      iconName: 'add-circle-outline',
      buttonText: 'add',
      onPress: handleAddPress,
    },
    {
      iconName: 'history',
      buttonText: 'history',
      onPress: () => {},
    },
  ]

  return (
    <BackgroundSafeAreaView>
      <BalanceView tokenNumber={tokens.length} />
      <WalletButtons walletButtons={walletButtons} />
      <YourTokensWithSearch
        tokens={tokens}
        onSearch={handleSearch}
        onFilter={() => {}}
        onTokenPress={(token: Token) => {}}
      />
      <AddTokenModel visible={isAddModalVisible} onRequestClose={handleClose} />
    </BackgroundSafeAreaView>
  )
}

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 24,
    fontWeight: '500',
    color: THIRD_TEXT_COLOR,
    textAlign: 'center',
    marginBottom: 12, // Отступ от заголовка к контенту
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    paddingTop: 12,
  },
  iconList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    flexWrap: 'wrap',
  },
})
