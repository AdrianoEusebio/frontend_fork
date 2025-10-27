import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode
}

export default function Button({ children, ...rest }: Props) {
  return (
    <button {...rest} style={{ padding: '8px 12px', borderRadius: 6 }}>
      {children}
    </button>
  )
}
