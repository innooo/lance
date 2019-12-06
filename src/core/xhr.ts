import { LanceRequestConfig, LanceResponsePromise, LanceResponse } from '../types'
import { createError } from '../helpers/error'

function formatHeaders(headers: string): any {
  const formatedHeaders = Object.create(null)
  if (!headers) return formatHeaders
  headers.split('\r\n').forEach(part => {
    let [key, val] = part.split(':')
    key = key.trim().toLowerCase()
    if (!key) return
    val = val.trim()
    formatedHeaders[key] = val
  })
  return formatedHeaders
}
function xhr(config: LanceRequestConfig): LanceResponsePromise {
  const { url, method = 'get', data = null, headers, responseType, timeout } = config
  const request = new XMLHttpRequest()
  if (responseType) {
    request.responseType = responseType
  }

  return new Promise((resolve, reject) => {
    function resolveResponse(response: LanceResponse): void {
      if (response.status < 200 || response.status > 300) {
        reject(createError('Response Error', config, null, request, response))
      } else {
        resolve(response)
      }
    }
    request.open(method.toUpperCase(), url!, true)
    // 设置请求头
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        // 如果request body传入的data为空，则不必设置'Content-Type' header
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    if (timeout) {
      request.timeout = timeout
    }

    request.ontimeout = function timeoutFunc(): void {
      reject(createError(`Timeout of ${timeout} ms`, config, 'ECONNABORTED', request))
    }

    request.onerror = function errorFunc(): void {
      reject(createError('Network Error', config, null, request))
    }

    request.onreadystatechange = function stateFunc(): void {
      if (request.readyState !== 4) return

      if (request.status === 0) return

      const responseHeaders = request.getAllResponseHeaders() // response header
      const responseData = responseType === 'text' ? request.responseText : request.response // response data

      const response: LanceResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: formatHeaders(responseHeaders),
        config,
        request
      }

      resolveResponse(response)
    }
    request.send(data)
  })
}

export default xhr
