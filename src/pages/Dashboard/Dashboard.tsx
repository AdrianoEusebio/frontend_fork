import { useEffect } from 'react'
import useAuth from '../../hooks/useAuth'

export default function Dashboard() {
  const { user } = useAuth()

  useEffect(() => {
    // placeholder for dashboard effect
  }, [])

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <p>Welcome back{user ? `, ${user.name}` : ''}.</p>
    </div>
  )
}
