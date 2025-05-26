import React from 'react'
import { StyleSheet, Switch, View } from 'react-native'
import { FormTextInput } from '@/src/components/form/FormTextInput'
import { Translation } from '@/src/types/Translation'
import { FormComponentInputProps } from '@/src/types/FormComponentProps'
import { DocumentPickerResponse } from 'react-native-document-picker'
import { AttachFile } from '@/src/components/form/AttachFile'
import { MaterialIconName } from '@/src/types/MaterialIconName'
import { FormIconList } from '@/src/components/form/FormIconList'
import { ICONS } from '@/src/constants/icons'
import SimpleText from '@/src/components/default-elements-overridings/SimpleText'
import {
  MAIN_COLOR,
  SWITCH_ON_BG_COLOR,
  TEXT_COLOR,
} from '@/src/constants/colors'
import { Setter } from '@/src/types/Setter'

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
