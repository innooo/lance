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
