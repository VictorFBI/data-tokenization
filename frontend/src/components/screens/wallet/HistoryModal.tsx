import React from 'react'
import { MaterialIconName } from '@/src/types/MaterialIconName'
import { BaseModal } from '@/src/components/modal/BaseModal'
import SimpleText from '@/src/components/default-elements-overridings/SimpleText'
import { FlatList, View } from 'react-native'
import { ActionButton } from '@/src/components/modal/ActionButton'
import { historyStyle, styles } from '@/src/styles/WalletModal'
import { MaterialIconWrapper } from '@/src/components/default-elements-overridings/MaterialIconWrapper'
import MonoText from '@/src/components/default-elements-overridings/MonoText'
import {
  OPERATION_ADD_COLOR,
  OPERATION_PURCHASE_COLOR,
  OPERATION_SELL_COLOR,
} from '@/src/constants/colors'
import { HistoryItem } from '@/src/types/HistoryItem'
import { MOCK_HISTORY_DATA } from '@/src/constants/mockValues'
import { groupByDateCategory } from '@/src/utils/groupByDateCategory'

const operationStyle = (token: HistoryItem) => {
  return [
    historyStyle.tokenText,
    token.operation === 'purchase' && {
      color: OPERATION_PURCHASE_COLOR,
    },
    token.operation === 'add' && {
      color: OPERATION_ADD_COLOR,
    },
    token.operation === 'sell' && {
      color: OPERATION_SELL_COLOR,
    },
  ]
}

/**
 * Компонент `HistoryTokenRow` отвечает за отображение строки с информацией о токене.
 * Включает иконку токена и его название.
 *
 * @param props - Свойства компонента.
 * @param props.token - Объект токена, содержащий информацию о его иконке и названии.
 * @returns {JSX.Element} - JSX-элемент строки с токеном.
 */
function HistoryTokenRow(props: { token: HistoryItem }): JSX.Element {
  return (
    <View style={historyStyle.tokenRow}>
      <MaterialIconWrapper icon={props.token.tokenIcon as MaterialIconName} />
      <MonoText style={historyStyle.tokenText}>
        {props.token.tokenName}
      </MonoText>
    </View>
  )
}

/**
 * Компонент `HistoryDateRow` отвечает за отображение строки с информацией о дате и операции токена.
 * Включает тип операции и дату её выполнения.
 *
 * @param props - Свойства компонента.
 * @param props.token - Объект токена, содержащий информацию о типе операции и дате.
 * @returns {JSX.Element} - JSX-элемент строки с датой и операцией.
 */
function HistoryDateRow(props: { token: HistoryItem }) {
  return (
    <View style={historyStyle.tokenOperationRow}>
      <SimpleText style={operationStyle(props.token)}>
        {props.token.operation}
      </SimpleText>
      <SimpleText style={operationStyle(props.token)}>
        {props.token.date}
      </SimpleText>
    </View>
  )
}

/**
 * Компонент `HistoryRow` отвечает за отображение полной строки истории.
 * Включает информацию о дате, операции и токене, а также разделитель.
 *
 * @param props - Свойства компонента.
 * @param props.historyItem - Объект истории, содержащий информацию о токене, операции и дате.
 * @returns {JSX.Element} - JSX-элемент строки истории.
 */
function HistoryRow(props: { historyItem: HistoryItem }) {
  return (
    <View>
      <HistoryDateRow token={props.historyItem} />
      <HistoryTokenRow token={props.historyItem} />
      <View style={historyStyle.divider} />
    </View>
  )
}

/**
 * Компонент модального окна для добавления токена.
 *
 * @param props.visible - Флаг, определяющий видимость модального окна.
 * @param props.onRequestClose - Функция, вызываемая при закрытии модального окна.
 * @param props
 *
 * @returns {JSX.Element} - JSX-элемент модального окна.
 */
export function HistoryModal(props: {
  visible: boolean
  onRequestClose: () => void
}) {
  const historyData: Record<string, HistoryItem[]> =
    groupByDateCategory(MOCK_HISTORY_DATA)

  return (
    <BaseModal visible={props.visible} onRequestClose={props.onRequestClose}>
      <SimpleText style={styles.modalTitle}>History</SimpleText>
      <FlatList
        data={Object.entries(historyData)}
        keyExtractor={([date]) => date}
        renderItem={({ item: [date, tokens] }) => (
          <View style={historyStyle.historyList}>
            <SimpleText style={historyStyle.dateText}>{date}</SimpleText>
            <View style={historyStyle.historyListByDate}>
              {tokens.map((token, index) => (
                <HistoryRow key={index} historyItem={token} />
              ))}
            </View>
          </View>
        )}
      />
      <View style={styles.buttonRow}>
        <ActionButton text="Cancel" onPress={props.onRequestClose} />
      </View>
    </BaseModal>
  )
}
