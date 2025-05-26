import React from 'react'

export interface BaseModalChildrenProps extends BaseModalProps {
  children: React.ReactNode
}

export type BaseModalProps = {
  visible: boolean
  onRequestClose: () => void
}
