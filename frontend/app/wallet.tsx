import React, { useState } from 'react'
import {
  Modal,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ViewStyle,
  ScrollView,
} from 'react-native'
import { BalanceView } from '@/src/components/screens/wallet/BalanceView'
import { WalletButtons } from '@/src/components/screens/wallet/WalletButton'
import { BackgroundSafeAreaView } from '@/src/components/default-elements-overridings/BackgroundView'
import { Token } from '@/src/types/Token'
import { WalletButtonProps } from '@/src/types/WalletButtonProps'
import { useTokens } from '@/src/hooks/useTokens'
import { YourTokensWithSearch } from '@/src/components/screens/wallet/YourTokens'
import {
  ACTION_BUTTON_COLOR,
  BG_COLOR,
  MAIN_COLOR,
  TAB_COLOR,
  TEXT_COLOR,
  THIRD_TEXT_COLOR,
} from '@/src/constants/colors'
import SimpleText from '@/src/components/default-elements-overridings/SimpleText'
import { parseToRgb } from 'polished'
import { MONO_FONT } from '@/src/constants/fonts'
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker'
import log from 'loglevel'
import MonoText from '@/src/components/default-elements-overridings/MonoText'
import { MaterialIcons } from '@expo/vector-icons'
import { MaterialIconWrapper } from '@/src/components/default-elements-overridings/MaterialIconWrapper'
import { ICON_SIZE } from '@/src/constants/sizes'
import { MaterialIconName } from '@/src/types/MaterialIconName'

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

