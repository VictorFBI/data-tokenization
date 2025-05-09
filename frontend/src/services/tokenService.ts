import { Token } from '@/src/types/Token'
import { FilterProps } from '@/src/types/FilterProps'
import { MOCK_TOKENS } from '@/src/constants/mockValues'

// const API_URL = 'https://your-api-url.com';

export const fetchTokens = async (params: FilterProps): Promise<Token[]> => {
  void params
  // try {
  //     const response = await fetch(`${API_URL}/tokens`, {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(params),
  //     });
  //     return await response.json();
  // } catch (error) {
  //     console.error('Error fetching tokens:', error);
  //     return [];
  // }

  // Mock response for demonstration purposes
  return MOCK_TOKENS
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
