import { useCallback, useEffect, useState } from 'react'
import { Token } from '@/src/shared/types/Token'
import { FilterProps } from '@/src/shared/components/tokens-data/FilterProps'
import {
  fetchTokens,
  addToken,
  updateToken,
} from '@/src/shared/services/tokenService'
import log from 'loglevel'

export const useTokens = (initialParams: FilterProps = {}) => {
  const [tokens, setTokens] = useState<Token[]>([])
  const [filterParams, setFilterParams] = useState<FilterProps>(initialParams)
  const [isLoading, setIsLoading] = useState(false)

  const loadTokens = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await fetchTokens(filterParams)
      setTokens(data)
    } finally {
      setIsLoading(false)
    }
  }, [filterParams])

  const handleAddToken = useCallback(
    async (formData: FormData) => {
      try {
        const result = await addToken(formData)
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
        const result = await updateToken(formData)
        await loadTokens()
        return result
      } catch (error) {
        log.error('Error updating token: ' + error)
      }
    },
    [loadTokens],
  )

  useEffect(() => {
    loadTokens()
  }, [loadTokens])

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