const findBestGapAndColumnSize = (
  minGap: number,
  iconSize: number,
  width: number,
) => {
  let bestColumnNumber = 1
  let bestGap = minGap

  for (let cols = 1; cols <= 10; cols++) {
    const totalGap = width - cols * iconSize
    const gap = totalGap / (cols - 1 || 1)

    if (gap >= minGap) {
      bestColumnNumber = cols
      bestGap = gap
    } else {
      break
    }
  }
  return { bestColumnNumber, bestGap }
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
 * @param props.value
 * @param props.placeholder
 * @param props.onChangeText
 */
function FormTextInput(props: {
  value: string
  placeholder: string
  onChangeText: (value: ((prevState: string) => string) | string) => void
}) {
  return (
    <TextInput
      style={styles.input}
      placeholder={props.placeholder}
      placeholderTextColor={hexToRgba(TEXT_COLOR, 0.5)}
      value={props.value}
      onChangeText={props.onChangeText}
    />
  )
}

/**
 *
 * @param props
 * @param props.tokenFile
 * @param props.setTokenFile
 */
function AddFormAttachFile(props: {
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

/**
 * Экран WalletScreen отображает баланс пользователя и список токенов с возможностью поиска и фильтрации.
 *
 * @returns {JSX.Element} JSX-элемент, представляющий экран кошелька.
 */
export default function WalletScreen() {
  const { tokens, setFilterParams, handleAddToken } = useTokens()
  const [isModalVisible, setModalVisible] = useState(false)
  const [tokenName, setTokenName] = useState('')
  const [tokenFile, setTokenFile] = useState<DocumentPickerResponse | null>(
    null,
  )
  const [tokenIcon, setTokenIcon] = useState<DocumentPickerResponse | null>(
    null,
  )

  const icons: MaterialIconName[] = [
    'bed',
    'cabin',
    'car-rental',
    'car-repair',
    'chair',
    'chair',
    'chair',
    'chair',
    'chair',
    'chair',
    'chair',
    'chair',
    'chair',
    'chair',
  ]

  const handleSearch = (query: string) => {
    setFilterParams(prev => ({ ...prev, search: query }))
  }

  const handleAddPress = () => {
    setModalVisible(true)
  }

  const uploadTokenToServer = async () => {
    if (!tokenFile || !tokenIcon || !tokenName) return

    const formData = new FormData()

    formData.append('tokenName', tokenName)

    formData.append('tokenFile', {
      uri: tokenFile.uri,
      name: tokenFile.name,
      type: tokenFile.type || 'application/octet-stream',
    } as never)

    formData.append('tokenIcon', {
      uri: tokenIcon.uri,
      name: tokenIcon.name,
      type: tokenIcon.type || 'application/octet-stream',
    } as never)

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
      setModalVisible(false)
      setTokenName('')
      setTokenFile(null)
      setTokenIcon(null)
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
  }
  const handleClose = () => {
    setModalVisible(false)
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

  const formFields = [
    {
      title: 'Tokenized file',
      component: (
        <AddFormAttachFile tokenFile={tokenFile} setTokenFile={setTokenFile} />
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
      title: 'Tokenized file',
      component: (
        <AddFormAttachFile tokenFile={tokenFile} setTokenFile={setTokenFile} />
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
      title: 'Tokenized file',
      component: (
        <AddFormAttachFile tokenFile={tokenFile} setTokenFile={setTokenFile} />
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
      title: 'Tokenized file',
      component: (
        <AddFormAttachFile tokenFile={tokenFile} setTokenFile={setTokenFile} />
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: BG_COLOR }}>
          <View style={styles.modalContainer}>
            <FlatList
              data={formFields}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <FormComponent title={item.title}>
                  {item.component}
                </FormComponent>
              )}
              ListHeaderComponent={
                <SimpleText style={styles.modalTitle}>Add Token</SimpleText>
              }
              ListFooterComponent={
                <View style={styles.buttonRow}>
                  <ActionButton text="Cancel" onPress={handleClose} />
                  <ActionButton text="Add" onPress={handleSubmit} />
                </View>
              }
              contentContainerStyle={{ gap: 12 }}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </BackgroundSafeAreaView>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    backgroundColor: TAB_COLOR,
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '500',
    color: THIRD_TEXT_COLOR,
    textAlign: 'center',
  },
  input: {
    backgroundColor: MAIN_COLOR,
    borderRadius: 6,
    padding: 8,
    color: TEXT_COLOR,
    fontFamily: MONO_FONT,
    fontSize: 16,
  },
  fileButton: {
    backgroundColor: MAIN_COLOR,
    borderRadius: 6,
    padding: 8,
    flexDirection: 'row',
    gap: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 8,
  },
  actionButton: {
    backgroundColor: ACTION_BUTTON_COLOR,
    borderRadius: 8,
    paddingVertical: 12,
    flex: 1,
    alignItems: 'center',
  },
  actionButtonText: {
    color: TEXT_COLOR,
    fontSize: 16,
  },
  formComponentContainer: {
    gap: 4, // Отступ между заголовком и содержимым
  },
  formComponentTitle: {
    color: TEXT_COLOR, // Замените на ваш цвет
    fontSize: 16,
  },
  iconList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    flexWrap: 'wrap',
  },
})

const hexToRgba = (hex: string, alpha: number) => {
  const { red, green, blue } = parseToRgb(hex)
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

type FormComponentProps = {
  title: string
  children: React.ReactNode
  style?: ViewStyle
}

/**
 *
 * @param root0
 * @param root0.title
 * @param root0.children
 * @param root0.style
 */
function FormComponent({ title, children, style }: FormComponentProps) {
  return (
    <View style={[styles.formComponentContainer, style]}>
      <SimpleText style={styles.formComponentTitle}>{title}</SimpleText>
      {children}
    </View>
  )
}

/**
 *
 */
export async function pickFile(): Promise<DocumentPickerResponse | null> {
  try {
    const result = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    })
    return result[0]
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      log.warn('File selection canceled')
    } else {
      log.warn('Error selecting file:', err)
    }
    return null
  }
}

/**
 *
 * @param root0
 * @param root0.text
 * @param root0.onPress
 * @param root0.style
 */
function ActionButton({
  text,
  onPress,
  style,
}: {
  text: string
  onPress: () => void
  style?: ViewStyle
}) {
  return (
    <TouchableOpacity style={[styles.actionButton, style]} onPress={onPress}>
      <SimpleText style={styles.actionButtonText}>{text}</SimpleText>
    </TouchableOpacity>
  )
}
