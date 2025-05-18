import React from 'react'

export type BaseModalProps = {
  visible: boolean
  onRequestClose: () => void
  children: React.ReactNode
}