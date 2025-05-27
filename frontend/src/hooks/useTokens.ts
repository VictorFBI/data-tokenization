import { useCallback, useEffect, useState } from 'react'
import { Token } from '@/src/types/Token'
import { FilterProps } from '@/src/types/FilterProps'
import {
  fetchTokens as mockFetchTokens,
  addToken as mockAddToken,
  updateToken as mockUpdateToken,
} from '@/src/services/mockTokenService' // <-- здесь меняем на наш mock
import log from 'loglevel'

export const useTokens = (
  initialParams: FilterProps = {
    sort: null,
    startDate: null,
    endDate: null,
    icon: null,
  },
) => {
  const [tokens, setTokens] = useState<Token[]>([])
  const [filterParams, setFilterParams] = useState<FilterProps>(initialParams)
  const [isLoading, setIsLoading] = useState(false)

  const loadTokens = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await mockFetchTokens(filterParams)
      log.info(data)
      setTokens(data)
    } finally {
      setIsLoading(false)
    }
  }, [filterParams])

  const handleAddToken = useCallback(
    async (formData: FormData) => {
      try {
        const result = await mockAddToken(formData)
        await loadTokens()
        return result
      } catch (error) {
        log.error('Error adding token: ' + error)
      }
    },
    [loadTokens],
  )

  const handleUpdateToken = useCallback(
    async (formData: FormData) => {
      try {
        const result = await mockUpdateToken(formData)
        await loadTokens()
        return result
      } catch (error) {
        log.error('Error updating token: ' + error)
      }
    },
    [loadTokens],
  )

  return {
    tokens,
    isLoading,
    filterParams,
    setFilterParams,
    handleAddToken,
    refreshTokens: loadTokens,
    handleUpdateToken,
  }
}
