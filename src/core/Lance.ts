import { LanceRequestConfig, LanceResponsePromise } from '../types'
import dispatchRequest from './dispatchRequest'

export default class Lance {
  request(url: any, config?: any): LanceResponsePromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    return dispatchRequest(config)
  }
  get(url: string, config?: LanceRequestConfig): LanceResponsePromise {
    return this.request(
      Object.assign(config || {}, {
        method: 'get',
        url
      })
    )
  }
  delete(url: string, config?: LanceRequestConfig): LanceResponsePromise {
    return this.request(
      Object.assign(config || {}, {
        method: 'delete',
        url
      })
    )
  }
  head(url: string, config?: LanceRequestConfig): LanceResponsePromise {
    return this.request(
      Object.assign(config || {}, {
        method: 'head',
        url
      })
    )
  }
  options(url: string, config?: LanceRequestConfig): LanceResponsePromise {
    return this.request(
      Object.assign(config || {}, {
        method: 'options',
        url
      })
    )
  }
  post(url: string, data: any, config?: LanceRequestConfig): LanceResponsePromise {
    return this.request(
      Object.assign(config || {}, {
        method: 'post',
        data,
        url
      })
    )
  }
  put(url: string, data: any, config?: LanceRequestConfig): LanceResponsePromise {
    return this.request(
      Object.assign(config || {}, {
        method: 'put',
        data,
        url
      })
    )
  }
  patch(url: string, data: any, config?: LanceRequestConfig): LanceResponsePromise {
    return this.request(
      Object.assign(config || {}, {
        method: 'patch',
        data,
        url
      })
    )
  }
}
