type Method =
  | 'GET'
  | 'get'
  | 'DELETE'
  | 'delete'
  | 'POST'
  | 'post'
  | 'OPTIONS'
  | 'options'
  | 'HEAD'
  | 'head'
  | 'PATCH'
  | 'patch'
  | 'PUT'
  | 'put'

export interface LanceRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType // 返回数据类型
  timeout?: number
}

export interface LanceResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: LanceRequestConfig
  request: any
}

export interface LanceResponsePromise extends Promise<LanceResponse> {}

export interface LanceResponseError extends Error {
  config: LanceRequestConfig
  isLanceError: boolean
  request?: any
  response?: LanceResponse
  code?: string | null
}
/**
 * request
 * get
 * delete
 * head
 * options
 * post
 * put
 * patch
 */
export interface Lance {
  request(config: LanceRequestConfig): LanceResponsePromise
  get(url: string, config?: LanceRequestConfig): LanceResponsePromise
  delete(url: string, config?: LanceRequestConfig): LanceResponsePromise
  head(url: string, config?: LanceRequestConfig): LanceResponsePromise
  options(url: string, config?: LanceRequestConfig): LanceResponsePromise
  post(url: string, data?: any, config?: LanceRequestConfig): LanceResponsePromise
  put(url: string, data?: any, config?: LanceRequestConfig): LanceResponsePromise
  patch(url: string, data?: any, config?: LanceRequestConfig): LanceResponsePromise
}

export interface LanceInstance extends Lance {
  (config: LanceRequestConfig): LanceResponsePromise
  (url: string, config?: LanceRequestConfig): LanceResponsePromise
}
