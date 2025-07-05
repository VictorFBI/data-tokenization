import { useState } from 'react'
import { MaterialIconName } from '@/src/shared/components/template/MaterialIconName'
import { DocumentPickerResponse } from 'react-native-document-picker'
import { FormField } from '@/src/shared/components/form/FormField'

type AddForm = {
  tokenName: FormField<string>
  tokenDescription: FormField<string>
  tokenIcon: FormField<MaterialIconName | null>
  tokenFile: FormField<DocumentPickerResponse | null>
}

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

  const form: AddForm = {
    tokenName: { value: tokenName, onChange: setTokenName },
    tokenDescription: {
      value: tokenDescription,
      onChange: setTokenDescription,
    },
    tokenIcon: { value: tokenIcon, onChange: setTokenIcon },
    tokenFile: { value: tokenFile, onChange: setTokenFile },
  }

  return {
    form,
    actions: {
      nullifyForm,
      makeForm,
    },
  }
}
