import React, { useState } from 'react'
import { StyleSheet, Switch, TouchableOpacity, View } from 'react-native'
import { FormTextInput } from '@/src/components/form/FormTextInput'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { Translation } from '@/src/types/Translation'
import { FormComponentInputProps } from '@/src/types/FormComponentProps'
import { DocumentPickerResponse } from 'react-native-document-picker'
import { AttachFile } from '@/src/components/form/AttachFile'
import { MaterialIconName } from '@/src/types/MaterialIconName'
import { FormIconList } from '@/src/components/form/FormIconList'
import { ICONS } from '@/src/constants/icons'
import SimpleText from '@/src/components/default-elements-overridings/SimpleText'
import {
  BG_COLOR,
  MAIN_COLOR,
  SWITCH_ON_BG_COLOR,
  TEXT_COLOR,
} from '@/src/constants/colors'
import { Setter } from '@/src/types/Setter'
import { Picker } from '@react-native-picker/picker'

// Существующие компоненты форм...
export const tokenFileForm = (
  t: Translation,
  tokenFile: DocumentPickerResponse | null,
  setTokenFile: Setter<DocumentPickerResponse | null>,
): FormComponentInputProps => ({
  title: t('form.file'),
  component: <AttachFile tokenFile={tokenFile} setTokenFile={setTokenFile} />,
})

export const tokenNameForm = (
  t: Translation,
  tokenName: string,
  setTokenName: Setter<string>,
): FormComponentInputProps => ({
  title: t('form.name'),
  component: (
    <FormTextInput
      value={tokenName}
      placeholder={'example_name'}
      onChangeText={setTokenName}
    />
  ),
})

export const tokenIconForm = (
  t: Translation,
  tokenIcon: MaterialIconName | null,
  setTokenIcon: Setter<MaterialIconName | null>,
): FormComponentInputProps => ({
  title: t('form.icon'),
  component: (
    <FormIconList
      data={ICONS}
      selectedIcon={tokenIcon}
      onIconPress={icon => setTokenIcon(icon)}
    />
  ),
})

export const tokenDescriptionForm = (
  t: Translation,
  tokenDescription: string,
  setTokenDescription: Setter<string>,
): FormComponentInputProps => ({
  title: t('form.desc'),
  component: (
    <FormTextInput
      value={tokenDescription}
      placeholder={t('form.descPlaceholder')}
      onChangeText={setTokenDescription}
      multiline
    />
  ),
})

// Новый компонент для выставки на рынок и цены
export const tokenMarketForm = (
  t: Translation,
  isListed: boolean,
  setIsListed: Setter<boolean>,
  priceEth: string,
  setPriceEth: Setter<string>,
): FormComponentInputProps => ({
  title: t('form.market'),
  component: (
    <View style={styles.container}>
      <View style={styles.row}>
        <SimpleText style={styles.label}>{t('form.marketToggle')}</SimpleText>
        <Switch
          value={isListed}
          onValueChange={value => {
            setIsListed(value)
            setPriceEth('')
          }}
          trackColor={{ true: SWITCH_ON_BG_COLOR }}
        />
      </View>
      {isListed && (
        <FormTextInput
          value={priceEth}
          placeholder={t('form.pricePlaceholder')}
          onChangeText={(text: string) => {
            setPriceEth(formatPriceInput(text))
          }}
          keyboardType="decimal-pad"
        />
      )}
    </View>
  ),
})

const formatPriceInput = (text: string): string => {
  const onlyValid = text.replace(/[^0-9.]/g, '')
  const parts = onlyValid.split('.')
  if (parts.length <= 2) {
    return parts.length === 2 ? `${parts[0]}.${parts[1]}` : parts[0]
  }
  return ''
}

