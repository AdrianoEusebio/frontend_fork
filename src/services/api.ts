interface RequestConfig extends RequestInit {
  params?: Record<string, string>
}

interface ApiError extends Error {
  status?: number
  data?: any
}

export class Api {
  private baseUrl: string

  constructor(baseUrl: string = import.meta.env.VITE_API_URL || '') {
    this.baseUrl = baseUrl
  }

  private async request<T>(path: string, config: RequestConfig = {}): Promise<T> {
    const { params, headers = {}, ...rest } = config

    try {
      const queryString = params ? `?${new URLSearchParams(params)}` : ''
      const url = `${this.baseUrl}${path}${queryString}`

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        ...rest,
      })

      if (!response.ok) {
        const error = new Error('API Error') as ApiError
        error.status = response.status
        try {
          error.data = await response.json()
        } catch {
          error.data = await response.text()
        }
        throw error
      }

      if (response.status === 204) {
        return {} as T
      }

      return response.json()
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Network error')
    }
  }

  async get<T>(path: string, config: RequestConfig = {}): Promise<T> {
    return this.request<T>(path, {
      ...config,
      method: 'GET',
    })
  }

  async post<T>(path: string, data?: any, config: RequestConfig = {}): Promise<T> {
    return this.request<T>(path, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(path: string, data?: any, config: RequestConfig = {}): Promise<T> {
    return this.request<T>(path, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async patch<T>(path: string, data?: any, config: RequestConfig = {}): Promise<T> {
    return this.request<T>(path, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(path: string, config: RequestConfig = {}): Promise<T> {
    return this.request<T>(path, {
      ...config,
      method: 'DELETE',
    })
  }
}

const api = new Api()
export default api
