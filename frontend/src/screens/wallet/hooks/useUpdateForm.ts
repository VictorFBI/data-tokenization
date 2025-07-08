import { useState } from 'react'
import { MaterialIconName } from '@/src/shared/components/template/MaterialIconName'
import { FormField } from '@/src/shared/components/form/FormField'

type UpdateForm = {
  tokenName: FormField<string>
  tokenDescription: FormField<string>
  tokenIcon: FormField<MaterialIconName | null>
  isListed: FormField<boolean>
  priceEth: FormField<string>
}

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

  const form: UpdateForm = {
    tokenName: { value: tokenName, onChange: setTokenName },
    tokenDescription: {
      value: tokenDescription,
      onChange: setTokenDescription,
    },
    tokenIcon: { value: tokenIcon, onChange: setTokenIcon },
    isListed: { value: isListed, onChange: setIsListed },
    priceEth: { value: priceEth, onChange: setPriceEth },
  }

  return {
    form,
    actions: {
      nullifyForm,
      makeForm,
    },
  }
}