// Форма: выбор диапазона дат
export const dateRangeForm = (
  t: Translation,
  startDate: Date | null,
  setStartDate: Setter<Date | null>,
  endDate: Date | null,
  setEndDate: Setter<Date | null>,
): FormComponentInputProps => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [pickerType, setPickerType] = useState<'start' | 'end' | null>(null)

  const showPicker = (type: 'start' | 'end') => setPickerType(type)
  const hidePicker = () => setPickerType(null)

  const handleConfirm = (date: Date) => {
    if (pickerType === 'start') setStartDate(date)
    else if (pickerType === 'end') setEndDate(date)
    hidePicker()
  }

  const formatDate = (d: Date | null) =>
    d ? d.toLocaleDateString() : t('form.selectDate')

  return {
    title: t('form.dateRange'),
    component: (
      <View style={styles.container}>
        {(
          [
            {
              label: t('form.startDate'),
              date: startDate,
              type: 'start',
              clear: () => setStartDate(null),
            },
            {
              label: t('form.endDate'),
              date: endDate,
              type: 'end',
              clear: () => setEndDate(null),
            },
          ] as const
        ).map(({ label, date, type, clear }) => (
          <View key={label} style={styles.dateRow}>
            <SimpleText style={styles.label}>{label}</SimpleText>
            <TouchableOpacity
              style={[
                styles.dateButton,
                date ? styles.opaque : styles.transparent,
              ]}
              onPress={() => showPicker(type)}
            >
              <SimpleText style={styles.dateText}>
                {formatDate(date)}
              </SimpleText>
            </TouchableOpacity>
            {date && (
              <TouchableOpacity style={{ padding: 8 }} onPress={clear}>
                <SimpleText style={styles.clearText}>
                  {t('form.clear')}
                </SimpleText>
              </TouchableOpacity>
            )}
          </View>
        ))}

        <DateTimePickerModal
          isVisible={pickerType !== null}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hidePicker}
        />
      </View>
    ),
  }
}

const OPTIONS: { label: string; value: 'none' | 'asc' | 'desc' }[] = [
  { label: '—', value: 'none' },
  { label: 'ASC', value: 'asc' },
  { label: 'DESC', value: 'desc' },
]

export const sortOrderForm = (
  t: Translation,
  asc: 'asc' | 'desc' | null,
  setAsc: Setter<'asc' | 'desc' | null>,
): FormComponentInputProps => {
  // map null to 'none'
  const selected = asc === null ? 'none' : asc

  const onValueChange = (val: 'none' | 'asc' | 'desc') => {
    setAsc(val === 'none' ? null : val)
  }

  return {
    title: t('form.sortOrder'),
    component: (
      <View style={styles.container}>
        <SimpleText style={styles.label}>{t('form.sortToggle')}</SimpleText>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selected}
            onValueChange={onValueChange}
            mode="dialog" // uses native picker with wheel on iOS, spinner on Android
            style={styles.picker}
          >
            {OPTIONS.map(opt => (
              <Picker.Item
                key={opt.value}
                label={t(`form.${opt.label.toLowerCase()}`) || opt.label}
                value={opt.value}
                color={TEXT_COLOR}
              />
            ))}
          </Picker>
        </View>
      </View>
    ),
  }
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  priceRow: {
    marginTop: 8,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: MAIN_COLOR,
    borderRadius: 6,
    overflow: 'hidden',
  },
  picker: {
    height: 44,
    width: '100%',
  },
  label: {
    flex: 1,
    backgroundColor: MAIN_COLOR,
    borderRadius: 6,
    padding: 8,
    color: TEXT_COLOR,
    fontSize: 16,
  },
  label2: {
    flex: 1,
    borderRadius: 6,
    padding: 8,
    color: TEXT_COLOR,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  dateRow: {
    flexDirection: 'row',
    backgroundColor: MAIN_COLOR,
    borderRadius: 6,
    color: TEXT_COLOR,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  dateButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: MAIN_COLOR,
    borderRadius: 6,
  },
  dateText: {
    fontSize: 16,
    color: TEXT_COLOR,
  },
  transparent: {
    opacity: 0.5,
  },
  opaque: {
    opacity: 1,
  },
  clearText: {
    fontSize: 16,
    color: TEXT_COLOR,
  },
  selectorButton: {
    borderWidth: 1,
    borderColor: MAIN_COLOR,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  selectorText: {
    fontSize: 16,
    color: TEXT_COLOR,
  },
  backdrop: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingVertical: 16,
  },
  optionRow: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 16,
    color: TEXT_COLOR,
  },
})
