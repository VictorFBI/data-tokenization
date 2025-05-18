import { useState } from 'react'
import { MaterialIconName } from '@/src/types/MaterialIconName'
import { DocumentPickerResponse } from 'react-native-document-picker'

export const useAddForm = () => {
  const [tokenName, setTokenName] = useState('')
  const [tokenDescription, setTokenDescription] = useState('')
  const [tokenIcon, setTokenIcon] = useState<MaterialIconName | null>(null)
  const [tokenFile, setTokenFile] = useState<DocumentPickerResponse | null>(
    null,
  )

  const nullifyForm = () => {
    setTokenName('')
    setTokenDescription('')
    setTokenIcon(null)
    setTokenFile(null)
  }

  const makeForm = () => {
    if (!tokenName || !tokenFile || !tokenIcon) {
      return
    }
    const formData = new FormData()
    formData.append('tokenName', tokenName)
    formData.append('tokenFile', {
      uri: tokenFile.uri,
      name: tokenFile.name,
      type: tokenFile.type || 'application/octet-stream',
    } as never)
    formData.append('tokenIcon', tokenIcon)
    formData.append('tokenDescription', tokenDescription)
    return formData
  }
  return {
    tokenName,
    setTokenName,
    tokenDescription,
    setTokenDescription,
    tokenIcon,
    setTokenIcon,
    tokenFile,
    setTokenFile,
    nullifyForm,
    makeForm,
  }
}