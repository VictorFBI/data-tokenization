import { Token } from '@/src/types/Token'
import { FilterProps } from '@/src/types/FilterProps'
import { MOCK_TOKENS } from '@/src/constants/mockValues'

const API_URL = 'http://localhost:8080'

export const fetchTokens = async (params: FilterProps): Promise<Token[]> => {
  try {
    const response = await fetch(`${API_URL}/tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return (await response.json()) as Token[]
  } catch (error) {
    alert('Error fetching tokens: ' + error)
    // Можно добавить обработку разных типов ошибок
    return []
  }
}

export const addToken = async (tokenData: Partial<Token>): Promise<Token> => {
  void tokenData
  // try {
  //     const response = await fetch(`${API_URL}/tokens/add`, {
  //         method: 'POST',
  //         body: JSON.stringify(tokenData),
  //     });
  //     return await response.json();
  // } catch (error) {
  //     console.error('Error adding token:', error);
  //     throw error;
  // }

  // Mock response for demonstration purposes
  return MOCK_TOKENS[0]
}
