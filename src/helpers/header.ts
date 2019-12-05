import { isPlainObject } from './utils'
function normalizeHeadersName(headers: any, normalizedHeaderName: string): void {
  if (isPlainObject(headers)) {
    Object.keys(headers).forEach(key => {
      if (
        key === normalizedHeaderName ||
        key.toUpperCase() === normalizedHeaderName.toLocaleLowerCase()
      ) {
        headers[normalizedHeaderName] = headers[key]
        delete headers[key]
      }
    })
  }
}
export function formatHeaders(headers: any, data: any): any {
  if (isPlainObject(data)) {
    normalizeHeadersName(headers, 'Content-Type')
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}
