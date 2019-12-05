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
  url: string
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
