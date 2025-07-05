import { Token } from '@/src/shared/types/Token'

export interface TokensDataProps {
  tokens: Token[]
  onTokenPress: (token: Token) => void
}
