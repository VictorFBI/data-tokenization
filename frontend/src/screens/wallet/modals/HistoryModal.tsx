import React from 'react'
import { MaterialIconName } from '@/src/shared/components/template/MaterialIconName'
import { BaseModal } from '@/src/shared/components/modal/BaseModal'
import { FlatList, View } from 'react-native'
import { ActionButton } from '@/src/shared/components/modal/ActionButton'
import { historyStyle } from '@/src/shared/styles/WalletModal'
import {
  SimpleText,
  MonoText,
  MaterialIconWrapper,
} from '@/src/shared/components/template'
import {
  OPERATION_ADD_COLOR,
  OPERATION_PURCHASE_COLOR,
  OPERATION_SELL_COLOR,
} from '@/src/shared/constants/colors'
import { HistoryItem } from '@/src/screens/wallet/modals/HistoryItem'
import { MOCK_HISTORY_DATA } from '@/src/shared/constants/mockValues'
import { groupByDateCategory } from '@/src/screens/wallet/modals/groupByDateCategory'
import { useTranslation } from 'react-i18next'
import { DateCategory } from '@/src/screens/wallet/modals/DateCategoryEnum'
import { dateCategoryToLocalePath } from '@/src/shared/constants/map-converters/dateCategoryConverter'
import { tokenOperationToLocalePath } from '@/src/shared/constants/map-converters/tokenOperationConverter'
import { TokenOperation } from '@/src/screens/wallet/modals/TokenOperationEnum'
import { BaseModalProps } from '@/src/shared/components/modal/BaseModalProps'
import { styles } from '@/src/shared/styles/BaseModal'

const operationStyle = (token: HistoryItem) => {
  return [
    historyStyle.tokenText,
    token.operation === TokenOperation.Purchase && {
      color: OPERATION_PURCHASE_COLOR,
    },
    token.operation === TokenOperation.Add && {
      color: OPERATION_ADD_COLOR,
    },
    token.operation === TokenOperation.Sell && {
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
  const { t } = useTranslation()
  return (
    <View style={historyStyle.tokenOperationRow}>
      <SimpleText style={operationStyle(props.token)}>
        {t(tokenOperationToLocalePath[props.token.operation])}
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
export function HistoryModal(props: BaseModalProps): JSX.Element {
  const { t } = useTranslation()
  const historyData: Record<DateCategory, HistoryItem[]> =
    groupByDateCategory(MOCK_HISTORY_DATA)

  return (
    <BaseModal visible={props.visible} onRequestClose={props.onRequestClose}>
      <SimpleText style={styles.modalTitle}>
        {t('walletScreen.history.header')}
      </SimpleText>
      <FlatList
        data={Object.entries(historyData)}
        keyExtractor={([date]) => date}
        renderItem={({ item: [date, tokens] }) => (
          <View style={historyStyle.historyList}>
            <SimpleText style={historyStyle.dateText}>
              {t(dateCategoryToLocalePath[date as DateCategory])}
            </SimpleText>
            <View style={historyStyle.historyListByDate}>
              {tokens.map((token, index) => (
                <HistoryRow key={index} historyItem={token} />
              ))}
            </View>
          </View>
        )}
      />
      <View style={styles.buttonRow}>
        <ActionButton
          text={t('walletScreen.history.cancel')}
          onPress={props.onRequestClose}
        />
      </View>
    </BaseModal>
  )
}
