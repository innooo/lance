import { LanceResponseError, LanceRequestConfig, LanceResponse } from '../types'

export class LanceError extends Error {
  isLanceError: boolean
  config: LanceRequestConfig
  request?: any
  response?: LanceResponse
  code?: string | null
  constructor(
    message: string | undefined,
    config: LanceRequestConfig,
    code?: string | null,
    request?: any,
    response?: LanceResponse
  ) {
    super(message)
    this.isLanceError = true
    this.code = code
    this.config = config
    this.request = request
    this.response = response
  }
}

export function createError(
  message: string | undefined,
  config: LanceRequestConfig,
  code?: string | null,
  request?: any,
  response?: LanceResponse
): LanceResponseError {
  return new LanceError(message, config, code, request, response)
}
