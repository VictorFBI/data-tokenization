import { useState } from 'react'
import { MaterialIconName } from '@/src/types/MaterialIconName'

export const useUpdateForm = () => {
  const [tokenName, setTokenName] = useState('')
  const [tokenDescription, setTokenDescription] = useState('')
  const [tokenIcon, setTokenIcon] = useState<MaterialIconName | null>(null)
  const [isListed, setIsListed] = useState(false)
  const [priceEth, setPriceEth] = useState('')

  const nullifyForm = () => {
    setTokenName('')
    setTokenDescription('')
    setTokenIcon(null)
    setIsListed(false)
    setPriceEth('')
  }

  const makeForm = () => {
    if (!tokenName || !tokenIcon) {
      return
    }
    const formData = new FormData()
    formData.append('tokenName', tokenName)
    formData.append('tokenIcon', tokenIcon)
    formData.append('tokenDescription', tokenDescription)
    formData.append('isListed', String(isListed))
    formData.append('priceEth', priceEth)
    return formData
  }
  return {
    tokenName,
    setTokenName,
    tokenDescription,
    setTokenDescription,
    tokenIcon,
    setTokenIcon,
    isListed,
    setIsListed,
    priceEth,
    setPriceEth,
    nullifyForm,
    makeForm,
  }
}
