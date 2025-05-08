import { Token } from '@/src/types/Token'

export interface TokensDataProps {
  tokens: Token[]
  onTokenPress: (token: Token) => void
}
