import { Token } from '@/src/types/Token'
import { FilterProps } from '@/src/types/FilterProps'
import AsyncStorage from '@react-native-async-storage/async-storage'
import log from 'loglevel'
import { MaterialIconName } from '@/src/types/MaterialIconName'

const STORAGE_KEY = 'MOCK_TOKENS'

// Utility to delay (simulate network)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Load tokens from AsyncStorage
const loadAll = async (): Promise<Token[]> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY)
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY)
      const tokens = json ? JSON.parse(json) : []
      const filteredTokens = tokens.filter(
        (token: Token) =>
          token.name !== 'NewToken' && token.name !== 'My_steps',
      )
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTokens))
    } catch (e) {
      log.error('Failed to remove specific tokens', e)
    }
    return json ? JSON.parse(json) : []
  } catch (e) {
    log.error('Failed to load tokens', e)
    return []
  }
}

// Save tokens to AsyncStorage
const saveAll = async (tokens: Token[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tokens))
  } catch (e) {
    log.error('Failed to save tokens', e)
  }
}

// Fetch tokens with optional filtering
export const fetchTokens = async (
  params: FilterProps = {
    sort: null,
    startDate: null,
    endDate: null,
    icon: null,
  },
): Promise<Token[]> => {
  await delay(300)
  const all = await loadAll()
  let result = all

  // Example filter: by name or symbol
  if (params.search) {
    const searchLower = params.search.toLowerCase()
    result = result.filter(t => t.name.toLowerCase().includes(searchLower))
  }

  if (params.icon) {
    result = result.filter(t => t.icon === params.icon)
  }

  // TODO: add pagination or sorting if needed
  return result
}

// Add a new token
export const addToken = async (form: FormData): Promise<Token> => {
  await delay(300)
  const all = await loadAll()

  // Extract fields from FormData
  // Adjust keys according to Token type
  const id = form.get('tokenName') as string
  const name = form.get('tokenName') as string
  const icon = form.get('tokenIcon') as MaterialIconName
  const description = form.get('tokenDescription') as string

  const newToken: Token = {
    id,
    name,
    icon,
    description,
  }
  const updated = [...all, newToken]

  await saveAll(updated)
  return newToken
}

// Update an existing token
export const updateToken = async (form: FormData): Promise<Token> => {
  await delay(300)
  const all = await loadAll()
  const id = form.get('tokenName') as string

  const idx = all.findIndex(t => t.id === id)
  if (idx === -1) {
    throw new Error(`Token with id ${id} not found`)
  }

  // Extract updated values
  const name = form.get('tokenName') as string
  const icon = form.get('tokenIcon') as MaterialIconName
  const description = form.get('tokenDescription') as string

  const updatedToken: Token = {
    ...all[idx],
    name,
    icon,
    description,
  }
  const updatedList = [...all]
  updatedList[idx] = updatedToken
  await saveAll(updatedList)
  return updatedToken
}
