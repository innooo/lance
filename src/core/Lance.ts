import {
  LanceRequestConfig,
  LanceResponsePromise,
  LanceResponse,
  ResolveFn,
  RejectFn
} from '../types'
import InterceptorManager from './InterceptorManager'
import dispatchRequest from './dispatchRequest'

interface Interceptors {
  request: InterceptorManager<LanceRequestConfig>
  response: InterceptorManager<LanceResponse>
}

interface RequestPromiseChain<T> {
  resolve: ResolveFn<T> | ((config: LanceRequestConfig) => LanceResponsePromise)
  reject?: RejectFn
}

export default class Lance {
  interceptors: Interceptors
  constructor() {
    this.interceptors = {
      request: new InterceptorManager<LanceRequestConfig>(),
      response: new InterceptorManager<LanceResponse>()
    }
  }
  request(url: any, config?: any): LanceResponsePromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    const chain: RequestPromiseChain<any>[] = [
      {
        resolve: dispatchRequest,
        reject: undefined
      }
    ]

    let P = Promise.resolve(config)

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    while (chain.length) {
      const { resolve, reject } = chain.shift()!
      P = P.then(resolve, reject)
    }

    return P
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
