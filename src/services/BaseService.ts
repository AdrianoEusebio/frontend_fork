import { Api } from './api'

export abstract class BaseService extends Api {
  protected abstract basePath: string

  constructor() {
    super()
  }

  protected getPath(path: string = ''): string {
    return `${this.basePath}${path}`
  }
}
