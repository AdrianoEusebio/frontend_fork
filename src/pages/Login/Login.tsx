import { useState } from 'react'
import useAuth from '../../hooks/useAuth'

export default function Login() {
  const [name, setName] = useState('')
  const { login } = useAuth()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    login({ name })
    console.log(name)
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="card">
        <label>
          Nome
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <div style={{ height: 8 }} />
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}
