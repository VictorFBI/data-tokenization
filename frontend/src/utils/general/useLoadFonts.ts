import { useFonts } from 'expo-font'

import Roboto from '@/assets/fonts/Roboto.ttf'
import RobotoMono from '@/assets/fonts/RobotoMono.ttf'

/**
 * Custom kind of hook to load fonts using Expo's `useFonts` hook.
 *
 * Currently, loads specific fonts: `Roboto` and `RobotoMono` fonts from the assets folder.
 * It returns a boolean value indicating whether the fonts have been successfully loaded.
 *
 * @returns {boolean} `true` if fonts are loaded, otherwise `false`.
 */
export default function useLoadFonts() {
  const [fontsLoaded] = useFonts({
    Roboto,
    RobotoMono,
  })
  return fontsLoaded
}
