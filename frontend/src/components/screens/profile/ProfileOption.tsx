import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {
  DIVIDER_COLOR,
  ICON_BG_COLOR,
  TAB_COLOR,
  TEXT_COLOR,
} from '@/src/constants/colors'
import { MaterialIconName } from '@/src/types/MaterialIconName'
import { MaterialIconWrapper } from '@/src/components/default-elements-overridings/MaterialIconWrapper'

export interface OptionProps {
  icon: MaterialIconName
  label: string
  value?: string
  onPress?: () => void
}

interface OptionsProps {
  options: OptionProps[]
}

/**
 * Компонент Options отвечает за отображение списка опций профиля.
 *
 * @param root0 - объект, содержащий свойства компонента.
 * @param root0.options - массив опций, каждая из которых содержит иконку, метку, значение и обработчик нажатия.
 *
 * @returns {JSX.Element} - возвращает элемент View, содержащий список опций.
 */
export default function Options({ options }: OptionsProps): JSX.Element {
  return (
    <View style={styles.card}>
      {options.map((option, index) => (
        <ProfileOption
          key={index}
          icon={option.icon}
          label={option.label}
          value={option.value}
          onPress={option.onPress}
        />
      ))}
    </View>
  )
}

/**
 * Компонент ProfileOption отвечает за отображение одной опции профиля.
 *
 * @param root0 - объект, содержащий свойства компонента.
 * @param root0.icon - название иконки, отображаемой в опции.
 * @param root0.label - текстовая метка опции.
 * @param root0.value - дополнительное значение, отображаемое рядом с меткой (опционально).
 * @param root0.onPress - функция-обработчик, вызываемая при нажатии на опцию (опционально).
 *
 * @returns {JSX.Element} - возвращает элемент TouchableOpacity, представляющий одну опцию.
 */
function ProfileOption({
  icon,
  label,
  value,
  onPress,
}: OptionProps): JSX.Element {
  return (
    <TouchableOpacity style={styles.option} onPress={onPress}>
      <MaterialIconWrapper icon={icon} />
      <Text style={styles.label}>{label}</Text>
      {value && <Text style={styles.value}>{value}</Text>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: TAB_COLOR,
    padding: 16,
    borderRadius: 16,
    gap: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: TAB_COLOR,
  },
  iconContainer: {
    padding: 4,
    borderRadius: 4,
    color: DIVIDER_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ICON_BG_COLOR,
  },
  label: {
    flex: 1,
    color: TEXT_COLOR,
    fontSize: 16,
    marginLeft: 10,
    fontFamily: 'monospace',
  },
  value: {
    fontSize: 16,
    color: '#929EB5',
    fontFamily: 'monospace',
  },
})
