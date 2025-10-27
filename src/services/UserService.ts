import { BaseService } from './BaseService'
import type { User } from '../payloads/User/User'
import type { CreateUserData } from '../payloads/User/CreateUserData'
import type { UpdateUserData } from '../payloads/User/UpdateUserData'

export class UserService extends BaseService {
  protected basePath = '/users'

  async list(params?: { role?: string; search?: string }): Promise<User[]> {
    return this.get<User[]>(this.getPath(), { params })
  }

  async getById(id: number): Promise<User> {
    return this.get<User>(this.getPath(`/${id}`))
  }

  async create(data: CreateUserData): Promise<User> {
    return this.post<User>(this.getPath(), data)
  }

  async update(id: number, data: UpdateUserData): Promise<User> {
    return this.patch<User>(this.getPath(`/${id}`), data)
  }

  async remove(id: number): Promise<void> {
    return this.delete(this.getPath(`/${id}`))
  }
}

export const userService = new UserService()