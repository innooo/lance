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

export interface LanceResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: LanceRequestConfig
  request: any
}

export interface LanceResponsePromise<T = any> extends Promise<LanceResponse<T>> {}

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
  interceptors: {
    request: LanceInterceptorManger<LanceRequestConfig>
    response: LanceInterceptorManger<LanceResponse>
  }
  request<T = any>(config: LanceRequestConfig): LanceResponsePromise<T>
  get<T = any>(url: string, config?: LanceRequestConfig): LanceResponsePromise<T>
  delete<T = any>(url: string, config?: LanceRequestConfig): LanceResponsePromise<T>
  head<T = any>(url: string, config?: LanceRequestConfig): LanceResponsePromise<T>
  options<T = any>(url: string, config?: LanceRequestConfig): LanceResponsePromise<T>
  post<T = any>(url: string, data?: any, config?: LanceRequestConfig): LanceResponsePromise<T>
  put<T = any>(url: string, data?: any, config?: LanceRequestConfig): LanceResponsePromise<T>
  patch<T = any>(url: string, data?: any, config?: LanceRequestConfig): LanceResponsePromise<T>
}

export interface LanceInstance extends Lance {
  <T = any>(config: LanceRequestConfig): LanceResponsePromise<T>
  <T = any>(url: string, config?: LanceRequestConfig): LanceResponsePromise<T>
}

export interface ResolveFn<T = any> {
  (val: T): T | Promise<T>
}

export interface RejectFn {
  (error: any): any
}

export interface LanceInterceptorManger<T> {
  use(resolve: ResolveFn<T>, reject?: RejectFn): number
  eject?(id: number): void
}
