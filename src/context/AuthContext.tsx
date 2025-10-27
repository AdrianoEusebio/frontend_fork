import { createContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { AuthContextType } from '../interfaces/User/AuthContextType'
import type { User } from '../interfaces/User/User'

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  function login(u: { name: string }) {
    setUser({ name: u.name })
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
