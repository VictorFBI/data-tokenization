import { MaterialIcons } from '@expo/vector-icons'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles, iconStyle } from '@/src/shared/styles/WalletButton'
import { WalletButtonProps } from '@/src/screens/wallet/WalletButtonProps'

export const WalletButtons = ({
  walletButtons,
}: {
  walletButtons: WalletButtonProps[]
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
      }}
    >
      {walletButtons.map((button: WalletButtonProps, key: number) => (
        <WalletButton
          key={key}
          iconName={button.iconName}
          buttonText={button.buttonText}
          onPress={button.onPress}
        />
      ))}
    </View>
  )
}

const WalletButton = (button: WalletButtonProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={button.onPress}>
        <MaterialIcons
          name={button.iconName}
          size={iconStyle.size}
          color={iconStyle.color}
        />
      </TouchableOpacity>
      <Text style={styles.text}>{button.buttonText}</Text>
    </View>
  )
}
