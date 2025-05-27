import { BaseModalProps } from '@/src/types/BaseModalProps'
import { BaseModal } from '@/src/components/modal/BaseModal'
import SimpleText from '@/src/components/default-elements-overridings/SimpleText'
import { styles } from '@/src/styles/BaseModal'
import { FormList } from '@/src/components/form/FormList'
import { ActionButton } from '@/src/components/modal/ActionButton'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FormComponentInputProps } from '@/src/types/FormComponentProps'
import { View } from 'react-native'
import { FilterProps } from '@/src/types/FilterProps'
import { Setter } from '@/src/types/Setter'
import {
  dateRangeForm,
  sortOrderForm,
  tokenIconForm,
} from '@/src/utils/forms/getFormComponents'
import { MaterialIconName } from '@/src/types/MaterialIconName'

interface FilterModalProps extends BaseModalProps {
  filterProps: FilterProps
  setFilterProps: Setter<FilterProps>
}

/**
 *
 * @param root0
 * @param root0.visible
 * @param root0.onRequestClose
 * @param root0.filterProps
 * @param root0.setFilterProps
 */
export function FilterModal({
  visible,
  onRequestClose,
  filterProps,
  setFilterProps,
}: FilterModalProps): JSX.Element {
  const { t } = useTranslation()

  const setStartDate: Setter<Date | null> = date => {
    setFilterProps(prev => ({ ...prev, startDate: date as Date }))
  }
  const setEndDate: Setter<Date | null> = date => {
    setFilterProps(prev => ({ ...prev, endDate: date as Date }))
  }
  // const setSort: Setter<'asc' | 'desc' | null> = sort => {
  //   setFilterProps(prev => ({ ...prev, sort: sort as 'asc' | 'desc' | null }))
  // }

  const formFields: FormComponentInputProps[] = [
    dateRangeForm(
      t,
      filterProps.startDate,
      setStartDate,
      filterProps.endDate,
      setEndDate,
    ),
    // sortOrderForm(t, filterProps.sort, setSort),
    tokenIconForm(t, filterProps.icon, icon => {
      setFilterProps(prev => ({
        ...prev,
        icon: icon as MaterialIconName | null,
      }))
    }),
  ]

  return (
    <BaseModal visible={visible} onRequestClose={onRequestClose}>
      <SimpleText style={styles.modalTitle}>{t('filter.header')}</SimpleText>
      <FormList data={formFields} />
      <View style={styles.buttonRow}>
        <ActionButton
          text={t('filter.clear')}
          onPress={() => {
            setFilterProps({
              search: filterProps.search,
              sort: null,
              userID: undefined,
              startDate: null,
              endDate: null,
              icon: null,
            })
            onRequestClose()
          }}
        />
        <ActionButton
          text={t('filter.save')}
          onPress={() => {
            onRequestClose()
          }}
        />
      </View>
    </BaseModal>
  )
}
