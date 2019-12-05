import { LanceRequestConfig, LanceResponsePromise, LanceResponse } from './types'
import { buildURL } from './helpers/url'
import { transformRequestData, transformResponseData } from './helpers/data'
import { formatHeaders } from './helpers/header'
import xhr from './xhr'

function processConfig(config: LanceRequestConfig): void {
  config.url = seriesUrl(config)
  config.headers = formatRequestHeaders(config)
  config.data = formatRequestData(config)
}

function formatRequestData(config: LanceRequestConfig): any {
  const { data } = config
  return transformRequestData(data)
}

function formatRequestHeaders(config: LanceRequestConfig): any {
  const { headers = {}, data } = config
  return formatHeaders(headers, data)
}

function formatResponseData(response: LanceResponse): LanceResponse {
  const { data } = response
  response.data = transformResponseData(data)
}

function seriesUrl(config: LanceRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function lance(config: LanceRequestConfig): LanceResponsePromise {
  processConfig(config)
  return xhr(config).then(res => {
    formatResponseData(res)
    return res
  })
}

export default lance
