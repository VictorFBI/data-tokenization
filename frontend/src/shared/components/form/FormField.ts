import { Setter } from '@/src/shared/types/Setter'

export type FormField<T> = {
  value: T
  onChange: Setter<T>
}
