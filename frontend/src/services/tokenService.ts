import { Token } from '@/src/types/Token'
import { FilterProps } from '@/src/types/FilterProps'
import { MOCK_TOKENS } from '@/src/constants/mockValues'
// import log from 'loglevel'

// const API_URL = 'http://localhost:8080'

export const fetchTokens = async (params: FilterProps): Promise<Token[]> => {
  // try {
  //   const response = await fetch(`${API_URL}/tokens`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //     },
  //     body: JSON.stringify(params),
  //   })
  //
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`)
  //   }
  //
  //   return (await response.json()) as Token[]
  // } catch (error) {
  //   log.error('Error fetching token: ' + error)
  //   // Можно добавить обработку разных типов ошибок
  //   return []
  // }
  return MOCK_TOKENS
}

export const addToken = async (
  formData: FormData,
): Promise<{ status: number; token?: Token }> => {
  void formData
  // try {
  //   const response = await fetch('https://your-backend.com/upload', {
  //     method: 'POST',
  //     body: formData,
  //   })
  //
  //   if (!response.ok) {
  //     return { status: response.status }
  //   }
  //
  //   const token = await response.json()
  //   return { status: 200, token }
  // } catch (error) {
  //   console.error('Error adding token:', error)
  //   return { status: 500 }
  // }
  return { status: 200 }
}
