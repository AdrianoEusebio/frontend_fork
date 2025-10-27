import type { User } from "./User"

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (u: User) => void
  logout: () => void
}