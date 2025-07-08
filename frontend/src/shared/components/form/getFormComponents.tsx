import React from 'react'
import { StyleSheet, Switch, View } from 'react-native'
import { FormTextInput } from '@/src/shared/components/form/FormTextInput'
import { Translation } from '@/src/shared/types/Translation'
import { FormComponentInputProps } from '@/src/shared/components/form/FormComponentProps'
import { DocumentPickerResponse } from 'react-native-document-picker'
import { AttachFile } from '@/src/shared/components/form/AttachFile'
import { MaterialIconName } from '@/src/shared/components/template/MaterialIconName'
import { FormIconList } from '@/src/shared/components/form/FormIconList'
import { ICONS } from '@/src/shared/constants/icons'
import { SimpleText } from '@/src/shared/components/template'
import {
  MAIN_COLOR,
  SWITCH_ON_BG_COLOR,
  TEXT_COLOR,
} from '@/src/shared/constants/colors'
import { FormField } from '@/src/shared/components/form/FormField'

// Существующие компоненты форм...
export const tokenFileForm = (
  t: Translation,
  form: FormField<DocumentPickerResponse | null>,
): FormComponentInputProps => ({
  title: t('form.file'),
  component: <AttachFile tokenFile={form.value} setTokenFile={form.onChange} />,
})

export const tokenNameForm = (
  t: Translation,
  form: FormField<string>,
): FormComponentInputProps => ({
  title: t('form.name'),
  component: (
    <FormTextInput
      value={form.value}
      placeholder={'example_name'}
      onChangeText={form.onChange}
    />
  ),
})

export const tokenIconForm = (
  t: Translation,
  form: FormField<MaterialIconName | null>,
): FormComponentInputProps => ({
  title: t('form.icon'),
  component: (
    <FormIconList
      data={ICONS}
      selectedIcon={form.value}
      onIconPress={form.onChange}
    />
  ),
})

export const tokenDescriptionForm = (
  t: Translation,
  form: FormField<string>,
): FormComponentInputProps => ({
  title: t('form.desc'),
  component: (
    <FormTextInput
      value={form.value}
      placeholder={t('form.descPlaceholder')}
      onChangeText={form.onChange}
      multiline
    />
  ),
})

// Новый компонент для выставки на рынок и цены
export const tokenMarketForm = (
  t: Translation,
  isListed: FormField<boolean>,
  priceEth: FormField<string>,
): FormComponentInputProps => ({
  title: t('form.market'),
  component: (
    <View style={styles.container}>
      <View style={styles.row}>
        <SimpleText style={styles.label}>{t('form.marketToggle')}</SimpleText>
        <Switch
          value={isListed.value}
          onValueChange={value => {
            isListed.onChange(value)
            priceEth.onChange('')
          }}
          trackColor={{ true: SWITCH_ON_BG_COLOR }}
        />
      </View>
      {isListed.value && (
        <FormTextInput
          value={priceEth.value}
          placeholder={t('form.pricePlaceholder')}
          onChangeText={(text: string) => {
            priceEth.onChange(formatPriceInput(text))
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
  label: {
    flex: 1,
    backgroundColor: MAIN_COLOR,
    borderRadius: 6,
    padding: 8,
    color: TEXT_COLOR,
    fontSize: 16,
  },
})
