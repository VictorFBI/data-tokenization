import { FormComponentInputProps } from '@/src/types/FormComponentProps'
import React from 'react'
import { FlatList } from 'react-native'
import { styles } from '@/src/styles/BaseModal'
import { FormComponent } from '@/src/components/form/FormComponent'

/**
 * `FormList` is a functional component that renders a list of form components using a `FlatList`.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {FormComponentInputProps[]} props.data - An array of form component input properties, where each item contains the title and the component to render.
 *
 * @returns {JSX.Element} - A `FlatList` that renders the provided form components.
 */
export function FormList(props: { data: FormComponentInputProps[] }) {
  return (
    <FlatList
      data={props.data}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <FormComponent title={item.title}>{item.component}</FormComponent>
      )}
      contentContainerStyle={styles.formContainer}
      style={{ flex: 1 }}
    />
  )
}
