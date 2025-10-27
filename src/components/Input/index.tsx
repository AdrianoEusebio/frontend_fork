import React from 'react'

type Props = React.InputHTMLAttributes<HTMLInputElement>

export default function Input(props: Props) {
  return <input {...props} style={{ padding: '8px', borderRadius: 6, border: '1px solid #d1d5db' }} />
}
