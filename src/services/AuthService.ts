import { BaseService } from './BaseService'
import type { LoginCredentials } from '../payloads/Login/LoginCredentials'
import type { LoginResponse } from '../payloads/Login/LoginResponse'

export class AuthService extends BaseService {
  protected basePath = '/auth'

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    return this.post<LoginResponse>(this.getPath('/login'), credentials)
  }

  async logout(): Promise<void> {
    return this.post(this.getPath('/logout'))
  }

  async me(): Promise<LoginResponse['user']> {
    return this.get(this.getPath('/me'))
  }
}

export const authService = new AuthService()