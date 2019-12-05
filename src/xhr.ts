import { LanceRequestConfig, LanceResponsePromise } from './types'

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
  const { url, method = 'get', data = null, headers, responseType } = config
  const request = new XMLHttpRequest()
  if (responseType) {
    request.responseType = responseType
  }
  return new Promise((resolve, reject) => {
    request.open(method.toUpperCase(), url, true)
    // 设置请求头
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        // 如果request body传入的data为空，则不必设置'Content-Type' header
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.onreadystatechange = function stateFunc(): void {
      if (request.readyState !== 4) {
        return
      }
      const responseHeaders = request.getAllResponseHeaders() // response header
      const responseData = responseType === 'text' ? request.responseText : request.response // response data
      resolve({
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: formatHeaders(responseHeaders),
        config,
        request
      })
    }
    request.send(data)
  })
}

export default xhr
